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
import { CatOperadoresDetComponent } from './cat-operadores-det/cat-operadores-det.component';
import { CatEquiposDetComponent } from './cat-equipos-det/cat-equipos-det.component';
import { DocUbicacionesComponent } from './doc-ubicaciones/doc-ubicaciones.component';
import { FiltrosComponent } from './filtros/filtros.component';
import { LoginComponent } from './login/login.component';
import { DocUbicacionesDetComponent } from './doc-ubicaciones-det/doc-ubicaciones-det.component';
import { BusEquiposComponent } from './bus-equipos/bus-equipos.component';
import { BusObrasComponent } from './bus-obras/bus-obras.component';
import { BusOperadoresComponent } from './bus-operadores/bus-operadores.component';
import { LoadingCircleComponent } from './loading-circle/loading-circle.component';
import { SinInformacionComponent } from './sin-informacion/sin-informacion.component';
import { ConTableroComponent } from './con-tablero/con-tablero.component';
import { ConUbicacionesComponent } from './con-ubicaciones/con-ubicaciones.component';
import { DocBitSegComponent } from './doc-bit-seg/doc-bit-seg.component';
import { DocBitSegDetComponent } from './doc-bit-seg-det/doc-bit-seg-det.component';
import { DocBitSegDetEquipoComponent } from './doc-bit-seg-det-equipo/doc-bit-seg-det-equipo.component';
import { BusSupervisoresComponent } from './bus-supervisores/bus-supervisores.component';
import { BusHorasMinutosComponent } from './bus-horas-minutos/bus-horas-minutos.component';
import { ConBitSegComponent } from './con-bit-seg/con-bit-seg.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CatObrasComponent,
    CatObrasDetComponent,
    MenuGeneralComponent,
    CatOperadoresComponent,
    CatEquiposComponent,
    CatOperadoresDetComponent,
    CatEquiposDetComponent,
    DocUbicacionesComponent,
    FiltrosComponent,
    LoginComponent,
    DocUbicacionesDetComponent,
    BusEquiposComponent,
    BusObrasComponent,
    BusOperadoresComponent,
    LoadingCircleComponent,
    SinInformacionComponent,
    ConTableroComponent,
    ConUbicacionesComponent,
    DocBitSegComponent,
    DocBitSegDetComponent,
    DocBitSegDetEquipoComponent,
    BusSupervisoresComponent,
    BusHorasMinutosComponent,
    ConBitSegComponent
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
