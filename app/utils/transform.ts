export function transformArrayToSelectMenu<T extends { name: string }>(
  array: T[] | undefined | null,
): (T & { label: string })[] {
  if (!array) return []

  return array.map(item => ({
    ...item,
    label: item.name,
  }))
}
