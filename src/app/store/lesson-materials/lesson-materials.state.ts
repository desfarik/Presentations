import { FetchMaterials } from './lesson-materials.action';
import { StoreConstants } from '../store.constants';
import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Observable, timer } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LessonMaterial } from '../../core/dto/lesson-material';

interface CourseLessonStateModel {
  name: string;
  guid: string;
  loading: boolean;
  materials: LessonMaterial[];
}

@State<CourseLessonStateModel>({
  name: StoreConstants.LESSON_MATERIALS,
  defaults: {
    name: '',
    guid: '',
    loading: false,
    materials: [],
  },
})
@Injectable()
export class LessonMaterialsState {


  @Selector()
  static lessonMaterials({ materials }: CourseLessonStateModel): LessonMaterial[] {
    return materials;
  }

  @Action(FetchMaterials)
  fetchLesson(
    { patchState }: StateContext<CourseLessonStateModel>,
    { courseLesson }: FetchMaterials,
  ): Observable<unknown> {
    patchState({
      // @ts-ignore
      materials: [],
    });
    return timer(1000)
      .pipe(
        tap(() => {
          patchState({
            // @ts-ignore
            materials: [{ name: 'Material1' }, { name: 'Material 2' }],
          });
        }),
      );
  }


}
