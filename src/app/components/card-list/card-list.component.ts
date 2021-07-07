import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CardItem, CardItemType} from "./card-item";
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
  editItem = new EventEmitter<Task>()
  @Output()
  deleteItem = new EventEmitter<Task>()

  types = CardItemType;

  constructor() {
  }

  ngOnInit(): void {
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.items, event.previousIndex, event.currentIndex);
  }
}
