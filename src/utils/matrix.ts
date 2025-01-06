export function hstack<T>(matrices: Array<T[][]>) {
  const result = [];

  for (let i = 0; i < matrices[0].length; i++) {
    const row = matrices.map((matrix) => matrix[i]).flat();
    result.push(row);
  }

  return result;
}

export function vstack<T>(matrices: Array<T[][]>) {
  return matrices.flat();
}

export function transpose<T>(matrix: T[][]) {
  return matrix[0].map((_, i) => matrix.map((row) => row[i]));
}
