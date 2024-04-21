import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-registro-modal',
  templateUrl: './registro-modal.component.html',
  styleUrls: ['./registro-modal.component.css']
})
export class RegistroModalComponent {

  constructor(public dialogRef: MatDialogRef<RegistroModalComponent>) { }

  close(): void {
    this.dialogRef.close();
  }
}
