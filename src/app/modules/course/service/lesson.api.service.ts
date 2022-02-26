import { Course } from '../../../core/dto/course';
import { Lesson } from '../../../core/dto/lesson';
import { CourseLesson } from '../../../core/dto/course-lesson';
import { Injectable } from '@angular/core';
import { AngularFirestore, QuerySnapshot } from '@angular/fire/firestore';
import { AngularFirestoreCollection } from '@angular/fire/firestore/collection/collection';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class LessonApiService {

  private lessonsCollectionRef: AngularFirestoreCollection<Course>;


  constructor(private fireDatabase: AngularFirestore) {
    this.lessonsCollectionRef = this.fireDatabase.collection('lessons');
  }

  public findAllByCourseGuid(courseGuid: string): Observable<Course> {
    return this.lessonsCollectionRef.ref.where('courseGuid', '==', courseGuid).get()
      .then((querySnapshot: QuerySnapshot<Lesson>) => {
        return querySnapshot.da
      }).pipe(map(v => {
        console.log(v);
        if (!v) {
          throw new Error('Course does not exist');
        }
        return v as unknown as Course;
      }));
  }

  public createNewCourse(course: Course): Promise<void> {
    course.guid = this.generateCourseGuid();
    return this.fireDatabase.database.ref(`/course/${course.guid}`).set(course);
  }

  public updateName(courseGuid: string, name: string): Promise<void> {
    return this.fireDatabase.database.ref(`/course/${courseGuid}/name`).set(name);
  }

  public createNewLesson(courseGuid: string, lessonName: string): Promise<[Lesson, CourseLesson]> {
    const lesson = new Lesson(lessonName, this.generateLessonGuid(courseGuid));
    const courseLesson = new CourseLesson(lessonName, lesson.guid);
    return Promise.all(
      [
        this.fireDatabase.database.ref(`/course/${courseGuid}/lessons/${lesson.guid}`).set(courseLesson),
        this.fireDatabase.database.ref(`/lessons/${lesson.guid}`).set(lesson),
      ],
    ).then(() => ([lesson, courseLesson]));
  }

  public deleteLesson(courseGuid: string, lessonGuid: string): Promise<void> {
    return this.fireDatabase.database.ref(`/course/${courseGuid}/lessons/${lessonGuid}`).remove();
  }

  public updateLessonOrder(courseGuid: string, lessonOrder: string): Promise<void> {
    return this.fireDatabase.database.ref(`/course/${courseGuid}/lessonOrder`).set(lessonOrder);
  }

  generateCourseGuid(): string {
    return this.fireDatabase.database
      .ref('/course/').push().key || Date.now().toString();
  }

  generateLessonGuid(courseGuid: string): string {
    return this.fireDatabase.database
      .ref(`/course/${courseGuid}/lessons`).push().key || Date.now().toString();
  }
}
