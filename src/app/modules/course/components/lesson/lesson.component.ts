import { LessonMaterialsState } from '../../../../store/lesson-materials/lesson-materials.state';
import { LessonMaterial } from '../../../../core/dto/lesson-material';
import { CourseState } from '../../../../store/course/course.state';
import { ConfirmDialogComponent } from '../../../../components/confirm-dialog/confirm-dialog.component';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ViewSelectSnapshot } from '@ngxs-labs/select-snapshot';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { filter } from 'rxjs/operators';
import { DeleteSelectedLesson } from '../../../../store/course/course.action';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LessonComponent {

  constructor(public dialog: MatDialog, public store: Store) {
  }

  @Select(CourseState.lessonName) lessonName: Observable<string>;
  @ViewSelectSnapshot(LessonMaterialsState.lessonMaterials) materials: LessonMaterial[];
  @ViewSelectSnapshot(CourseState.isLoading) isLoading: string;


  deleteLesson(): void {
    this.dialog.open(ConfirmDialogComponent, {
      data: {
        header: 'Удалить занятие?',
        message: '',
        confirm: 'Удалить',
      },
    }).afterClosed()
      .pipe(filter(Boolean))
      .subscribe(() => this.store.dispatch(new DeleteSelectedLesson()));
  }
}
