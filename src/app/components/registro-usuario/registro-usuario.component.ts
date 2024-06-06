import { Component, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { UserService } from 'src/app/services/user.service';
import { CustomValidators } from 'src/app/validators/register-user-validators';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.css']
})
export class RegistroUsuarioComponent {
  @ViewChild('fileInput') fileInput: any;

  formGroup!: FormGroup;
  hide = true;
  hideConfirm = true;
  imagePreview: string | undefined = undefined;
  selectedFile: File | undefined;

  constructor(private formBuilder: FormBuilder, private router:Router, private userService: UserService, private http: HttpClient, public dialog: MatDialog) { }

  ngOnInit(): void {
    // Inicializar el formulario con campos y validaciones
    this.formGroup = this.formBuilder.group({
      // Definir el primer paso del formulario
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      fecha_nacimiento: ['', [Validators.required, CustomValidators.dateOfBirth]],
      correo: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmarPassword: ['', [Validators.required, CustomValidators.passwordMatch('password')]],
      // Definir el segundo paso del formulario
      color: ['', Validators.required],
      logo: [''], // Campo de imagen
      // Definir el tercer paso del formulario
      provincia: ['', Validators.required],
      ciudad: ['', Validators.required],
      calle: ['', Validators.required], // Campo de dirección
    });

    this.formGroup.get('color')!.valueChanges.subscribe((color) => {
      console.log('Color seleccionado:', color);
    });

    this.formGroup.get('logo')!.valueChanges.subscribe((img) => {
      console.log('Imagen:', img);
    });
  }

  // Método para enviar el formulario
  submitForm() {
    if (this.formGroup.valid) {
      // Lógica para enviar el formulario
      console.log('Formulario enviado:', this.formGroup.value);
    } else {
      // El formulario no es válido, mostrar mensajes de error o tomar otras acciones según sea necesario
      console.log('El formulario no es válido. Por favor, complete todos los campos requeridos.');
    }
  }

  showPreview(event: any) {
    const file = event.target.files[0];
    this.selectedFile = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
      console.log(this.imagePreview)
    };
    reader.readAsDataURL(file);
  }

  onSubmit() {
    // Obtén los valores del formulario
    const formData = new FormData();
    formData.append('nombre', this.formGroup.get('nombre')!.value);
    formData.append('apellidos', this.formGroup.get('apellidos')!.value);
    formData.append('fecha_nacimiento', this.formGroup.get('fecha_nacimiento')!.value);
    formData.append('correo', this.formGroup.get('correo')!.value);
    formData.append('username', this.formGroup.get('username')!.value);
    formData.append('password', this.formGroup.get('password')!.value);
    formData.append('confirmarPassword', this.formGroup.get('confirmarPassword')!.value);
    formData.append('color', this.formGroup.get('color')!.value);
    formData.append('provincia', this.formGroup.get('provincia')!.value);
    formData.append('ciudad', this.formGroup.get('ciudad')!.value);
    formData.append('calle', this.formGroup.get('calle')!.value);
    // Agrega la imagen si está seleccionada
    
    if (this.selectedFile) {
      formData.append('logo', this.selectedFile);
    }

    // Realiza la solicitud POST al backend
    this.http.post('http://localhost:7000/usuario', formData).subscribe(
      (response: any) => {
        if (response.success) {
          // Si la creación del usuario fue exitosa, muestra un MatDialog con "Usuario creado"
          this.openDialog("Usuario creado");
          // Redirige a /home
          this.router.navigate(['/home']);
        } else {
          // Si la creación del usuario falló, muestra un MatDialog con los mensajes de error
          this.openDialog(response.mensajes.join(', '));
        }
      },
      (error) => {
        console.error('Error al enviar la solicitud:', error);
        // Maneja el error aquí, si es necesario
      }
    );
  }

  openDialog(message: string): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: { message: message }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El dialogo ha sido cerrado');
    });
  }
  


  // onSubmit(): void {
  //   // Enviar el formulario al servidor si es válido
  //   if (this.formGroup.valid) {
  //     const usuarioData = this.formGroup.value;

  //     if (this.imagePreview !== undefined) {
  //       console.log("AAAA")
        
  //         usuarioData.logo = this.imagePreview.split(',')[1]; // Modificar el valor del campo 'image'
          
  //         // Enviar el formulario al servidor
  //         this.userService.enviarFormulario(usuarioData).subscribe(
  //           (response) => {
  //             console.log('Respuesta del servidor:', response);
  //             // Aquí puedes manejar la respuesta del servidor como desees
  //           },
  //           (error) => {
  //             console.error('Error al enviar el formulario:', error);
  //             // Aquí puedes manejar los errores de la solicitud
  //           }
  //         );
        
  //     } else {
  //       // Si no se seleccionó una imagen, enviar el formulario sin ella
  //       this.userService.enviarFormulario(usuarioData).subscribe(
  //         (response) => {
  //           console.log('Respuesta del servidor:', response);
  //           // Aquí puedes manejar la respuesta del servidor como desees
  //         },
  //         (error) => {
  //           console.error('Error al enviar el formulario:', error);
  //           // Aquí puedes manejar los errores de la solicitud
  //         }
  //       );
  //     }
  //   }
  // }

}
