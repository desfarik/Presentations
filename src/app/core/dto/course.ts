import { CourseLesson } from './course-lesson';

export class Course {
  public name: string;
  public guid: string;

  public lessons?: { [key: string]: CourseLesson };
  public lessonOrder = '';

}

