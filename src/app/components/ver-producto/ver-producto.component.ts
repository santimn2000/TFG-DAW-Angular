import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from '../../services/user.service';
import Swiper from 'swiper';

import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { InteresService } from 'src/app/services/interes.service';
import { ChatService } from 'src/app/services/chat.service';
import { RegistroModalComponent } from '../registro-modal/registro-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-ver-producto',
  templateUrl: './ver-producto.component.html',
  styleUrls: ['./ver-producto.component.css']
})
export class VerProductoComponent {

  img_default = "assets/default.PNG"
  producto: any = null;
  usuarioVendedor: any;
  usuario: any = null;
  UserService: any;
  isLiked: boolean = false;
  token: string | null = null;
  imagenes: string[] = [];
  contactado: boolean = false;

  esMio: boolean = false;
  interesesEnProducto: any;

  constructor(public dialog: MatDialog, public router: Router, private route: ActivatedRoute, private userService: UserService, private productService: ProductService, private interesService: InteresService, private chatService: ChatService, private http: HttpClient, private jwtHelper: JwtHelperService) { }

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

            this.interesService.getInteresesByProductId(productId).subscribe(
              (response: any) => {
                this.interesesEnProducto = response;

                console.log(this.interesesEnProducto)
                for(let i=0; i< this.interesesEnProducto.length; i++){
                  if(this.interesesEnProducto[i].id_usuario == this.usuario._id){
                    this.contactado = true;
                  }
                }
              }
            )

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

  crearConexionEntreUsuarios() {

    if(!localStorage.getItem('token')){
      console.log('No hay sesion');
      const dialogRef = this.dialog.open(RegistroModalComponent, {
        width: '400px',
        // Aquí puedes agregar cualquier configuración adicional para el modal
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.ngOnInit();
      });
    }else{
      var idUsuario = this.usuario._id;
      var idProducto = this.producto._id

      this.interesService.createInteres(idUsuario, idProducto).subscribe(
        response => {
          var idInteres = response._id

          this.chatService.createChat(idInteres).subscribe(
            response => {
              console.log(response)
              this.contactado = true
            },
            error => {
              console.error('Error al crear el chat:', error);
            }
          )
        },
        error => {
          console.error('Error al crear el interes:', error);
        }
      );
    }

  }

  eliminarProd(){
    const idProducto = this.producto._id;

    this.productService.eliminarProducto(idProducto).subscribe(
      (response: any) => {
        console.log('Producto eliminado');
        this.router.navigate(['/perfil'])
      }
    )
  }
}
