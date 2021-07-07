import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {editorConfig} from "./editor.config";
import {PresentationService} from "../../core/service/presentation.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Presentation} from "../../core/dto/presentation";
import {EditorComponent} from "@tinymce/tinymce-angular";
import {TaskPanelComponent} from "../../components/task-panel/task-panel.component";
import {StorageService} from "../../core/service/storage.service";
import {Location} from "@angular/common";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit, AfterViewInit {

  constructor(private route: ActivatedRoute,
              private router: Router,
              private location: Location,
              private presentationService: PresentationService,
              private storageService: StorageService) {
  }


  editTitleInProgress = false;

  title = 'Название урока';
  presentation!: Presentation;

  config = {
    ...editorConfig
  }

  @ViewChild(EditorComponent)
  private editorComponent!: EditorComponent;

  @ViewChild(TaskPanelComponent)
  private taskPanelComponent!: TaskPanelComponent;

  async ngOnInit(): Promise<void> {
    this.presentation = this.route.snapshot.data.presentation;
    if (this.presentation) {
      this.title = this.presentation.title;
    }
    console.log(this.presentation);
  }

  async ngAfterViewInit(): Promise<void> {
    if (this.presentation) {
      const html = await this.storageService.loadHtml(this.presentation.htmlUrl)
      this.editorComponent.editor.setContent(html);
      console.log(html);
    }
  }

  async save() {
    const html = this.editorComponent.editor.getContent({format: 'html'});
    console.log(this.taskPanelComponent.lessonTasks);

    const presentation = await this.presentationService.save(this.presentation?.id, this.title, html,
      this.taskPanelComponent.lessonTasks, this.taskPanelComponent.homeTasks)
    if (!this.presentation) {
      this.location.replaceState(`/edit/${presentation.id}`)
    }
    this.presentation = presentation;
    console.log(this.presentation);
  }
}
