import {Component, OnInit} from '@angular/core';
import {editorConfig} from "./editor.config";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  constructor() {
  }

  config = {
    ...editorConfig
  }

  ngOnInit(): void {
  }

}
