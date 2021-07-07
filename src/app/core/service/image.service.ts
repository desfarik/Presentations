import {Injectable} from '@angular/core';
import * as html2canvas from 'html2canvas';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor() {
  }


  generateImage(html: string): Promise<Blob | null> {
    const appendedHtml = this.appendHtml(html)
    return new Promise(resolve => {
      try {
        // @ts-ignore
        html2canvas(appendedHtml).then((canvas: HTMLCanvasElement) => {
          canvas.toBlob((blob) => resolve(blob), 'image/png,');
        });
      } catch (e) {
        console.error(e);
        resolve(null)
      } finally {
        appendedHtml.remove();
      }
    })

  }


  private appendHtml(html: string): HTMLElement {
    const div = document.createElement('div')
    div.style.width = '700px'
    div.style.height = '300px';
    div.style.overflow = 'hidden'
    div.style.padding = '16px'
    div.innerHTML = html;
    document.body.appendChild(div);
    return div;
  }
}
