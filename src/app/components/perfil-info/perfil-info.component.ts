import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-perfil-info',
  templateUrl: './perfil-info.component.html',
  styleUrls: ['./perfil-info.component.css']
})
export class PerfilInfoComponent {

  usuario: any = {}
  logo: string = ""

  constructor(
    private router: Router,
    private userService: UserService,
    private authService: AuthService,
    private jwtHelper: JwtHelperService,
  ) {}

  ngOnInit(): void {
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
          this.usuario = response
        },
        error => {
          console.error('Error al obtener la información del usuario:', error);
        }
      );

      this.userService.getLogoUserById(userId).subscribe(
        response => {
          console.log('Información del logo:', response);
          // Aquí puedes asignar la información del usuario a propiedades del componente
          this.logo = response.logo
        },
        error => {
          console.error('Error al obtener la información del usuario:', error);
        }
      );
    }
  }

  
}
