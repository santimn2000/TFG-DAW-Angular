import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/product.service';
import { UserService } from '../../services/user.service';
import Swiper from 'swiper';

import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-ver-producto',
  templateUrl: './ver-producto.component.html',
  styleUrls: ['./ver-producto.component.css']
})
export class VerProductoComponent {
  img_default = "assets/default.PNG"
  producto: any;
  usuarioVendedor: any;
  usuario: any;
  UserService: any;
  isLiked: boolean = false;
  token: string | null = null;
  imagenes: string[] = [];

  esMio: boolean = false;

  constructor(private route: ActivatedRoute, private userService: UserService, private productService: ProductService, private http: HttpClient, private jwtHelper: JwtHelperService) { }

  ngOnInit(): void {
    this.showSlide(this.slideIndex);
    // Leer el ID del producto del sessionStorage
    const productId = sessionStorage.getItem('productId');
    this.token = localStorage.getItem('token');
    let decodedToken:any = "";
    let userId = "";

    if (productId) {
      // Hacer la solicitud para obtener los detalles del producto
      this.productService.getProductById(productId).subscribe(
        (response) => {
          // Asignar el producto obtenido
          this.producto = response;
          this.imagenes = this.producto.imagenes;
          console.log('Detalles del producto:', response);
        },
        (error) => {
          console.error('Error al obtener detalles del producto:', error);
        }
      );

      this.userService.getUserByProductId(productId).subscribe(
        (response: any) => {
          this.usuarioVendedor = response;
          console.log('Detalles del usuarioVendedor:', response);
          
          if(this.token){
            decodedToken = this.jwtHelper.decodeToken(this.token);
            userId = decodedToken.usuarioId;

            if(this.usuarioVendedor._id == userId){
              this.esMio = true;
            }
          }
        }
      )
      

      if(this.token){
        decodedToken = this.jwtHelper.decodeToken(this.token);
        userId = decodedToken.usuarioId;

        this.userService.getUserById(userId).subscribe(
          (response: any) => {
            this.usuario = response;
            console.log('Detalles del usuarioActual:', response);
            if(this.usuario.carrito.includes(productId)){
              console.log("Ya lo tienes con like")
              this.isLiked = true;
            }else{
              this.isLiked = false;
            }
            
          }
        )

      }

      
    } else {
      console.error('No se encontró ningún ID de producto en sessionStorage.');
    }
  }


  toggleLike(): void {
    if(this.token){
      this.isLiked = !this.isLiked;
      if (this.isLiked) {
        const token:any = localStorage.getItem('token');
        const decodedToken = this.jwtHelper.decodeToken(token);
        const usuarioId = decodedToken.usuarioId;
  
        // Obtener el id del producto del sessionStorage
        const idProducto = sessionStorage.getItem('productId');
  
        // Realizar la consulta PUT al servidor
        this.http.put(`http://localhost:7000/usuario/${usuarioId}/carrito/add`, { carrito: idProducto }).subscribe(
          response => {
            console.log('Producto añadido al carrito:', response);
          },
          error => {
            console.error('Error al añadir el producto al carrito:', error);
          }
        );
      } else {
        console.log('no like');
        const token:any = localStorage.getItem('token');
        const decodedToken = this.jwtHelper.decodeToken(token);
        const usuarioId = decodedToken.usuarioId;
  
        // Obtener el id del producto del sessionStorage
        const idProducto = sessionStorage.getItem('productId');
  
        // Realizar la consulta PUT al servidor
        this.http.put(`http://localhost:7000/usuario/${usuarioId}/carrito/del`, { carrito: idProducto }).subscribe(
          response => {
            console.log('Producto eliminado del carrito:', response);
          },
          error => {
            console.error('Error al eliminar el producto al carrito:', error);
          }
        );
      }
    }else{
      console.log("No has iniciado sesion"); 
    }
    
  }

  guardarIdUsuario(idUsuario: string): void {
    // Guardar el _id en sessionStorage
    sessionStorage.setItem('usuarioId', idUsuario);
  }

  slideIndex: number = 1;

  moveSlide(moveStep: number) {
    this.showSlide(this.slideIndex += moveStep);
  }

  currentSlide(n: number) {
    this.showSlide(this.slideIndex = n);
  }

  showSlide(n: number) {
    if (n > this.imagenes.length) { this.slideIndex = 1; }
    if (n < 1) { this.slideIndex = this.imagenes.length; }
  }
}
