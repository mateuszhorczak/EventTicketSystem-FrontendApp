import type { CalendarDate, Time } from '@internationalized/date'

export default function (date: CalendarDate, time: Time): Date {
  const jsDate = date.toDate(getTimeZone())
  jsDate.setHours(time.hour, time.minute)
  return jsDate
}
