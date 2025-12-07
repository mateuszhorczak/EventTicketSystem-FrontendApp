const { timeZone } = Intl.DateTimeFormat().resolvedOptions()

export default function () {
  return timeZone
}
