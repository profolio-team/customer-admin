export function compare(a1: Array<string>, a2: Array<string>) {
  return a1.length == a2.length && a1.every((v, i) => v === a2[i]);
}
