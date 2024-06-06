import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private apiUrl = 'http://localhost:7000/intereses/usuario/';
  private socket: Socket;
  private url = 'http://localhost:4000';

  constructor(private http: HttpClient) {
    this.socket = io(this.url);
   }

  obtenerContactos(userId: string): Observable<any[]> {
    const url = `${this.apiUrl}${userId}`;
    return this.http.get<any[]>(url);
  }

  obtenerMensajes(chatId: string): Observable<any[]> {
    const url = `http://localhost:7000/chat/${chatId}`;
    return this.http.get<any[]>(url);
  }

  joinChat(chatId: string): void {
    this.socket.emit('joinChat', chatId);
  }

  enviarMensaje(chatId: string, userId: string, texto: string): Observable<any> {
    return this.http.post(`http://localhost:4000/chat/${chatId}`, { id_usuario: userId, texto: texto })
  }

  onNewMessage(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('nuevoMensaje', (mensaje) => {
        observer.next(mensaje);
      });
    });
  }

  createChat(interesId: string): Observable<any> {
    return this.http.post(`http://localhost:7000/chat`, { idInteres: interesId })
  }

}
