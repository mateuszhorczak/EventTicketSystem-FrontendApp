export default function (date: string): string {
  return date.endsWith('Z') ? date : date + 'Z'
}
