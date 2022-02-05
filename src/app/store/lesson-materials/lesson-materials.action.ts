import { CourseLesson } from '../../core/dto/course-lesson';

export class FetchMaterials {
  static readonly type: string = '[Lesson-Materials] FetchMaterials';

  constructor(public courseLesson: CourseLesson) {
  }
}
