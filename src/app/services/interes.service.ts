import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InteresService {

  constructor(private http: HttpClient) {}

  getInteresById(interesId: string): Observable<any> {
    return this.http.get<any>(`http://localhost:7000/interes/${interesId}`);
  }

  getInteresesByProductId(productId: string): Observable<any> {
    return this.http.get<any>(`http://localhost:7000/intereses/producto/${productId}`);
  }

  createInteres(idUsuario: string, idProducto: string): Observable<any> {
    return this.http.post(`http://localhost:7000/interes`, { id_usuario: idUsuario, id_producto: idProducto })
  }
}
