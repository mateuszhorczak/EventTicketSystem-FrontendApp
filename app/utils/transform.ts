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

interface InputMessageType {
  id: number
  text: string
}

interface OutputMessageType {
  id: string
  parts: {
    type: string
    text: string
  }[]
}

export function transformMessageArray<T extends InputMessageType>(
  array: T[] | undefined | null,
): (T & OutputMessageType)[] {
  if (!array) return []

  return array.map(item => ({
    ...item,
    id: item.id.toString(),
    role: 'user',
    parts: [{
      type: 'text',
      text: item.text,
    }],
  }))
}
