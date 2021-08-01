import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Presentation} from "../../core/dto/presentation";
import {PresentationService} from "../../core/service/presentation.service";
import {CardItem, CardItemType} from "../../components/card-list/card-item";
import {Router} from "@angular/router";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent implements OnInit {

  presentations: Presentation[] = []

  constructor(private presentationService: PresentationService,
              private router: Router,
              private changeDetector: ChangeDetectorRef) {
  }

  async ngOnInit(): Promise<void> {
    this.presentations = await this.presentationService.getAll()
    this.changeDetector.detectChanges();
  }

  edit(presentation: CardItem): void {
    this.router.navigateByUrl(`/edit/${presentation.id}`)
  }

  view(presentation: CardItem): void {
    this.router.navigateByUrl(`/view/${presentation.id}`)
  }
}
