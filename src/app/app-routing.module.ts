import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CatEquiposComponent } from './cat-equipos/cat-equipos.component';
import { CatObrasDetComponent } from './cat-obras-det/cat-obras-det.component';
import { CatObrasComponent } from './cat-obras/cat-obras.component';
import { CatOperadoresComponent } from './cat-operadores/cat-operadores.component';
import { MenuGeneralComponent } from './menu-general/menu-general.component';


const routes: Routes = [
  {path: "catObras", component: CatObrasComponent},
  {path: "catObrasDet", component: CatObrasDetComponent},
  {path: "menuGeneral", component: MenuGeneralComponent},
  {path: "catOperadores", component: CatOperadoresComponent},
  {path: "catEquipos", component: CatEquiposComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
