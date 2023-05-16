export function getLastElementFromString(value: string): string | undefined {
  return value.split(" ").at(-1);
}

export function getUidFromString(value: string): string | undefined {
  return value.split(" ")[4];
}

