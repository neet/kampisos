import zlib from "zlib";

import { maximum } from "@/utils/array";
import { hstack, transpose, vstack } from "@/utils/matrix";

type TokenAlignmentProps = {
  s: Array<Array<number>>;
  a: Array<number>;
  j: Array<number>;
};

export class TokenAlignment {
  #scoresAinuToJapanese: Array<Array<number>>;
  #tokenLengthsAinu: Array<number>;
  #tokenLengthsJapanese: Array<number>;

  constructor({ s, a, j }: TokenAlignmentProps) {
    this.#scoresAinuToJapanese = s;
    this.#tokenLengthsAinu = a;
    this.#tokenLengthsJapanese = j;
  }

  static from(data: string) {
    const buffer = Buffer.from(data, "base64");
    const decompressed = zlib.inflateSync(buffer).toString();
    const props = JSON.parse(decompressed);
    return new TokenAlignment(props);
  }

  toCharAlignment(): CharAlignment {
    let col: Array<Array<number>> | null = null;

    for (let i = 0; i < this.#scoresAinuToJapanese.length; i++) {
      const height = this.#tokenLengthsAinu[i];
      let row: Array<Array<number>> | null = null;

      for (let j = 0; j < this.#scoresAinuToJapanese[i].length; j++) {
        const width = this.#tokenLengthsJapanese[j];
        const score = this.#scoresAinuToJapanese[i][j];
        const box = new Array(height).fill(new Array(width).fill(score));
        row = row ? hstack([row, box]) : box;
      }

      if (row == null) {
        throw new Error("row is null");
      }

      col = col ? vstack([col, row]) : row;
    }

    if (col == null) {
      throw new Error("col is null");
    }

    return new CharAlignment(col);
  }
}

// ----------------

export class CharAlignment {
  #scoresAinuToJapanese: Array<Array<number>>;
  #scoresJapaneseToAinu: Array<Array<number>>;

  constructor(scores: Array<Array<number>>) {
    this.#scoresAinuToJapanese = scores;
    this.#scoresJapaneseToAinu = transpose(scores);
  }

  get scores(): Array<Array<number>> {
    return this.#scoresAinuToJapanese;
  }

  getAinuScoresFromJapaneseSpan(start: number, end: number): number[] {
    return this.#scoresJapaneseToAinu.slice(start, end).reduce(maximum, []);
  }

  getJapaneseScoresAinuSpan(start: number, end: number): number[] {
    return this.#scoresAinuToJapanese.slice(start, end).reduce(maximum, []);
  }
}
