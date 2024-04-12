import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-prods',
  templateUrl: './lista-prods.component.html',
  styleUrls: ['./lista-prods.component.css']
})
export class ListaProdsComponent implements OnInit{
  productos: any[] = []; // Array para almacenar los productos
  img_default = "assets/default.PNG"

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.obtenerProductos();
  }

  obtenerProductos() {
    this.http.get<any[]>('http://localhost:7000/productos')
      .subscribe(
        (data) => {
          this.productos = data; // Guardar los datos en el array
          console.log(this.productos)
        },
        (error) => {
          console.error('Error al obtener los productos:', error);
        }
      );
  }
}
