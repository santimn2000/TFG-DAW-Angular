import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro-modal',
  templateUrl: './registro-modal.component.html',
  styleUrls: ['./registro-modal.component.css']
})
export class RegistroModalComponent {
  
  loginForm: FormGroup;
  credencialesIncorrectas: boolean = false

  constructor(
    public dialogRef: MatDialogRef<RegistroModalComponent>,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  registrarse(): void{
    // Cierra el modal
    this.dialogRef.close();
    // Redirige a la ruta 'registro'
    this.router.navigate(['/registro']);
  }

  login(): void {
    if (this.loginForm.invalid) {
      return;
    }
  
    const username = this.loginForm.get('username')?.value;
    console.log("Username: "+username)
    const password = this.loginForm.get('password')?.value;
  
    this.authService.login(username, password).subscribe(
      response => {
        console.log('Inicio de sesión exitoso:', response.token);
        localStorage.setItem('token', response.token);
        this.close();
      },
      error => {
        console.error('Error al iniciar sesión:', error);
        if (error.status === 401) {
          this.credencialesIncorrectas = true;
        }
      }
    );
  }
}
