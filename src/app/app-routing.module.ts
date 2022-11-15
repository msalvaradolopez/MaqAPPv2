import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CatEquiposDetComponent } from './cat-equipos-det/cat-equipos-det.component';
import { CatEquiposComponent } from './cat-equipos/cat-equipos.component';
import { CatObrasDetComponent } from './cat-obras-det/cat-obras-det.component';
import { CatObrasComponent } from './cat-obras/cat-obras.component';
import { CatOperadoresDetComponent } from './cat-operadores-det/cat-operadores-det.component';
import { CatOperadoresComponent } from './cat-operadores/cat-operadores.component';
import { DocUbicacionesComponent } from './doc-ubicaciones/doc-ubicaciones.component';
import { MenuGeneralComponent } from './menu-general/menu-general.component';


const routes: Routes = [
  {path: "catObras", component: CatObrasComponent},
  {path: "catObrasDet", component: CatObrasDetComponent},
  {path: "menuGeneral", component: MenuGeneralComponent},
  {path: "catOperadores", component: CatOperadoresComponent},
  {path: "catOperadoresDet", component: CatOperadoresDetComponent},
  {path: "catEquipos", component: CatEquiposComponent},
  {path: "catEquiposDet", component: CatEquiposDetComponent},
  {path: "docUbicaciones", component: DocUbicacionesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
