import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { RegistroModalComponent } from '../registro-modal/registro-modal.component';
import { BusquedaServiceService } from 'src/app/services/busqueda-service.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {

  jwtToken!: string | null;

  nombre: string = ""

  constructor(public dialog: MatDialog, private router: Router, private busquedaService: BusquedaServiceService) { }

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
      window.location.reload();
      this.ngOnInit();
    });
  }

  irAddProduct(){
    console.log(localStorage.getItem('token'))
    if(localStorage.getItem('token')){
      console.log('Hay sesion')
      this.router.navigate(['/addProd']);
    }else{
      this.openLoginModal();
    }
  }

  onLoginSuccess(): void {
    console.log("Entra")
    this.jwtToken = localStorage.getItem('token'); // Actualizar el token después del inicio de sesión
  }

  cerrar_sesion(): void{
    localStorage.removeItem('token');
    this.ngOnInit();
    const currentRoute = this.router.url;
    if (currentRoute === '/home') {
      window.location.reload(); // Recargar la página si la ruta actual es '/home'
    } else {

      this.router.navigate(['/home']); // Navegar a '/home' si la ruta actual no es '/home'
    }
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

  buscarPorNombre(){
    this.busquedaService.filtrar(this.nombre);
    sessionStorage.setItem('filtroNombre', this.nombre)

    const currentRoute = this.router.url;

    if (currentRoute === '/home') {
      window.location.reload(); // Recargar la página si la ruta actual es '/home'
    } else {

      this.router.navigate(['/home']); // Navegar a '/home' si la ruta actual no es '/home'
    }
  }
}
