import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-producto-form',
  templateUrl: './add-producto-form.component.html',
  styleUrls: ['./add-producto-form.component.css']
})
export class AddProductoFormComponent implements OnInit {
  generalForm: FormGroup;
  inputsFile: any[] = [];
  imagenesPreview: string[] = [];

  constructor(private fb: FormBuilder) { 
    this.generalForm = this.fb.group({
      productoForm: this.fb.group({
        nombre: ['', Validators.required],
        categoria: ['', Validators.required],
        precio: ['', [Validators.required, Validators.min(0)]],
        descripcion: ['', Validators.required],
        caracteristicas: this.fb.array([])
      }),
      imagenesForm: this.fb.group({})
    });
  
  }

  ngOnInit(): void {
    
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

  onFileChange(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagenesPreview.push(e.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  eliminarCaracteristica(index: number) {
    this.caracteristicas.removeAt(index);
  }

  guardarProducto() {
    if (this.generalForm.valid ) {
      // Lógica para guardar el producto
      console.log('Producto guardado:', this.generalForm.value);
    } else {
      console.log('Formulario no válido');
    }
  }
}
