import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-material-search',
  templateUrl: './material-search.component.html',
  styleUrls: ['./material-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialSearchComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
