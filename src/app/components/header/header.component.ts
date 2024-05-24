import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { RegistroModalComponent } from '../registro-modal/registro-modal.component';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {

  jwtToken!: string | null;

  constructor(public dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    this.jwtToken = localStorage.getItem('token');
  }

  openLoginModal(): void {
    const dialogRef = this.dialog.open(RegistroModalComponent, {
      width: '400px',
      // Aquí puedes agregar cualquier configuración adicional para el modal
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.ngOnInit();
    });
  }

  onLoginSuccess(): void {
    console.log("Entra")
    this.jwtToken = localStorage.getItem('token'); // Actualizar el token después del inicio de sesión
  }

  cerrar_sesion(): void{
    localStorage.removeItem('token');
    this.ngOnInit();
  }

  irAInicio(): void {
    const currentRoute = this.router.url; // Obtener la ruta actual
    sessionStorage.removeItem('query');

    if (currentRoute === '/home') {
      window.location.reload(); // Recargar la página si la ruta actual es '/home'
    } else {
      
      this.router.navigate(['/home']); // Navegar a '/home' si la ruta actual no es '/home'
    }
  }
}
