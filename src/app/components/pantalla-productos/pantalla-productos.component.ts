import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-pantalla-productos',
  templateUrl: './pantalla-productos.component.html',
  styleUrls: ['./pantalla-productos.component.css']
})

export class PantallaProductosComponent implements OnInit{

  sesionIniciada: boolean = false;
  usuario: any;
  ciudadUsuario: string | null = null;

  productos: any[] = []; // Array para almacenar los productos
  img_default = "assets/default.PNG"
  paginaActual = 1;

  procesando: boolean = false;

  categorias: any[] = [];
  showFiltersSidebar = false;
  provinciaCtrl = new FormControl();
  filteredProvincias: Observable<string[]>;

  estado: string = "";
  formaEnvio: string = "";
  provincia: string = "";
  precioMinimo: number = 0;
  precioMaximo: number = 99999;
  ordenacion: string = "";

  queryCategoria: string = "";
  queryFiltros: string = "";
  queryNombre: string = "";
  cadFiltros: string | null= null;

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService, private userService: UserService,  private router: Router) {
    this.filteredProvincias = this.provinciaCtrl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterProvincias(value))
    );
  }

  ngOnInit(): void {
    if(localStorage.getItem('token')){
      this.sesionIniciada = true

      const decodedToken = this.jwtHelper.decodeToken(localStorage.getItem('token')!);
      const userId = decodedToken.usuarioId;
      this.userService.getUserById(userId).subscribe(
        response => {
          console.log('Información del usuario:', response);
          // Aquí puedes asignar la información del usuario a propiedades del componente
          this.usuario = response
          this.ciudadUsuario = this.usuario.direccion.ciudad;
          this.obtenerProductos();
        },
        error => {
          console.error('Error al obtener la información del usuario:', error);
        }
      );
    }else{
      this.sesionIniciada = false;
      this.obtenerProductos();
    }
    
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
    let envio_disponible = "";
    let precioMin = "";
    let precioMax = "";
    let nombre = "";
    let ordenacion = ""
    let ciudadUsuario = ""

    if(this.provincia !== ""){
      prov = "provincia="+this.provincia
    }
    if(this.estado !== "" ){
      estado = "estado="+this.estado
    }
    if(this.precioMinimo !== null){
      precioMin = "precioMin="+this.precioMinimo
    }else{
      precioMin = "precioMin=0"
    }
    if(this.precioMaximo !== null){
      precioMax = "precioMax="+this.precioMaximo
    }else{
      precioMax = "precioMax=99999"
    }
    if(this.formaEnvio !== ""){
      envio_disponible = "envio_disponible="+this.formaEnvio
    }
    if(this.ordenacion !== ""){
      switch (this.ordenacion){
        case "precioAsc": ordenacion = "sort=precio&orden=asc"; break;
        case "precioDesc": ordenacion = "sort=precio&orden=desc"; break;
        case "distanciaAsc": ordenacion = "sort=distancia&orden=asc"; break;
        case "distanciaDesc": ordenacion = "sort=distancia&orden=desc"; break;
      }
    }

    if(this.sesionIniciada){
      ciudadUsuario = "ciudadUsuario="+this.usuario.direccion.ciudad
    }

    if(sessionStorage.getItem('filtroNombre')){
      nombre = "nombre="+sessionStorage.getItem('filtroNombre')!;
    }

    this.queryFiltros = [prov, estado, envio_disponible, precioMin, precioMax, nombre, ordenacion, ciudadUsuario].filter(Boolean).join('&');

    sessionStorage.setItem('query', `${this.queryCategoria}&${this.queryFiltros}&${this.queryNombre}`)
    this.cadFiltros = sessionStorage.getItem('query');
    console.log(sessionStorage.getItem('query'))

    this.procesando = true


    this.http.get<any[]>(`http://localhost:7000/productos/${this.paginaActual}/3?${sessionStorage.getItem('query')}`)
      .subscribe(
        (data) => {
          this.productos.push(...data);
          console.log(this.productos);
          this.procesando = false
        },
        (error) => {
          console.error('Error al obtener los productos:', error);
        }
      );
  }

  //////////////////////



  obtenerProductos() {
    this.procesando = true;
    
      let ciudadUsuario = ""
      console.log(this.sesionIniciada)

      let nombre = ""
      if(sessionStorage.getItem('filtroNombre')){
        nombre = "nombre="+sessionStorage.getItem('filtroNombre')!;
      }

      if(this.sesionIniciada){
        console.log(this.usuario.direccion.ciudad)
        ciudadUsuario = "ciudadUsuario="+this.usuario.direccion.ciudad;
        
      }

      sessionStorage.setItem('query', `${this.queryCategoria}&${this.queryFiltros}&${nombre}&${ciudadUsuario}`);
        this.cadFiltros = sessionStorage.getItem('query');
      
      
      
      this.http.get<any[]>(`http://localhost:7000/productos/${this.paginaActual}/3?${sessionStorage.getItem('query')}`)
      .subscribe(
        (data) => {
          this.productos.push(...data);
          console.log(this.productos)
          this.procesando = false;
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

  buscarCategoria(categoria: string){
    this.productos = []
    //console.log(categoria)
    this.queryCategoria = "categoriaPrinc="+categoria
    this.procesando = true

    let ciudadUsuario = "";

    if(this.sesionIniciada){
      ciudadUsuario = "ciudadUsuario="+this.usuario.direccion.ciudad
      sessionStorage.setItem('query', `${this.queryCategoria}&${this.queryFiltros}&${this.queryNombre}&${ciudadUsuario}`)
    }else{
      sessionStorage.setItem('query', `${this.queryCategoria}&${this.queryFiltros}&${this.queryNombre}`)
    }
     
    this.cadFiltros = sessionStorage.getItem('query');

    this.http.get<any[]>(`http://localhost:7000/productos/${this.paginaActual}/3?${sessionStorage.getItem('query')}`)
      .subscribe(
        (data) => {
          this.productos.push(...data);
          console.log(this.productos)
          this.procesando = false
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
    this.precioMaximo = 99999;
    this.precioMinimo = 0;
    this.ordenacion = "";
    this.queryCategoria = "";
    sessionStorage.removeItem('filtroNombre')
  }

}
