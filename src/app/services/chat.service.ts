import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private apiUrl = 'http://localhost:7000/intereses/usuario/';

  constructor(private http: HttpClient) { }

  obtenerContactos(userId: string): Observable<any[]> {
    const url = `${this.apiUrl}${userId}`;
    return this.http.get<any[]>(url);
  }

  obtenerMensajes(chatId: string): Observable<any[]> {
    const url = `http://localhost:7000/chat/${chatId}`;
    return this.http.get<any[]>(url);
  }

  enviarMensaje(chatId: string, userId: string, texto: string): Observable<any> {
    return this.http.post(`http://localhost:7000/chat/${chatId}`, { id_usuario: userId, texto: texto })
    
  }
}
