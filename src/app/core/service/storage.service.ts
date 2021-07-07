import {Injectable} from '@angular/core';
import {AngularFireStorage} from "@angular/fire/storage";
import {CardItemType} from "../../components/card-list/card-item";
import {ImageService} from "./image.service";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private fireStorage: AngularFireStorage, private imageService: ImageService) {
  }


  savePresentationHtml(id: string, html: string): Promise<[string, string]> {
    const presentationRef = this.fireStorage.storage.ref().child(id);
    const htmlRef = presentationRef.child('presentation.html');
    const imageRef = presentationRef.child('image.png');
    return Promise.all([this.saveHtml(htmlRef, html), this.saveImage(imageRef, html)]);
  }

  async loadHtml(htmlUrl: string): Promise<string> {
    return fetch(htmlUrl).then(response => {
      return response.text();
    })
  }

  saveTaskHtml(presentationId: string, id: string, type: CardItemType, html: string): Promise<[string, string]> {
    const taskRef = this.fireStorage.storage.ref(`${presentationId}/${type}`).child(id);
    const taskImageRef = taskRef.child('image.png');
    const taskHtmlRef = taskRef.child('task.html');
    return Promise.all([this.saveHtml(taskHtmlRef, html), this.saveImage(taskImageRef, html)]);

  }

  private saveHtml(ref: any, html: string): Promise<string> {
    return ref.putString(html).then(() => {
      return ref.getDownloadURL()
    })
  }

  private async saveImage(ref: any, html: string): Promise<string> {
    const image = await this.imageService.generateImage(html);
    return ref.put(image, {contentType: 'image/png',}).then(() => {
      return ref.getDownloadURL();
    })
  }
}
