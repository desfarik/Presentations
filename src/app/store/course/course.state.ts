import {
  CreateNewLesson,
  DeleteSelectedLesson,
  DisableCourseLoading,
  EnableCourseLoading,
  ReorderLessons,
  SaveLessonOrdering,
  SelectLesson,
  SetCourse,
} from './course.action';
import { StoreConstants } from '../store.constants';
import { CourseLesson } from '../../core/dto/course-lesson';
import { FetchMaterials } from '../lesson-materials/lesson-materials.action';
import { CourseApiService } from '../../modules/course/service/course.api.service';
import { Injectable } from '@angular/core';
import { Action, Selector, SelectorOptions, State, StateContext } from '@ngxs/store';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import { EMPTY, Observable } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { first, values } from 'lodash-es';
import { fromPromise } from 'rxjs/internal-compatibility';

interface CourseStateModel {
  name: string;
  guid: string;
  lessonOrder: string;
  lessons: CourseLesson[];
  selectedLesson?: CourseLesson;
  loading: boolean;
}

@State<CourseStateModel>({
  name: StoreConstants.COURSE,
  defaults: {
    name: '',
    guid: '',
    lessonOrder: '',
    lessons: [],
    selectedLesson: undefined,
    loading: false,
  },
})
@Injectable()
export class CourseState {

  constructor(private courseApiService: CourseApiService) {
  }

  @Selector()
  static lessonName({ selectedLesson }: CourseStateModel): string {
    return selectedLesson?.name || '';
  }

  @Selector()
  static isLoading({ loading }: CourseStateModel): boolean {
    return loading;
  }

  @Selector()
  static lessons({ lessons }: CourseStateModel): CourseLesson[] {
    return lessons;
  }

  @Selector()
  static lessonOrder({ lessonOrder }: CourseStateModel): string {
    return lessonOrder;
  }

  @Selector()
  static selectedLesson({ selectedLesson }: CourseStateModel): CourseLesson | undefined {
    return selectedLesson;
  }

  @Selector([CourseState.lessons, CourseState.lessonOrder])
  @SelectorOptions({})
  static courseLessons(lessons: CourseLesson[], lessonOrder: string): CourseLesson[] {
    const mapData: Array<[string, number]> = lessonOrder.split('|').map((guid, index) => [guid, index]);
    const itemIndexMap = new Map<string, number>(mapData);
    const orderedArray = Array(lessons.length);
    lessons.forEach(lesson => orderedArray[itemIndexMap.get(lesson.guid) || 0] = lesson);
    return orderedArray;
  }

  @Selector([CourseState.selectedLesson])
  static isSelectedLesson(selectedLesson: CourseLesson): (lesson: CourseLesson) => boolean {
    return (lesson: CourseLesson): boolean => selectedLesson?.guid === lesson.guid;
  }

  @Action(SetCourse)
  setCourse(
    { patchState, dispatch }: StateContext<CourseStateModel>,
    { course, lessonId }: SetCourse,
  ): void {
    const lessons = values(course.lessons);
    let courseLesson = lessons.find((lesson: CourseLesson) => lesson.guid === lessonId) as CourseLesson;
    if (!courseLesson) {
      courseLesson = first(lessons) as CourseLesson;
    }
    patchState({ ...lessons, selectedLesson: courseLesson });
    dispatch(new SelectLesson(courseLesson));
  }

  @Action(SelectLesson)
  selectLesson(
    { patchState, getState, dispatch }: StateContext<CourseStateModel>,
    { selectedLesson }: SelectLesson,
  ): void {
    const { lessons, selectedLesson: oldSelectedLesson } = getState();
    if (selectedLesson === oldSelectedLesson) {
      return;
    }
    patchState({ selectedLesson });
    const courseLesson: CourseLesson = lessons.find((lesson: CourseLesson) => lesson.guid === selectedLesson.guid);
    patchState({ loading: true });
    dispatch(new FetchMaterials(courseLesson))
      .pipe(finalize(() => patchState({ loading: false })))
      .subscribe();
  }

  @Action(DeleteSelectedLesson)
  deleteSelectedLesson(
    { patchState, getState }: StateContext<CourseStateModel>,
  ): Observable<unknown> {
    const { guid, selectedLesson } = getState();
    if (!selectedLesson) {
      return EMPTY;
    }
    patchState({ loading: true });
    return fromPromise(this.courseApiService.deleteLesson(guid, selectedLesson.guid))
      .pipe(finalize(() => patchState({ loading: false })));
  }

  @Action(CreateNewLesson)
  createNewLesson(
    { patchState, getState }: StateContext<CourseStateModel>,
    { name }: CreateNewLesson,
  ): Observable<unknown> {
    const { guid, lessonOrder, lessons } = getState();
    patchState({ loading: true });
    return fromPromise(this.courseApiService.createNewLesson(guid, name))
      .pipe(
        tap(([lesson, courseLesson]) =>
          patchState({
            lessonOrder: `${lessonOrder}|${lesson.guid}`,
            selectedLesson: courseLesson,
            lessons: [...lessons, courseLesson],
          })))
      .pipe(finalize(() => patchState({ loading: false })));
  }


  @Action(ReorderLessons)
  reorderLessons(
    { patchState, getState, dispatch }: StateContext<CourseStateModel>,
    { previousIndex, currentIndex }: ReorderLessons,
  ): void {
    const { lessonOrder } = getState();
    const order = lessonOrder.split('|');
    moveItemInArray(order, previousIndex, currentIndex);
    patchState({ lessonOrder: order.join('|') });
    dispatch(new SaveLessonOrdering());
  }

  @Action(SaveLessonOrdering)
  saveLessonOrdering(
    { getState }: StateContext<CourseStateModel>,
  ): Observable<unknown> {
    const { guid, lessonOrder } = getState();
    return fromPromise(this.courseApiService.updateLessonOrder(guid, lessonOrder))
      .pipe(
        // @ts-ignore
        catchError(() => console.error('Try later')),
      );
  }

  @Action(EnableCourseLoading)
  enableLoading({ patchState }: StateContext<CourseStateModel>): void {
    patchState({ loading: true });
  }


  @Action(DisableCourseLoading)
  disableLoading({ patchState }: StateContext<CourseStateModel>): void {
    patchState({ loading: false });
  }

}
