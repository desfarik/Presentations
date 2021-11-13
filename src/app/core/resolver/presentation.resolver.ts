import { Presentation } from '../dto/presentation';
import { PresentationService } from '../service/presentation.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PresentationResolver implements Resolve<Presentation | null> {

  constructor(private presentationService: PresentationService) {
  }


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Presentation | null> {
    const id = route.paramMap.get('id') || '';
    if (id === 'new') {
      return Promise.resolve(null);
    }
    return this.presentationService.getById(id);
  }
}
