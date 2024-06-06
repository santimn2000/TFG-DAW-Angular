import { AfterViewChecked, AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ChatService } from 'src/app/services/chat.service';
import { UserService } from 'src/app/services/user.service';
import { ProductService } from 'src/app/product.service';
import { InteresService } from 'src/app/services/interes.service';

import { Socket, io } from 'socket.io-client';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.css']
})
export class ChatsComponent implements AfterViewChecked{
  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;

  socket: any
  private messageSubscription: Subscription = new Subscription();
  
  contacts: any[] = [];
  chat: any;
  selectedContact: any;
  selectedContactId: any;
  messages: any[] = [];
  newMessage: string = '';
  usuario1: any = '';
  usuario2: any = '';

  userId: string = '';

  private url = 'http://localhost:7000';

  constructor(private router: Router, private interesService: InteresService, private productService: ProductService, private userService: UserService, private chatService: ChatService, private jwtHelper: JwtHelperService) {
    
   }

  ngOnInit(): void {
    // Obtener el id de usuario del token o de otra manera
    const token = localStorage.getItem('token');
    if (!token || this.jwtHelper.isTokenExpired(token)) {
      this.router.navigate(['/home']);
    } else {
      const decodedToken = this.jwtHelper.decodeToken(token);
      const userId = decodedToken.usuarioId;
      this.userId = userId
    
      // Obtener la lista de contactos del usuario
      this.chatService.obtenerContactos(userId).subscribe((data: any[]) => {
        this.contacts = data;
        console.log(this.contacts)


        for(let i=0; i<this.contacts.length; i++){
          this.productService.getProductById(this.contacts[i].id_producto).subscribe((data: any) => {
            console.log(data)
            this.contacts[i].nomProd = data.nombre
          });
        }
        
      });
    }
  }

  selectContact(chatId: any, userId: string, productId: string): void {
    console.log("Chat id: " + chatId);
    this.selectedContactId = chatId;
  
    // Desconectar si ya hay una conexión existente
    if (this.socket) {
      this.socket.off('connect');
      this.socket.off('disconnect');
      this.socket.off('newMessage');
      console.log('Cleared previous socket events');
    }
  
    this.chatService.obtenerMensajes(chatId).subscribe((data: any[]) => {
      console.log(data);
      this.chat = data[0];
      console.log(this.chat);
  
      this.userService.getUserById(userId).subscribe((data: any) => {
        this.usuario1 = data;
  
        this.userService.getUserByProductId(productId).subscribe((data: any) => {
          this.usuario2 = data;
  
          if (this.usuario2._id === this.userId) {
            console.log("ENtra");
            let aux = this.usuario2;
            this.usuario2 = this.usuario1;
            this.usuario1 = aux;
          }
        });
      });
  
      console.log(this.usuario2?._id);
      console.log(this.userId);
  
      this.selectedContact = this.chat;
      this.messages = this.chat.mensajes || [];
      console.log(this.messages);
  
      // Establecer nueva conexión de WebSocket si no existe
      if (!this.socket) {
        this.socket = io('http://localhost:4000');
  
        this.socket.on('connect', () => {
          console.log('Connected to server');
        });
  
        this.socket.on('disconnect', () => {
          console.log('Disconnected from server');
        });
      }
  
      // Cancelar la suscripción anterior si existe
      if (this.messageSubscription) {
        this.messageSubscription.unsubscribe();
        console.log('Unsubscribed from previous message observable');
      }
  
      // Manejar nuevos mensajes
      this.messageSubscription = this.chatService.onNewMessage().subscribe((mensaje) => {
        this.messages.push(mensaje);
        this.scrollToBottom();
      });
  
      // Unirse al chat después de establecer la conexión
      this.chatService.joinChat(chatId);
    });
  

    
    
    // Aquí podrías cargar los mensajes del usuario seleccionado
    // this.apiService.getMessages(contact.id_usuario).subscribe((data: any[]) => {
    //   this.messages = data;
    // });
  }


  // enviarMensaje(): void {
  //   if (this.newMessage.trim() !== '') {

  //     let mensaje = {
  //       id_usuario: this.usuario1._id,
  //       texto: this.newMessage
  //     }

  //     this.messages.push(mensaje)
  //     // Realizar la solicitud POST al servidor
  //     const url = 'http://localhost:7000/chat';
  //     this.chatService.enviarMensaje(this.chat.id_interes, this.usuario1._id, this.newMessage).subscribe((data: any[]) => {
  //       this.scrollToBottom();
  //     });
      
  //   }
  // }

  
  enviarMensaje() {
    if (this.newMessage.trim() !== '') {
      const mensaje = {
        id_usuario: this.usuario1._id,
        texto: this.newMessage,
      };

      //this.messages.push(mensaje)

      this.chatService.enviarMensaje(this.chat.id_interes, this.usuario1._id, this.newMessage).subscribe(() => {
        this.newMessage = '';
        this.scrollToBottom();
      });
    }
  }

  

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    if (this.selectedContact) {
      try {
        this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
      } catch (err) {
        console.error('Error while scrolling to bottom:', err);
      }
    }
  }
}
