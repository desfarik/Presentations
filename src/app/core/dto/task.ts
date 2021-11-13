import { CardItem, CardItemType } from '../../components/card-list/card-item';

export class Task implements CardItem {
  public readonly id: string;
  public readonly image: string;
  public readonly title: string;
  public readonly htmlUrl: string;
  public readonly type: CardItemType;
  public order: number;


  constructor(id: string, image: string, title: string, htmlUrl: string, type: CardItemType, order: number) {
    this.id = id;
    this.image = image;
    this.title = title;
    this.htmlUrl = htmlUrl;
    this.type = type;
    this.order = order;
  }
}
