import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-prods',
  templateUrl: './lista-prods.component.html',
  styleUrls: ['./lista-prods.component.css']
})
export class ListaProdsComponent implements OnInit{
  productos: any[] = []; // Array para almacenar los productos
  img_default = "assets/default.PNG"
  paginaActual = 1;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.obtenerProductos();
  }

  obtenerProductos() {
    this.http.get<any[]>(`http://localhost:7000/productos/${this.paginaActual}/3`) 
      .subscribe(
        (data) => {
          this.productos.push(...data);
          console.log(this.productos)
        },
        (error) => {
          console.error('Error al obtener los productos:', error);
        }
      );
  }

  cargarMasProductos(): void {
    this.paginaActual++; // Incrementar el contador de página
    this.obtenerProductos(); // Obtener más productos
  }

  redirectToProductInfo(productId: string): void {
    // Guardar el ID del producto en sessionStorage
    sessionStorage.setItem('productId', productId);
    // Redirigir a la ruta infoProducto
    this.router.navigate(['/infoProducto']);
  }
}
