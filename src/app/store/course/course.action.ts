import { Course } from '../../core/dto/course';
import { CourseLesson } from '../../core/dto/course-lesson';

export class SetCourse {
  static readonly type: string = '[Course] SetCourse';

  constructor(public course: Course, public lessonId: string) {
  }
}

export class SelectLesson {
  static readonly type: string = '[Course] SelectLesson';

  constructor(public selectedLesson: CourseLesson) {
  }
}

export class DeleteSelectedLesson {
  static readonly type: string = '[Course] DeleteSelectedLesson';

  constructor() {
  }
}

export class CreateNewLesson {
  static readonly type: string = '[Course] CreateNewLesson';

  constructor(public name: string) {
  }
}

export class ReorderLessons {
  static readonly type: string = '[Course] ReorderLessons';

  constructor(public previousIndex: number, public currentIndex: number) {
  }
}

export class SaveLessonOrdering {
  static readonly type: string = '[Course] SaveLessonOrdering';

  constructor() {
  }
}


export class EnableCourseLoading {
  static readonly type: string = '[Course] EnableLoading';

  constructor() {
  }
}

export class DisableCourseLoading {
  static readonly type: string = '[Course] DisableLoading';

  constructor() {
  }
}
