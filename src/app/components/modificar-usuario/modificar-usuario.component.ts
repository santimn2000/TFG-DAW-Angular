import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-modificar-usuario',
  templateUrl: './modificar-usuario.component.html',
  styleUrls: ['./modificar-usuario.component.css']
})
export class ModificarUsuarioComponent implements OnInit{
  usuarioForm: FormGroup;
  token: string | null = null;
  decodedToken: any = null;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private jwtHelper: JwtHelperService
  ) {
    this.usuarioForm = this.fb.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      fecha_nacimiento: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    console.log(this.token)
    if (this.token) {
      this.decodedToken = this.jwtHelper.decodeToken(this.token);
      console.log(this.decodedToken)
      this.cargarDatosUsuario();
    }
  }

  cargarDatosUsuario() {
    const userId = this.decodedToken.usuarioId; // Suponiendo que el token contiene el ID del usuario

    this.http.get(`http://localhost:7000/usuario/${userId}`).subscribe(
      (data: any) => {
        console.log(data)
        const fechaNacimiento = new Date(data.fecha_nacimiento).toISOString().split('T')[0];
        this.usuarioForm.patchValue({
          nombre: data.nombre,
          apellidos: data.apellidos,
          fecha_nacimiento: fechaNacimiento,
          correo: data.correo
        });
      },
      (error) => {
        console.error('Error al cargar los datos del usuario', error);
      }
    );
  }

  onSubmit() {
    if (this.usuarioForm.valid) {
      const userId = this.decodedToken.usuarioId;
      this.http.put(`http://localhost:7000/usuario/${userId}`, this.usuarioForm.value).subscribe(
        (response) => {
          console.log('Usuario actualizado correctamente', response);
          this.router.navigate(['/perfil']); // Navegar a la página de perfil
        },
        (error) => {
          console.error('Error al actualizar el usuario', error);
        }
      );
    }
  }

}
