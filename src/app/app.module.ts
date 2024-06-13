import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { MenuCategoriasComponent } from './components/menu-categorias/menu-categorias.component';
import { PantallaProductosComponent } from './components/pantalla-productos/pantalla-productos.component';
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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegistroModalComponent } from './components/registro-modal/registro-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatRadioModule} from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete'

import { JwtModule } from '@auth0/angular-jwt';
import { VerProductoComponent } from './components/ver-producto/ver-producto.component';
import { VerUsuarioComponent } from './components/ver-usuario/ver-usuario.component';
import { RegistroUsuarioComponent } from './components/registro-usuario/registro-usuario.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatNativeDateModule } from '@angular/material/core';
import { DialogComponent } from './components/dialog/dialog.component';
import { ModificarUsuarioComponent } from './components/modificar-usuario/modificar-usuario.component';
import { DialogCookiesComponent } from './components/dialog-cookies/dialog-cookies.component';
import { CookieService } from './services/cookie.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuCategoriasComponent,
    PantallaProductosComponent,
    FooterComponent,
    PerfilComponent,
    PerfilInfoComponent,
    MisProductosComponent,
    ChatsComponent,
    MisLikesComponent,
    CompromisoComponent,
    ContactanosComponent,
    AddProductoFormComponent,
    RegistroModalComponent,
    VerProductoComponent,
    VerUsuarioComponent,
    RegistroUsuarioComponent,
    DialogComponent,
    ModificarUsuarioComponent,
    DialogCookiesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatMenuModule,
    MatIconModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSliderModule,
    MatListModule,
    MatToolbarModule,
    MatRadioModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatOptionModule,
    MatSelectModule,
    MatAutocompleteModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('token');
        }
      }
    })
  ],
  providers: [CookieService],
  bootstrap: [AppComponent],
})
export class AppModule { }
