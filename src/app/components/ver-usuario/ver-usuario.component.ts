import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/product.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ver-usuario',
  templateUrl: './ver-usuario.component.html',
  styleUrls: ['./ver-usuario.component.css']
})
export class VerUsuarioComponent implements OnInit {

  usuario: any = null; // Objeto donde se almacenarán los datos del usuario
  productos: any[] = [];

  constructor(private userService: UserService, private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    // Obtener el usuarioId del sessionStorage
    const usuarioId = sessionStorage.getItem('usuarioId');


    // Verificar si el usuarioId existe
    if (usuarioId) {
      // Llamar al servicio para obtener los datos del usuario por su ID
      this.userService.getUserById(usuarioId).subscribe(
        (response) => {
          // Asignar los datos del usuario al objeto 'usuario'
          this.usuario = response;
          console.log('Datos del usuario:', response);
        },
        (error) => {
          console.error('Error al obtener los datos del usuario:', error);
        }
      );

      this.productService.getProductosByUserId(usuarioId).subscribe(
        (productos) => {
          // Asignar los productos obtenidos al array 'productos'
          this.productos = productos;
          console.log('Productos del usuario:', productos);
        },
        (error) => {
          console.error('Error al obtener los productos del usuario:', error);
        }
      );


    } else {
      console.error('No se encontró ningún usuarioId en el sessionStorage.');
    }
  }

  redirectToProductInfo(productId: string): void {
    // Guardar el ID del producto en sessionStorage
    sessionStorage.setItem('productId', productId);
    // Redirigir a la ruta infoProducto
    this.router.navigate(['/infoProducto']);
  }
}
