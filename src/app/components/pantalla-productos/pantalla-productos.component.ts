import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-pantalla-productos',
  templateUrl: './pantalla-productos.component.html',
  styleUrls: ['./pantalla-productos.component.css']
})

export class PantallaProductosComponent implements OnInit{

  productos: any[] = []; // Array para almacenar los productos
  img_default = "assets/default.PNG"
  paginaActual = 1;

  categorias: any[] = [];
  showFiltersSidebar = false;
  provinciaCtrl = new FormControl();
  filteredProvincias: Observable<string[]>;

  estado: string = "";
  formaEnvio: string = "";
  provincia: string = "";

  queryCategoria: string = "";
  queryFiltros: string = "";
  queryNombre: string = "";

  constructor(private http: HttpClient,  private router: Router) { 
    this.filteredProvincias = this.provinciaCtrl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterProvincias(value))
    );
  }

  ngOnInit(): void {
    this.obtenerProductos();
    this.http.get<any[]>('http://localhost:7000/categorias').subscribe(
      categorias => {
        this.categorias = categorias;
        console.log('Categorías obtenidas:', categorias);
      },
      error => {
        console.error('Error al obtener categorías:', error); 
      }
    );
  }

  openFiltersSidebar() {
    if(this.showFiltersSidebar == true){
      this.showFiltersSidebar = false;
    }else{
      this.showFiltersSidebar = true;
    }
  }


  provincias: string[] = [
    'Álava', 'Albacete', 'Alicante', 'Almería', 'Asturias', 'Ávila', 'Badajoz', 'Barcelona', 'Burgos', 'Cáceres',
    'Cádiz', 'Cantabria', 'Castellón', 'Ciudad Real', 'Córdoba', 'La Coruña', 'Cuenca', 'Gerona', 'Granada',
    'Guadalajara', 'Guipúzcoa', 'Huelva', 'Huesca', 'Islas Baleares', 'Jaén', 'León', 'Lérida', 'Lugo', 'Madrid',
    'Málaga', 'Murcia', 'Navarra', 'Orense', 'Palencia', 'Las Palmas', 'Pontevedra', 'La Rioja', 'Salamanca',
    'Segovia', 'Sevilla', 'Soria', 'Tarragona', 'Santa Cruz de Tenerife', 'Teruel', 'Toledo', 'Valencia',
    'Valladolid', 'Vizcaya', 'Zamora', 'Zaragoza', 'Ceuta', 'Melilla'
  ];

  displayProvincia(provincia: string): string {
    return provincia ? provincia : '';
  }

  private _filterProvincias(value: string): string[] {
    const filterValue = this._normalize(value.toLowerCase());
  
    return this.provincias.filter(provincia => this._normalize(provincia.toLowerCase()).includes(filterValue));
  }
  
  private _normalize(str: string): string {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  filtrar(){
    this.paginaActual = 1;
    this.productos = []
    console.log(this.provincia)
    console.log(this.formaEnvio)
    console.log(this.estado)


    let prov = "";
    let estado = "";
    let formaEnvio = "";

    if(this.provincia !== ""){
      prov = "provincia="+this.provincia
    }
    if(this.estado !== "" ){
      estado = "estado="+this.estado
    }
    if(this.formaEnvio !== ""){
      formaEnvio = "envioDisponible="+this.formaEnvio
    }

    this.queryFiltros = [prov, estado, formaEnvio].filter(Boolean).join('&');
    console.log(this.queryFiltros)
    sessionStorage.setItem('query', `${this.queryCategoria}&${this.queryFiltros}&${this.queryNombre}`)


    this.http.get<any[]>(`http://localhost:7000/productos/${this.paginaActual}/3?${sessionStorage.getItem('query')}`) 
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

  //////////////////////

 

  obtenerProductos() {
    if(sessionStorage.getItem('query')){
      this.http.get<any[]>(`http://localhost:7000/productos/${this.paginaActual}/3?${sessionStorage.getItem('query')}`) 
      .subscribe(
        (data) => {
          this.productos.push(...data);
          console.log(this.productos)
        },
        (error) => {
          console.error('Error al obtener los productos:', error);
        }
      );
    }else{
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

  buscarCategoria(categoria: string){
    this.productos = []
    console.log(categoria)
    this.queryCategoria = "categoriaPrinc="+categoria


    // if(!sessionStorage.getItem('query') || sessionStorage.getItem('query') == ''){
    //   sessionStorage.setItem('query', queryString)
    // }else{
    //   let cad = sessionStorage.getItem('query');
    //   let cads= cad!.split('&')
    //   for(let i=0; i< cads!.length; i++){
    //     if(cads![i].split('=')[0] == 'categoriaPrinc'){
    //       cads[i] = ''
    //     }
    //   }

    //   console.log(cads)

    //   queryString = cads + queryString

    //   console.log('QUERY: '+queryString)

    //   sessionStorage.setItem('query', queryString)
    //   queryString = sessionStorage.getItem('query')!;
    // }
    sessionStorage.setItem('query', `${this.queryCategoria}&${this.queryFiltros}&${this.queryNombre}`)


    this.http.get<any[]>(`http://localhost:7000/productos/${this.paginaActual}/3?${sessionStorage.getItem('query')}`) 
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

  // Función para limpiar los filtros
  limpiarFiltros(): void {
    // Restablece los valores de las variables a su valor base
    this.provincia = '';
    this.estado = '';
    this.formaEnvio = '';
  }
  
}

export class SliderFormattingExample {
  formatLabel(value: number): string {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return `${value}`;
  }
}
