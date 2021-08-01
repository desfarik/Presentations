import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {CardItemType} from "../card-list/card-item";
import {MatDialog} from "@angular/material/dialog";
import {TaskEditorDialogComponent} from "../../pages/create/task-editor-dialog/task-editor-dialog.component";
import {Task} from "../../core/dto/task";
import {StorageService} from "../../core/service/storage.service";
import {PresentationService} from "../../core/service/presentation.service";
import {filter} from "rxjs/operators";
import {DeleteDialogComponent} from "../delete-dialog/delete-dialog.component";

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
  readonly = false;

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
        const [url, imageUrl] = await this.storageService.saveTaskHtml(this.presentationId, id, type, html)
        this.updateItems(new Task(id, imageUrl, title, url, type, Number.MAX_SAFE_INTEGER));
      })
  }

  editTask(task: Task): void {
    this.dialog.open(TaskEditorDialogComponent, {
      data: task
    })
      .afterClosed()
      .pipe(filter(Boolean))
      .subscribe(async ({title, html}: any) => {
        const [url, imageUrl] = await this.storageService.saveTaskHtml(this.presentationId, task.id, task.type, html)
        this.updateItems(new Task(task.id, imageUrl, title, url, task.type, task.order));
      })
  }

  deleteTask(task: Task): void {
    this.dialog.open(DeleteDialogComponent, {data: {name: task.title, type: 'задача'}})
      .afterClosed()
      .pipe(filter(Boolean))
      .subscribe(() => {
        if (task.type === CardItemType.SCHOOL) {
          this.lessonTasks = [...this.lessonTasks.filter(t => t.id !== task.id)]
        } else {
          this.homeTasks = [...this.homeTasks.filter(t => t.id !== task.id)]
        }
        this.changeDetector.detectChanges();
      })
  }

  private updateItems(task: Task) {
    if (task.type === CardItemType.SCHOOL) {
      this.lessonTasks = [...(this.lessonTasks?.filter(t => t.id !== task.id) || []), task]
    } else {
      this.homeTasks = [...(this.homeTasks?.filter(t => t.id !== task.id) || []), task]
    }
    this.changeDetector.detectChanges();
  }
}
