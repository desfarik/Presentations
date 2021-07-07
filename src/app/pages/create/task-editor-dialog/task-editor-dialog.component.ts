import {AfterViewInit, ChangeDetectionStrategy, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {editorConfig} from "../editor.config";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Task} from "../../../core/dto/task";
import {EditorComponent} from "@tinymce/tinymce-angular";
import {StorageService} from "../../../core/service/storage.service";

@Component({
  selector: 'app-editor-dialog',
  templateUrl: './task-editor-dialog.component.html',
  styleUrls: ['./task-editor-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskEditorDialogComponent implements OnInit, AfterViewInit {


  @ViewChild(EditorComponent)
  private editorComponent!: EditorComponent;

  config = {
    ...editorConfig
  }

  title = ''
  private htmlLoadPromise!: Promise<string>;

  constructor(@Inject(MAT_DIALOG_DATA) public task: Task,
              public dialogRef: MatDialogRef<TaskEditorDialogComponent>,
              public storageService: StorageService) {
    if (task) {
      this.title = task.title;
      this.htmlLoadPromise = this.storageService.loadHtml(task.htmlUrl);
    }
  }

  ngOnInit(): void {
  }


  close() {
    const html = this.editorComponent.editor.getContent({format: 'html'});
    this.dialogRef.close({title: this.title, html})
  }

  async ngAfterViewInit(): Promise<void> {
    if (this.htmlLoadPromise) {
      const html = await this.htmlLoadPromise;
      this.editorComponent.editor.setContent(html);
    }
  }
}
