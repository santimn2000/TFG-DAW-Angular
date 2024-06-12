import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-perfil-info',
  templateUrl: './perfil-info.component.html',
  styleUrls: ['./perfil-info.component.css']
})
export class PerfilInfoComponent {

  usuario: any = {}
  logo: string = "";
  selectedFile: File | null = null;

  constructor(
    private router: Router,
    private userService: UserService,
    private authService: AuthService,
    private jwtHelper: JwtHelperService,
    private http: HttpClient
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

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onUploadLogo(): void {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('logo', this.selectedFile);

      const userId = this.usuario._id;
      this.http.put(`http://localhost:7000/usuario/logo/${userId}`, formData).subscribe(
        (response: any) => {
          console.log('Logo actualizado correctamente', response);
          // Actualiza el logo en el perfil del usuario
          window.location.reload()
        },
        (error) => {
          console.error('Error al actualizar el logo', error);
        }
      );
    }
  }

  
}
