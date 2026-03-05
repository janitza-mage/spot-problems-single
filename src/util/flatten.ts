export function flatten<T>(arrays: T[][]): T[] {
  const result: T[] = [];
  for (const array of arrays) {
    for (const element of array) {
      result.push(element);
    }
  }
  return result;
}
