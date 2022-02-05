import { Course } from '../../../core/dto/course';
import { Lesson } from '../../../core/dto/lesson';
import { CourseLesson } from '../../../core/dto/course-lesson';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { DataSnapshot } from '@angular/fire/database/interfaces';

@Injectable()
export class CourseApiService {


  constructor(private fireDatabase: AngularFireDatabase) {
  }

  public getByGuid(guid: string): Promise<Course> {
    return this.fireDatabase.database.ref(`/course/${guid}`).get()
      .then((snapshot: DataSnapshot) => {
        if (snapshot.exists()) {
          return snapshot.val();
        }
        throw new Error('Course does not exist');
      });
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
