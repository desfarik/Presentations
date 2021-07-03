import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CardItem} from "./card-item";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import {Task} from "../../core/dto/task";

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardListComponent implements OnInit {
  @Input()
  items: CardItem[] = [];

  @Input()
  readonly = true

  @Output()
  editTask = new EventEmitter<Task>()

  @Output()
  deleteTask = new EventEmitter<Task>()


  constructor() {
  }

  ngOnInit(): void {
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.items, event.previousIndex, event.currentIndex);
  }
}
