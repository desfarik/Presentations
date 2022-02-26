import { editorConfig } from './editor.config';
import { PresentationService } from '../../core/service/presentation.service';
import { Presentation } from '../../core/dto/presentation';
import { TaskPanelComponent } from '../../components/task-panel/task-panel.component';
import { StorageService } from '../../core/service/storage.service';
import { EditorComponent } from '@tinymce/tinymce-angular';
import { ActivatedRoute, Router } from '@angular/router';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
  presentationId!: string;

  config = {
    ...editorConfig,
    content_style: `
    body {
        background: white;
        margin: 12px auto 0;
        padding: 1px 16px;
        min-height: calc(100% - 16px);
        box-shadow: 0 1px 4px 0 rgb(0 0 0 / 37%);
        }
    html {
        background: whitesmoke;
        height: 100%;
    }`,
    images_upload_handler: async (imageFile: any, successCallback: any, failCallback: any) => {
      try {
        const url = await this.storageService.saveContentImage(this.presentationId, imageFile.blob());
        successCallback(url);
      } catch (e) {
        failCallback(e);
      }
    },
  };

  @ViewChild(EditorComponent)
  private editorComponent!: EditorComponent;

  @ViewChild(TaskPanelComponent)
  private taskPanelComponent!: TaskPanelComponent;

  async ngOnInit(): Promise<void> {
    this.presentation = this.route.snapshot.data.presentation;
    if (this.presentation) {
      this.title = this.presentation.title;
    }
    this.presentationId = this.presentation?.id || this.presentationService.generateId();
    console.log(this.presentation);
  }

  async ngAfterViewInit(): Promise<void> {
    if (this.presentation) {
      const html = await this.storageService.loadHtml(this.presentation.htmlUrl);
      this.editorComponent.editor.setContent(html);
      console.log(html);
    }
  }

  async save() {
    const html = this.editorComponent.editor.getContent({ format: 'html' });
    console.log(this.taskPanelComponent.lessonTasks);

    const presentation = await this.presentationService.save(this.presentationId, this.title, html,
      this.taskPanelComponent.lessonTasks, this.taskPanelComponent.homeTasks);
    if (!this.presentation) {
      this.location.replaceState(`/edit/${presentation.id}`);
    }
    this.presentation = presentation;
    console.log(this.presentation);
  }
}
