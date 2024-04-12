import { Component } from '@angular/core';

@Component({
  selector: 'app-pantalla-productos',
  templateUrl: './pantalla-productos.component.html',
  styleUrls: ['./pantalla-productos.component.css']
})
export class PantallaProductosComponent {
  showCategories = false;

  toggleCategories() {
    this.showCategories = !this.showCategories;
  }
}
