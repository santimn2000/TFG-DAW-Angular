import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ChatService } from 'src/app/services/chat.service';
import { UserService } from 'src/app/services/user.service';
import { ProductService } from 'src/app/product.service';
import { InteresService } from 'src/app/services/interes.service';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.css']
})
export class ChatsComponent {
  contacts: any[] = [];
  chat: any;
  selectedContact: any;
  messages: any[] = [];
  newMessage: string = '';
  usuario1: any = '';
  usuario2: any = '';

  constructor(private router: Router, private interesService: InteresService, private productService: ProductService, private userService: UserService, private chatService: ChatService, private jwtHelper: JwtHelperService) { }

  ngOnInit(): void {
    // Obtener el id de usuario del token o de otra manera
    const token = localStorage.getItem('token');
    if (!token || this.jwtHelper.isTokenExpired(token)) {
      this.router.navigate(['/home']);
    } else {
      const decodedToken = this.jwtHelper.decodeToken(token);
      const userId = decodedToken.usuarioId;
    
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

  selectContact(chatId: any, userId:string, productId:string): void {
    
    console.log("Chat id: "+chatId)
    this.chatService.obtenerMensajes(chatId).subscribe((data: any[]) => {
      this.chat = data[0];
      console.log(this.chat)

      this.userService.getUserById(userId).subscribe((data: any[]) => {
        this.usuario1 = data;
        
      });

      this.userService.getUserByProductId(productId).subscribe((data: any[]) => {
        this.usuario2 = data;
        
      });

      this.selectedContact = this.chat;
      this.messages = this.chat.mensajes
      console.log(this.messages)
    });

    
    // Aquí podrías cargar los mensajes del usuario seleccionado
    // this.apiService.getMessages(contact.id_usuario).subscribe((data: any[]) => {
    //   this.messages = data;
    // });
  }

  enviarMensaje(): void {
    if (this.newMessage.trim() !== '') {

      let mensaje = {
        id_usuario: this.usuario1._id,
        texto: this.newMessage
      }

      this.messages.push(mensaje)
      // Realizar la solicitud POST al servidor
      const url = 'http://localhost:7000/chat';
      this.chatService.enviarMensaje(this.chat.id_interes, this.usuario1._id, this.newMessage).subscribe((data: any[]) => {
        
      });
      
    }
  }
}
