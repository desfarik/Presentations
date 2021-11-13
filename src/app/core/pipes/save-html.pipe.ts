import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'saveHtml',
})
export class SaveHtmlPipe implements PipeTransform {

  constructor(private sanitized: DomSanitizer) {
  }

  transform(value: string): SafeHtml {
    return this.sanitized.bypassSecurityTrustHtml(value);
  }

}
