import { PresentationService } from '../../core/service/presentation.service';
import { StorageService } from '../../core/service/storage.service';
import { Presentation } from '../../core/dto/presentation';
import { ActivatedRoute, Router } from '@angular/router';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private router: Router,
              private presentationService: PresentationService,
              private changeDetector: ChangeDetectorRef,
              private storageService: StorageService) {
  }

  presentation!: Presentation;
  html!: string;

  async ngOnInit(): Promise<void> {
    this.presentation = this.route.snapshot.data.presentation;
    this.html = await this.storageService.loadHtml(this.presentation.htmlUrl);
    this.changeDetector.detectChanges();
    console.log(this.html);
  }

}
