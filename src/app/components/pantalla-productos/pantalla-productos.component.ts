import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-pantalla-productos',
  templateUrl: './pantalla-productos.component.html',
  styleUrls: ['./pantalla-productos.component.css']
})

export class PantallaProductosComponent implements OnInit{
  categorias: any[] = [];
  showFiltersSidebar = false;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
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

  applyFilters() {
    // Aquí puedes acceder a los datos de los filtros y hacer lo que necesites con ellos
    console.log('Filtros aplicados');
    // Por ejemplo, puedes acceder a los valores de los sliders, rangos, etc.
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
