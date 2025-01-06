export function maximum(a: number[], b: number[]): number[] {
  const longer = a.length > b.length ? a : b;
  const shorter = a.length > b.length ? b : a;

  return longer.map((val, i) => {
    return shorter[i] !== undefined ? Math.max(val, shorter[i]) : val;
  });
}

export function minmax(xs: number[]): number[] {
  const min = Math.min(...xs);
  const max = Math.max(...xs);
  return xs.map((x) => (x - min) / (max - min));
}
