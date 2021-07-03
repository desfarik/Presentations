import {Component, OnInit} from '@angular/core';
import {CardItem, CardItemType} from "../card-list/card-item";

@Component({
  selector: 'app-task-panel',
  templateUrl: './task-panel.component.html',
  styleUrls: ['./task-panel.component.scss']
})
export class TaskPanelComponent implements OnInit {

  types = CardItemType;

  lessonItems: CardItem[] = [
    {title: "Задание1", image: '', type: CardItemType.SCHOOL},
    {title: "Задание2", image: '', type: CardItemType.SCHOOL},
    {title: "Задание3", image: '', type: CardItemType.SCHOOL},
    {title: "Задание4", image: '', type: CardItemType.SCHOOL}]

  homeLessons: CardItem[] = [
    {title: "Задание1", image: '', type: CardItemType.HOME},
    {title: "Задание2", image: '', type: CardItemType.HOME}]

  constructor() {
  }

  ngOnInit(): void {
  }

  createNewTask(type: CardItemType): void {
    console.log(type);
  }

}
