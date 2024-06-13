import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { ProductService } from 'src/app/services/product.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-mis-likes',
  templateUrl: './mis-likes.component.html',
  styleUrls: ['./mis-likes.component.css']
})
export class MisLikesComponent implements OnInit {
  usuarioId: string = "";
  usuario: any = {};
  carrito: any[] = [];
  productos: any = [];

  constructor(private router: Router,
    private userService: UserService,
    private authService: AuthService,
    private productService: ProductService,
    private jwtHelper: JwtHelperService,) {}

  ngOnInit(): void {
    // Decodificar el token JWT para obtener el usuarioId
    const token = localStorage.getItem('token');
    if (!token || this.jwtHelper.isTokenExpired(token)) {
      this.router.navigate(['/home']);
    } else {
      const decodedToken = this.jwtHelper.decodeToken(token);
      const userId = decodedToken.usuarioId;
      this.userService.getUserById(userId).subscribe(
        response => {
          console.log('Información del usuario:', response);
          this.usuario = response;
          const productosObservables = this.usuario.carrito.map((productId: string) => {
            return this.productService.getProductById(productId);
          });
      
          forkJoin(productosObservables).subscribe(
            productos => {
              console.log('Productos del carrito:', productos);
              // Aquí puedes hacer lo que necesites con los productos obtenidos
              this.productos = productos;
            },
            error => {
              console.error('Error al obtener los productos del carrito:', error);
            }
          );
        },
        error => {
          console.error('Error al obtener la información del usuario:', error);
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
