import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuCategoriasComponent } from './components/menu-categorias/menu-categorias.component';
import { PantallaProductosComponent } from './components/pantalla-productos/pantalla-productos.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { PerfilInfoComponent } from './components/perfil-info/perfil-info.component';
import { MisProductosComponent } from './components/mis-productos/mis-productos.component';
import { ChatsComponent } from './components/chats/chats.component';
import { MisLikesComponent } from './components/mis-likes/mis-likes.component';
import { ContactanosComponent } from './components/contactanos/contactanos.component';
import { CompromisoComponent } from './components/compromiso/compromiso.component';
import { AddProductoFormComponent } from './components/add-producto-form/add-producto-form.component';

const routes: Routes = [
  {path: 'home', component: PantallaProductosComponent},
  {path: 'contactanos', component: ContactanosComponent},
  {path: 'compromiso', component: CompromisoComponent},
  {path: 'addProd', component: AddProductoFormComponent},
  { 
    path: 'perfil', 
    component: PerfilComponent,
    children: [
      { path: 'informacion', component: PerfilInfoComponent },
      { path: 'mis-productos', component: MisProductosComponent },
      { path: 'mis-likes', component: MisLikesComponent },
      { path: 'chats', component: ChatsComponent },
      { path: '', redirectTo: 'informacion', pathMatch: 'full' } // Ruta predeterminada dentro del perfil
    ]
  },
  
  {path: '**', redirectTo: 'home', pathMatch: 'full'},
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
