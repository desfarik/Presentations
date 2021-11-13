import { Task } from './task';
import { CardItem, CardItemType } from '../../components/card-list/card-item';

export class Presentation implements CardItem {
  public readonly id: string;
  public readonly image: string;
  public readonly title: string;
  public readonly htmlUrl: string;
  public readonly lessonTasks: Task[];
  public readonly homeTasks: Task[];
  public type = CardItemType.PRESENTATION;
  public order: number;


  constructor(id: string, image: string, title: string, htmlUrl: string, lessonTasks: Task[], homeTasks: Task[], order: number) {
    this.id = id;
    this.image = image;
    this.title = title;
    this.htmlUrl = htmlUrl;
    this.lessonTasks = lessonTasks;
    this.homeTasks = homeTasks;
    this.order = order;
  }


}
