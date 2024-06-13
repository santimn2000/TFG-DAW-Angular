import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-mis-productos',
  templateUrl: './mis-productos.component.html',
  styleUrls: ['./mis-productos.component.css']
})
export class MisProductosComponent{

  usuario: any = {}; // Objeto donde se almacenarán los datos del usuario
  productos: any[] = [];

  constructor(private userService: UserService, private productService: ProductService, private router: Router, private jwtHelper: JwtHelperService,) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (!token || this.jwtHelper.isTokenExpired(token)) {
      this.router.navigate(['/home']);
    } else {
      const decodedToken = this.jwtHelper.decodeToken(token);
      const userId = decodedToken.usuarioId;

      this.productService.getProductosByUserId(userId).subscribe(
        (productos) => {
          // Asignar los productos obtenidos al array 'productos'
          this.productos = productos;
          console.log('Productos del usuario:', productos);
        },
        (error) => {
          console.error('Error al obtener los productos del usuario:', error);
        }
      );
    }
  }

  redirectToProductInfo(productId: string): void {
    // Guardar el ID del producto en sessionStorage
    sessionStorage.setItem('productId', productId);
    // Redirigir a la ruta infoProducto
    this.router.navigate(['/infoProducto']);
  }
}
