import {Injectable} from '@angular/core';
import {AngularFireStorage} from "@angular/fire/storage";
import {CardItemType} from "../../components/card-list/card-item";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private fireStorage: AngularFireStorage) {
  }


  savePresentationHtml(id: string, html: string): Promise<string> {
    const presentationRef = this.fireStorage.storage.ref().child(id);
    const htmlRef = presentationRef.child('presentation.html');
    return htmlRef.putString(html).then((snapshot) => {
      return htmlRef.getDownloadURL()
    })
  }


  async loadHtml(htmlUrl: string): Promise<string> {
    return fetch(htmlUrl).then(response => {
      return response.text();
    })
  }

  saveTaskHtml(presentationId: string, id: string, type: CardItemType, html: string) {
    const taskRef = this.fireStorage.storage.ref(`${presentationId}/${type}`).child(id);
    return taskRef.putString(html).then((snapshot) => {
      return taskRef.getDownloadURL()
    })
  }
}
