import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { RegistroModalComponent } from '../registro-modal/registro-modal.component';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  jwtToken!: string | null;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.jwtToken = localStorage.getItem('jwtToken');
  }

  openLoginModal(): void {
    const dialogRef = this.dialog.open(RegistroModalComponent, {
      width: '400px',
      // Aquí puedes agregar cualquier configuración adicional para el modal
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
