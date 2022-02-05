import { Presentation } from '../../core/dto/presentation';
import { PresentationService } from '../../core/service/presentation.service';
import { CardItem } from '../../components/card-list/card-item';
import { AuthenticationService } from '../../core/service/authentication.service';
import { Router } from '@angular/router';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent implements OnInit {

  presentations: Presentation[] = [];

  constructor(private presentationService: PresentationService,
              private router: Router,
              public authenticationService: AuthenticationService,
              private changeDetector: ChangeDetectorRef) {
  }

  async ngOnInit(): Promise<void> {
    this.presentations = await this.presentationService.getAll();
    this.changeDetector.detectChanges();
  }

  edit(presentation: CardItem): void {
    this.router.navigateByUrl(`/edit/${presentation.id}`);
  }

  view(presentation: CardItem): void {
    this.router.navigateByUrl(`/view/${presentation.id}`);
  }
}
