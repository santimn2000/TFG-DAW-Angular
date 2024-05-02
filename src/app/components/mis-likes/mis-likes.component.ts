import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-mis-likes',
  templateUrl: './mis-likes.component.html',
  styleUrls: ['./mis-likes.component.css']
})
export class MisLikesComponent implements OnInit {
  usuarioId: string = "";
  usuario: any = {};
  carrito: any[] = [];

  constructor(private router: Router,
    private userService: UserService,
    private authService: AuthService,
    private jwtHelper: JwtHelperService,) {}

  ngOnInit(): void {
    // Decodificar el token JWT para obtener el usuarioId
    const token = localStorage.getItem('token');
    if (!token || this.jwtHelper.isTokenExpired(token)) {
      this.router.navigate(['/home']);
    } else {
      const decodedToken = this.jwtHelper.decodeToken(token);
      const userId = decodedToken.usuarioId;
      this.userService.getUserById(userId).subscribe(
        response => {
          console.log('Información del usuario:', response);
          // Aquí puedes asignar la información del usuario a propiedades del componente
          this.usuario = response;
          this.carrito = response.carrito;
        },
        error => {
          console.error('Error al obtener la información del usuario:', error);
        }
      );
    }
  }
}
