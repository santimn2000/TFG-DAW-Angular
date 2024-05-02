import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}

  getUserById(userId: string): Observable<any> {
    return this.http.get<any>(`http://localhost:7000/usuario/${userId}`);
  }
  getUserByProductId(productId: string): Observable<any> {
    return this.http.get<any>(`http://localhost:7000/usuarioProd/${productId}`);
  }

  enviarFormulario(usuarioData: any, imagen: File): Observable<any> {
    const formData = new FormData();
    console.log(imagen)
    // Agregar los datos del usuario al formulario
    Object.entries(usuarioData).forEach(([key, value]) => {
      if (typeof value === 'string' && value.trim() !== '') {
        formData.append(key, value);
      }
    });
    // Agregar la imagen al formulario solo si se proporciona una imagen válida
    if (imagen instanceof File) {
      formData.append('logo', 'imagen');
    }

    console.log(formData)
    
    return this.http.post<any>('http://localhost:7000/usuario', formData);
  }
  
} 
