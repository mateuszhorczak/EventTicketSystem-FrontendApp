import { Time } from '@internationalized/date'

export default function (date: Date): Time {
  return new Time(date.getHours() ?? 12, date.getMinutes() ?? 0)
}
