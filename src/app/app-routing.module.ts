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
import { VerProductoComponent } from './components/ver-producto/ver-producto.component';
import { VerUsuarioComponent } from './components/ver-usuario/ver-usuario.component';
import { RegistroUsuarioComponent } from './components/registro-usuario/registro-usuario.component';
import { ModificarUsuarioComponent } from './components/modificar-usuario/modificar-usuario.component';

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
      { path: 'modificarUsuario', component: ModificarUsuarioComponent },
      { path: '', redirectTo: 'informacion', pathMatch: 'full' }
    ]
  },
  {path: 'infoProducto', component: VerProductoComponent},
  {path: 'infoUsuario', component: VerUsuarioComponent},
  {path: 'registro', component: RegistroUsuarioComponent},
  {path: '**', redirectTo: 'home', pathMatch: 'full'},
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
