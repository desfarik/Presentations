import { CourseComponent } from './course.component';
import { CourseRoutingModule } from './course-routing.module';
import { LessonListComponent } from './components/lesson-list/lesson-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LessonComponent } from './components/lesson/lesson.component';
import { CourseResolver } from './resolvers/course.resolver';
import { MaterialSearchComponent } from './components/material-search/material-search.component';
import { CourseState } from '../../store/course/course.state';
import { NgxsModule } from '@ngxs/store';
import { LessonRedirectGuard } from './resolvers/lesson-redirect-guard.service';
import { LessonMaterialsState } from '../../store/lesson-materials/lesson-materials.state';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { CourseApiService } from './service/course.api.service';

@NgModule({
  declarations: [
    CourseComponent,
    LessonListComponent,
    LessonComponent,
    MaterialSearchComponent,
  ],
  providers: [
    CourseResolver,
    LessonRedirectGuard,
    CourseApiService,
  ],
  imports: [
    CommonModule,
    CourseRoutingModule,
    NgxsModule.forFeature([CourseState, LessonMaterialsState]),
    MatProgressSpinnerModule,
    MatProgressBarModule,
    DragDropModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
  ],
})
export class CourseModule {
}
