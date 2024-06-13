import { HttpClient, HttpRequest } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ProductService } from 'src/app/services/product.service';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-add-producto-form',
  templateUrl: './add-producto-form.component.html',
  styleUrls: ['./add-producto-form.component.css']
})
export class AddProductoFormComponent implements OnInit {
  generalForm: FormGroup;
  inputsFile: any[] = [];
  imagenesPreview: string[] = [];
  userId: string = "";
  categorias: any[] = [];

  prueba: string = "Hola"

  constructor(private fb: FormBuilder, public dialog: MatDialog, private http: HttpClient, private productoService: ProductService, private router: Router, private jwtHelper: JwtHelperService) {
    this.generalForm = this.fb.group({
      productoForm: this.fb.group({
        nombre: ['', Validators.required],
        categoria: ['', Validators.required],
        precio: ['', [Validators.required, Validators.min(0)]],
        envio_disponible: ['', Validators.required],
        descripcion: ['', Validators.required],
        estado: ['', Validators.required],
        caracteristicas: this.fb.array([])
      }),
      imagenesForm: this.fb.group({})
    });

  }

  ngOnInit(): void {
    const token = localStorage.getItem('token');

    if (!token) {
      this.router.navigate(['/home']);
    }else{
      const decodedToken = this.jwtHelper.decodeToken(token);
      this.userId = decodedToken.usuarioId;
    }

    this.http.get<any[]>('http://localhost:7000/categorias').subscribe(
      categorias => {
        this.categorias = categorias;
        console.log('Categorías obtenidas:', categorias);
      },
      error => {
        console.error('Error al obtener categorías:', error);
      }
    );
  }

  get productoForm(): FormGroup {
    return this.generalForm.get('productoForm') as FormGroup;
  }

  get imagenesForm(): FormGroup {
    return this.generalForm.get('imagenesForm') as FormGroup;
  }

  get caracteristicas(): FormArray {
    return this.productoForm.get('caracteristicas') as FormArray;
  }

  agregarCaracteristica() {
    const caracteristicaForm = this.fb.group({
      nombre: ['', Validators.required],
      valor: ['', Validators.required]
    });
    this.caracteristicas.push(caracteristicaForm);
  }


  agregarInputFile() {
    this.inputsFile.push({});
  }

  onFileChange(event: any, index: number) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imagenesPreview[index] = reader.result as string;
      };
    }
  }

  eliminarCaracteristica(index: number) {
    this.caracteristicas.removeAt(index);
  }

  guardarProducto() {
    console.log(this.productoForm.value)
    const form = new FormData();
    //const productoFormValues = this.productoForm.value;


    form.append('nombre', this.productoForm.value.nombre);
    form.append('categoria', this.productoForm.value.categoria);
    form.append('precio', this.productoForm.value.precio);
    form.append('descripcion', this.productoForm.value.descripcion);
    form.append('envio_disponible', this.productoForm.value.envio_disponible)
    form.append('estado', this.productoForm.value.estado);
    form.append('id_usuario', this.userId); // Reemplaza esto con el ID de usuario real

     // Añadir características al FormData
     this.productoForm.value.caracteristicas.forEach((caracteristica: any, index: number) => {
      form.append(`${caracteristica.nombre}`, `${caracteristica.valor}`);
    });



    this.inputsFile.forEach((input, index) => {
      const fileInput = document.getElementById(`fileInput${index}`) as HTMLInputElement;
      if (fileInput && fileInput.files) {
        form.append('imagenes', fileInput.files[0]);
      }
    });

    form.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });

    this.productoService.registrarProducto(form).subscribe(
      (response) => {
        console.log(response)
        this.openDialog("Producto creado correctamente")
        this.generalForm.reset();
        this.imagenesPreview = [];
        this.inputsFile = [];

      },
      (error) => {
        console.error('Error registrando el producto:', error);

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
      this.router.navigate(['/perfil/mis-productos'])
    });
  }
}

