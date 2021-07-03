import {Component, OnInit} from '@angular/core';
import {CardItem, CardItemType} from "../card-list/card-item";
import {MatDialog} from "@angular/material/dialog";
import {TaskEditorDialogComponent} from "../../pages/create/task-editor-dialog/task-editor-dialog.component";
import {Task} from "../../core/dto/task";

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

  constructor(public dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  createNewTask(type: CardItemType): void {
    this.dialog.open(TaskEditorDialogComponent).afterClosed().subscribe(newTask => {
      console.log(newTask);
    })
  }

  editTask(task: Task): void {
    console.log(task);
    this.dialog.open(TaskEditorDialogComponent, {
      data: task
    }).afterClosed().subscribe(newTask => {
      console.log(newTask);
    })
  }

}
