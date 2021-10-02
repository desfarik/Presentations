import {Injectable} from '@angular/core';
import * as html2canvas from 'html2canvas';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor() {
  }


  async generateImage(html: string): Promise<Blob | null> {
    const appendedHtml = this.appendHtml(html)
    // await this.waitAllImageLoading(appendedHtml);
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

  async waitAllImageLoading(appendedHtml: HTMLElement): Promise<any> {
    const images = appendedHtml.querySelectorAll('img');
    if (images.length === 0) {
      return;
    }
    const promises: any[] = [];
    images.forEach(image => {
        const promise = new Promise(resolve => {
            image.onload = () => {
              resolve(true);
            }
          }
        )
        promises.push(promise)
      }
    )
    return Promise.race([Promise.all(promises), wait(2000)])
  }


  private appendHtml(html: string): HTMLElement {
    const div = document.createElement('div')
    div.style.width = '700px'
    div.style.height = '300px';
    div.style.overflow = 'hidden'
    div.style.padding = '16px'
    div.innerHTML = html;
    document.body.appendChild(div);
    while (div.childElementCount > 20) {
      // @ts-ignore
      div.lastElementChild.remove();
    }
    return div;
  }
}


function wait(delay: number): Promise<void> {
  return new Promise<void>(resolve => {
    setTimeout(() => resolve(), delay)
  })
}
