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
  viewItem = new EventEmitter<Task>()
  @Output()
  editItem = new EventEmitter<Task>()
  @Output()
  deleteItem = new EventEmitter<Task>()

  types = CardItemType;

  constructor() {
  }

  ngOnInit(): void {
  }

  get orderedItems(): CardItem[] {
    if (this.items) {
      return this.items.sort((a, b) => a.order - b.order);
    }
    return [];
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.items, event.previousIndex, event.currentIndex);
    this.changeOrdering(this.items);
  }

  private changeOrdering(items: CardItem[]) {
    items.forEach((item, index) => item.order = index);
  }
}
