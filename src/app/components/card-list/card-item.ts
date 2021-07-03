export interface CardItem {
  title: string;
  image: string;
  type: CardItemType
}

export enum CardItemType {
  SCHOOL = 'school',
  HOME = 'house'
}
