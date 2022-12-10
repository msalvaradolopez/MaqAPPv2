import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BusEquiposComponent } from './bus-equipos/bus-equipos.component';
import { BusObrasComponent } from './bus-obras/bus-obras.component';
import { BusOperadoresComponent } from './bus-operadores/bus-operadores.component';
import { CatEquiposDetComponent } from './cat-equipos-det/cat-equipos-det.component';
import { CatEquiposComponent } from './cat-equipos/cat-equipos.component';
import { CatObrasDetComponent } from './cat-obras-det/cat-obras-det.component';
import { CatObrasComponent } from './cat-obras/cat-obras.component';
import { CatOperadoresDetComponent } from './cat-operadores-det/cat-operadores-det.component';
import { CatOperadoresComponent } from './cat-operadores/cat-operadores.component';
import { ConTableroComponent } from './con-tablero/con-tablero.component';
import { ConUbicacionesComponent } from './con-ubicaciones/con-ubicaciones.component';
import { DocBitSegDetEquipoComponent } from './doc-bit-seg-det-equipo/doc-bit-seg-det-equipo.component';
import { DocBitSegDetComponent } from './doc-bit-seg-det/doc-bit-seg-det.component';
import { DocBitSegComponent } from './doc-bit-seg/doc-bit-seg.component';
import { DocUbicacionesDetComponent } from './doc-ubicaciones-det/doc-ubicaciones-det.component';
import { DocUbicacionesComponent } from './doc-ubicaciones/doc-ubicaciones.component';
import { FiltrosComponent } from './filtros/filtros.component';
import { LoginComponent } from './login/login.component';
import { MenuGeneralComponent } from './menu-general/menu-general.component';


const routes: Routes = [
  {path: "catObras", component: CatObrasComponent},
  {path: "catObrasDet", component: CatObrasDetComponent},
  {path: "menuGeneral", component: MenuGeneralComponent},
  {path: "catOperadores", component: CatOperadoresComponent},
  {path: "catOperadoresDet", component: CatOperadoresDetComponent},
  {path: "catEquipos", component: CatEquiposComponent},
  {path: "catEquiposDet", component: CatEquiposDetComponent},
  {path: "docUbicaciones", component: DocUbicacionesComponent},
  {path: "docUbicacionesDet", component: DocUbicacionesDetComponent},
  {path: "docBitSeg", component: DocBitSegComponent},
  {path: "docBitSegDet", component: DocBitSegDetComponent},
  {path: "docBitSegDetEquipo", component: DocBitSegDetEquipoComponent},
  {path: "busEquipos", component: BusEquiposComponent},
  {path: "busObras", component: BusObrasComponent},
  {path: "conUbicaciones", component: ConUbicacionesComponent},
  {path: "conTablero", component: ConTableroComponent},
  {path: "busOperadores", component: BusOperadoresComponent},
  {path: "filtros", component: FiltrosComponent},
  {path: "login", component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
