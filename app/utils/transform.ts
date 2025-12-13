export function transformArrayToSelectMenu<T extends { name: string }>(
  array: T[] | undefined | null,
): (T & { label: string })[] {
  if (!array) return []

  return array.map(item => ({
    ...item,
    label: item.name,
  }))
}

export function transformEventArrayToCards<T extends { name: string, id: number }>(
  array: T[] | undefined | null,
): (T & { title: string, to: string })[] {
  if (!array) return []

  return array.map(item => ({
    ...item,
    title: item.name,
    to: `/events/${item.id}`,
  }))
}
