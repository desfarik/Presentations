import { LessonMaterial } from './lesson-material';

export class Lesson {
  public name: string;
  public guid: string;
  public materials: { [key: string]: LessonMaterial } = {};
  public materialOrder = '';


  constructor(name: string, guid: string) {
    this.name = name;
    this.guid = guid;
  }
}
