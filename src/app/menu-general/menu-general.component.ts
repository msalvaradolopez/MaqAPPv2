import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from "@angular/router";
import { ServiciosService } from '../servicios.service';

@Component({
  selector: 'app-menu-general',
  templateUrl: './menu-general.component.html',
  styleUrls: ['./menu-general.component.css']
})
export class MenuGeneralComponent implements OnInit {

  _menuList: any = [
                    {idMenu: "login", Nombre: "Salir", Descripcion: "Opción para salir del sistema."},
                    {idMenu: "docUbicaciones", Nombre: "Registro de ubicaciones", Descripcion: "Permite ingresar la ubicación, comentarios, litros, horometro, odometro de Equipos y Maquinaria."},
                    {idMenu: "catObras", Nombre: "Catálogo de Obras", Descripcion: "Permite ingresar y modificar los registros de obras."},
                    {idMenu: "catOperadores", Nombre: "Catálogo de Operadores", Descripcion: "Permite ingresar y modificar los registros para operadores."},
                    {idMenu: "catEquipos", Nombre: "Catálogo de Equipo/Maquinaria", Descripcion: "Permite ingresar y modificar los registros de Equipos y Maquinaria."}

                    
                  ]

  constructor(private _router: Router, private _query: ActivatedRoute, private _servicios: ServiciosService) {}

  ngOnInit(): void {
    this.limpiaSesiones();
    this._servicios.headerSiNo(true);
  }

  btnAccion(idMenu: string) {
    this._router.navigate(["/" + idMenu]);
  }

  limpiaSesiones() {
    sessionStorage.removeItem("_obrasList");
    sessionStorage.removeItem("obraItem");

    sessionStorage.removeItem("_listado");
    sessionStorage.removeItem("Item");

    sessionStorage.removeItem("Filtros");
  }

}
