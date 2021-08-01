import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { PresentationService } from "../../core/service/presentation.service";
import { StorageService } from "../../core/service/storage.service";
import { Presentation } from "../../core/dto/presentation";

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private router: Router,
              private presentationService: PresentationService,
              private storageService: StorageService) {
  }

  presentation!: Presentation;
  html!: string;

  async ngOnInit(): Promise<void> {
    this.presentation = this.route.snapshot.data.presentation;
    this.html = await this.storageService.loadHtml(this.presentation.htmlUrl)
    console.log(this.html);
  }

}
