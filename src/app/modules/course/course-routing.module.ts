import { CourseComponent } from './course.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LessonComponent } from './components/lesson/lesson.component';
import { CourseResolver } from './resolvers/course.resolver';
import { LessonRedirectGuard } from './resolvers/lesson-redirect-guard.service';

const routes: Routes = [
  {
    path: ':id',
    component: CourseComponent,
    resolve: {
      data: CourseResolver,
    },
    canActivateChild: [LessonRedirectGuard],
    children: [
      {
        path: ':lessonId',
        component: LessonComponent,
        canActivate: [LessonRedirectGuard],
      },
    ],
  },

];


@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class CourseRoutingModule {
}
