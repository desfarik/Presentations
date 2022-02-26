import { CourseState } from '../../../../store/course/course.state';
import { CourseLesson } from '../../../../core/dto/course-lesson';
import { CreateNewLesson, ReorderLessons, SelectLesson } from '../../../../store/course/course.action';
import { CreateDialogComponent } from '../../../../components/create-dialog/create-dialog.component';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ViewSelectSnapshot } from '@ngxs-labs/select-snapshot';
import { Store } from '@ngxs/store';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-lesson-list',
  templateUrl: './lesson-list.component.html',
  styleUrls: ['./lesson-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LessonListComponent {

  constructor(private store: Store, private dialog: MatDialog) {
  }

  @ViewSelectSnapshot(CourseState.courseLessons) courseLessons: CourseLesson[];
  @ViewSelectSnapshot(CourseState.isSelectedLesson) isSelectedLesson: (lesson: CourseLesson) => boolean;

  identifyLesson(index: number, lesson: CourseLesson): string {
    return lesson?.guid;
  }

  selectLesson(lesson: CourseLesson): void {
    this.store.dispatch(new SelectLesson(lesson));
  }


  drop(event: CdkDragDrop<CourseLesson>): void {
    if (event.previousIndex !== event.currentIndex) {
      this.store.dispatch(new ReorderLessons(event.previousIndex, event.currentIndex));
    }
  }

  createNewLesson(): void {
    this.dialog.open(CreateDialogComponent, { data: { header: 'Добавить занятие', label: 'Имя занятия' } })
      .afterClosed()
      .pipe(filter<string>(Boolean))
      .subscribe((lessonName: string) => {
        this.store.dispatch(new CreateNewLesson(lessonName));
      });
  }
}
