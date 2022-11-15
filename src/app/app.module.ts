import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CatObrasComponent } from './cat-obras/cat-obras.component';
import { CatObrasDetComponent } from './cat-obras-det/cat-obras-det.component';
import { MenuGeneralComponent } from './menu-general/menu-general.component';
import { CatOperadoresComponent } from './cat-operadores/cat-operadores.component';
import { CatEquiposComponent } from './cat-equipos/cat-equipos.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CatObrasComponent,
    CatObrasDetComponent,
    MenuGeneralComponent,
    CatOperadoresComponent,
    CatEquiposComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({
      progressBar: true,
      progressAnimation: "increasing",
      preventDuplicates: true
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
