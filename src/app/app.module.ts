import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { MenuCategoriasComponent } from './components/menu-categorias/menu-categorias.component';
import { PantallaProductosComponent } from './components/pantalla-productos/pantalla-productos.component';
import { ListaProdsComponent } from './components/lista-prods/lista-prods.component';
import { FooterComponent } from './components/footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PerfilComponent } from './components/perfil/perfil.component';
import { PerfilInfoComponent } from './components/perfil-info/perfil-info.component';
import { MisProductosComponent } from './components/mis-productos/mis-productos.component';
import { ChatsComponent } from './components/chats/chats.component';
import { MisLikesComponent } from './components/mis-likes/mis-likes.component';
import { CompromisoComponent } from './components/compromiso/compromiso.component';
import { ContactanosComponent } from './components/contactanos/contactanos.component';
import { AddProductoFormComponent } from './components/add-producto-form/add-producto-form.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuCategoriasComponent,
    PantallaProductosComponent,
    ListaProdsComponent,
    FooterComponent,
    PerfilComponent,
    PerfilInfoComponent,
    MisProductosComponent,
    ChatsComponent,
    MisLikesComponent,
    CompromisoComponent,
    ContactanosComponent,
    AddProductoFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
