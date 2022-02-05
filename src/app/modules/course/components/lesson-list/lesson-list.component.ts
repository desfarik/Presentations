import { CourseState } from '../../../../store/course/course.state';
import { CourseLesson } from '../../../../core/dto/course-lesson';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ViewSelectSnapshot } from '@ngxs-labs/select-snapshot';
import { Store } from '@ngxs/store';
import { ReorderLessons, SelectLesson } from '../../../../store/course/course.action';
import { CdkDragDrop } from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-lesson-list',
  templateUrl: './lesson-list.component.html',
  styleUrls: ['./lesson-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LessonListComponent {

  constructor(private store: Store) {
  }

  @ViewSelectSnapshot(CourseState.courseLessons) courseLessons: CourseLesson[];
  @ViewSelectSnapshot(CourseState.isSelectedLesson) isSelectedLesson: (lesson: CourseLesson) => boolean;

  identifyLesson(index: number, lesson: CourseLesson): string {
    return lesson.guid;
  }

  selectLesson(lesson: CourseLesson): void {
    this.store.dispatch(new SelectLesson(lesson));
  }


  drop(event: CdkDragDrop<CourseLesson>): void {
    if (event.previousIndex !== event.currentIndex) {
      this.store.dispatch(new ReorderLessons(event.previousIndex, event.currentIndex));
    }
  }
}
