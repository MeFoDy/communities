
export function chunks<T>(array: T[], size: number): T[] {
  const arrays = [];

  while (array.length > 0)
    arrays.push(array.splice(0, size));

  return arrays;
}
