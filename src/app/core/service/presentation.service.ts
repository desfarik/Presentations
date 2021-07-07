import {Injectable} from '@angular/core';
import {AngularFireDatabase} from "@angular/fire/database";
import {Presentation} from "../dto/presentation";
import {DataSnapshot} from "@angular/fire/database/interfaces";
import {Task} from "../dto/task";
import {StorageService} from "./storage.service";
import {PresentationResolver} from "../resolver/presentation.resolver";
import {CardItemType} from "../../components/card-list/card-item";

@Injectable({
  providedIn: 'root'
})
export class PresentationService {
  private cached: { [key: string]: Presentation } = {}

  constructor(private fireDatabase: AngularFireDatabase, private storageService: StorageService) {
  }

  public getAll(): Promise<Presentation[]> {
    return this.fireDatabase.database.ref('/presentations').get()
      .then((snapshot: DataSnapshot) => {
        if (snapshot.exists()) {
          this.cached = snapshot.val() as any;
          return Object.values(this.cached);
        }
        return []
      })
  }

  getById(id: string): Promise<Presentation> {
    const cachedPresentation = this.cached[id];
    if (cachedPresentation) {
      return Promise.resolve(cachedPresentation);
    }
    return this.fireDatabase.database.ref(`/presentations/${id}`).get()
      .then((snapshot: DataSnapshot) => {
        if (snapshot.exists()) {
          const presentation = snapshot.val() as Presentation;
          this.cached[id] = snapshot.val();
          return presentation;
        }
        throw new Error('Not found')
      })
  }

  async save(id: string = this.generateId(), title: string, html: string,
             lessonItems: Task[] = [], homeLessons: Task[] = []): Promise<Presentation> {
    const url = await this.storageService.savePresentationHtml(id, html);
    const presentation = new Presentation(id, '', title, url, lessonItems, homeLessons, 1);
    await this.upload(presentation);
    console.log('saved');
    return presentation;
  }


  upload(presentation: Presentation): Promise<void> {
    return this.fireDatabase.database.ref(`/presentations/${presentation.id}`).set(presentation);
  }


  generateId(): string {
    return this.fireDatabase.database.ref('/presentations').push().key || Date.now().toString();
  }

  generateTaskId(presentationId: string, type: CardItemType): string {
    return this.fireDatabase.database
      .ref(`/presentations/${presentationId}/${type}`).push().key || Date.now().toString();
  }
}
