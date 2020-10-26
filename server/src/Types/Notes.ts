export interface INote {
  body: string,
  date: Date,
  location?: string,
  showOnCalendar: boolean,
  tag: any
}