export interface CardItem {
  id?: string;
  title: string;
  image: string;
  type: CardItemType;
  order: number;
}

export enum CardItemType {
  SCHOOL = 'school',
  HOME = 'house',
  PRESENTATION = 'assignment',
}
