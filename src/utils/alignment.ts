import { assert } from "console";
import zlib from "zlib";

type AlignmentData = {
  /** Cross attention for each token */
  s: Array<Array<number>>;

  /** Length of each token. By using this, we can restore where the original sentence is split */
  l1: Array<number>;
  l2: Array<number>;
};
// -----

class CharAlignment {
  #scores: number[];

  constructor(scores: number[]) {
    this.#scores = scores;
  }

  getScores(): number[] {
    return this.#scores;
  }

  toJSON() {
    return this.#scores;
  }
}

const mergeArrayByMax = (a: number[], b: number[]): number[] => {
  const longer = a.length > b.length ? a : b;
  const shorter = a.length > b.length ? b : a;

  return longer.map((val, i) => {
    return shorter[i] !== undefined ? Math.max(val, shorter[i]) : val;
  });
};

export class Alignment {
  #abMatrix: CharAlignment[];
  #baMatrix: CharAlignment[];

  constructor(charToCharAlignment: number[][]) {
    this.#abMatrix = charToCharAlignment.map(
      (scores, i) => new CharAlignment(scores),
    );
    this.#baMatrix = charToCharAlignment[0].map(
      (_, i) =>
        new CharAlignment(charToCharAlignment.map((scores) => scores[i])),
    );
  }

  lookupA(i: number): number[] {
    return this.#abMatrix[i].getScores();
  }

  lookupB(i: number): number[] {
    return this.#baMatrix[i].getScores();
  }

  lookupABySpan(start: number, end: number): number[] {
    const scoresList = this.#abMatrix
      .slice(start, end)
      .map((charAlignment) => charAlignment.getScores());

    const reduced = scoresList.reduce(mergeArrayByMax, []);

    return reduced;
  }

  lookupBBySpan(start: number, end: number): number[] {
    return this.#baMatrix
      .slice(start, end)
      .map((charAlignment) => charAlignment.getScores())
      .reduce(mergeArrayByMax, []);
  }

  toJSON() {
    return this.#abMatrix.map((charAlignment) => charAlignment.toJSON())
  }
}

//

type Matrix<T> = T[][]

const horizontallyAppendMatrices = (matrix1: Matrix<number>, matrix2: Matrix<number>) => {
  if (matrix1.length === 0) return matrix2;
  if (matrix2.length === 0) return matrix1;

  const matrix = [];

  for (let i = 0; i < matrix1.length; i++) {
    matrix.push([...matrix1[i], ...matrix2[i]]);
  }

  return matrix;
};

const horizontallyConcatMatrices = (matrices: Matrix<number>[]) => {
  return matrices.reduce((matrix1, matrix2) => horizontallyAppendMatrices(matrix1, matrix2), []);
};

const createCharToCharAlignmentFromData = (
  alignmentData: AlignmentData,
): number[][] => {
  const { s, l1, l2 } = alignmentData;
  const borders: Matrix<number> = [];

  for (let i = 0; i < s.length; i++) {
    const width = l2[i];
    const blocks: Matrix<number>[] = [];
  
    for (let j = 0; j < s[i].length; j++) {
      const height = l1[j];
  
      const score = s[i][j];
      const block = Array.from({ length: width }, () =>
        Array.from({ length: height }, () => score),
      );
      
      blocks.push(block);
    }
  
    borders.push(...horizontallyConcatMatrices(blocks));
  }
  
  return borders; 
};

const createAlignmentMatrix = (alignmentData: AlignmentData): Alignment => {
  const charToCharAlignment = createCharToCharAlignmentFromData(alignmentData);
  return new Alignment(charToCharAlignment);
};

// ----

export const parse = (data: string): Alignment => {
  const buffer = Buffer.from(data, "base64");
  const decompressed = zlib.inflateSync(buffer).toString();
  const alignment = JSON.parse(decompressed);

  // checks
  assert(alignment.s.length === alignment.l1.length);
  assert(alignment.s[0].length === alignment.l2.length);

  return createAlignmentMatrix(alignment);
};
