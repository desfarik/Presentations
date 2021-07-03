import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {editorConfig} from "../editor.config";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Task} from "../../../core/dto/task";

@Component({
  selector: 'app-editor-dialog',
  templateUrl: './task-editor-dialog.component.html',
  styleUrls: ['./task-editor-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskEditorDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public task: Task) {
    if (task) {
      this.title = task.title;
    }
  }

  config = {
    ...editorConfig
  }

  title = ''

  ngOnInit(): void {
  }

}
