import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  constructor() {
  }

  config = {
    base_url: '/tinymce',
    suffix: '.min',
    height: '100%'
  }

  ngOnInit(): void {
  }

}
