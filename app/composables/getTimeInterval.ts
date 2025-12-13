export default function (
  startIso: string | null | undefined,
  endIso: string | null | undefined,
  fallback: string = 'Invalid data',
): string {
  if (!startIso || !endIso) return fallback

  const start = new Date(startIso)
  const end = new Date(endIso)

  if (isNaN(start.getTime()) || isNaN(end.getTime())) return fallback

  const formatter = new Intl.DateTimeFormat('pl-PL', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  })

  const startStr = formatter.format(start)
  const endStr = formatter.format(end)

  if (startStr === endStr) return startStr

  return `${startStr} - ${endStr}`
}
