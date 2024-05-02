import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:7000'; // URL base de la API

  constructor(private http: HttpClient) { }

  // Método para obtener un producto por su ID
  getProductById(productId: string): Observable<any> {
    const url = `${this.baseUrl}/producto/${productId}`;
    return this.http.get<any>(url);
  }

  getProductosByUserId(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:7000/productos/usuario/${userId}`);
  }
}
