import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-create-dialog',
  templateUrl: './create-dialog.component.html',
  styleUrls: ['./create-dialog.component.scss'],
})
export class CreateDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { label: string; header: string; confirm: string; cancel: string }) {
  }
  public name = '';

}
