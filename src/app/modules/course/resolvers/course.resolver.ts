import { SetCourse } from '../../../store/course/course.action';
import { CourseApiService } from '../service/course.api.service';
import { Course } from '../../../core/dto/course';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { switchMap } from 'rxjs/operators';
import { last } from 'lodash-es';
import { fromPromise } from 'rxjs/internal-compatibility';

@Injectable()
export class CourseResolver implements Resolve<unknown> {

  constructor(private store: Store, private courseApiService: CourseApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<unknown> {
    const lessonId = last(state.url.split('/')) || '';
    console.log(lessonId);
    return this.courseApiService.getByGuid(route.paramMap.get('id') || '')
      .pipe(
        switchMap((course: Course) => this.store.dispatch(new SetCourse(course, lessonId))),
      );
  }
}
