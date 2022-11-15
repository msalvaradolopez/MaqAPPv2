import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-menu-general',
  templateUrl: './menu-general.component.html',
  styleUrls: ['./menu-general.component.css']
})
export class MenuGeneralComponent implements OnInit {

  _menuList: any = [
                    {idMenu: "Salir", Nombre: "Salir", Descripcion: "Opción para salir del sistema."},
                    {idMenu: "catObras", Nombre: "Catálogo de Obras", Descripcion: "Permite ingresar y modificar los regisotrs de obras."},
                    {idMenu: "catOperadores", Nombre: "Catálogo de Operadores", Descripcion: "Permite ingresar y modificar los registros para operadores."},
                    {idMenu: "catEquipos", Nombre: "Catálogo de Equipo/Maquinaria", Descripcion: "Permite ingresar y modificar los registros de Equipos y Maquinaria."}
                  ]

  constructor(private _router: Router, private _query: ActivatedRoute) {}

  ngOnInit(): void {
    this.limpiaSesiones();
  }

  btnAccion(idMenu: string) {
    this._router.navigate(["/" + idMenu]);
  }

  limpiaSesiones() {
    sessionStorage.removeItem("_obrasList");
    sessionStorage.removeItem("obraItem");

    sessionStorage.removeItem("_listado");
    sessionStorage.removeItem("Item");
  }

}
