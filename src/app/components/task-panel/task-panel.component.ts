import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {CardItem, CardItemType} from "../card-list/card-item";
import {MatDialog} from "@angular/material/dialog";
import {TaskEditorDialogComponent} from "../../pages/create/task-editor-dialog/task-editor-dialog.component";
import {Task} from "../../core/dto/task";
import {StorageService} from "../../core/service/storage.service";
import {PresentationService} from "../../core/service/presentation.service";
import {filter} from "rxjs/operators";

@Component({
  selector: 'app-task-panel',
  templateUrl: './task-panel.component.html',
  styleUrls: ['./task-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskPanelComponent implements OnInit {

  types = CardItemType;
  @Input()
  presentationId!: string;

  @Input()
  lessonTasks: Task[] = [];

  @Input()
  homeTasks: Task[] = [];

  constructor(public dialog: MatDialog,
              private storageService: StorageService,
              private presentationService: PresentationService,
              private changeDetector: ChangeDetectorRef) {
  }

  ngOnInit(): void {
  }

  createNewTask(type: CardItemType): void {
    this.dialog.open(TaskEditorDialogComponent)
      .afterClosed()
      .pipe(filter(Boolean))
      .subscribe(async ({title, html}: any) => {
        const id = this.presentationService.generateTaskId(this.presentationId, type);
        const url = await this.storageService.saveTaskHtml(this.presentationId, id, type, html)
        console.log(url);
        this.updateItems(new Task(id, '', title, url, type, 1));
      })
  }

  editTask(task: Task): void {
    this.dialog.open(TaskEditorDialogComponent, {
      data: task
    })
      .afterClosed()
      .pipe(filter(Boolean))
      .subscribe(async ({title, html}: any) => {
        const url = await this.storageService.saveTaskHtml(this.presentationId, task.id, task.type, html)
        console.log(url);
        this.updateItems(new Task(task.id, '', title, url, task.type, task.order));
      })
  }

  private updateItems(task: Task) {
    if (task.type === CardItemType.SCHOOL) {
      this.lessonTasks = [...(this.lessonTasks || []), task]
    } else {
      this.homeTasks = [...(this.homeTasks || []), task]
    }
    this.changeDetector.detectChanges();
  }
}
