export interface INote {
  authorId: string
  body: string,
  title: string,
  date: Date,
  location?: string,
  showOnCalendar: boolean,
  tag: any
}