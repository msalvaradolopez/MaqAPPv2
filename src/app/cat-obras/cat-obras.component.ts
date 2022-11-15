import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ServiciosService } from '../servicios.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cat-obras',
  templateUrl: './cat-obras.component.html',
  styleUrls: ['./cat-obras.component.css']
})
export class CatObrasComponent implements OnInit, OnDestroy {

  _obrasList: any [] = [];
  _subBuscar: Subscription;

  constructor(private _servicios: ServiciosService, private _router: Router, private _toastr: ToastrService) { }

  ngOnInit(): void {
    this._subBuscar = this._servicios.buscar$
    .subscribe(resp => {
      this.listadoObrasFiltrados(resp);
    });

    this._servicios.wsGeneral("obras/getObras", {claUN: "ALT"})
    .subscribe(resp => this._obrasList = resp
      , error => this._toastr.error("Error : " + error.error.ExceptionMessage, "Error al consultar obras.")
      ,() => this._obrasList = this._obrasList.map(x => {x.estatus == "A" ? x.estatusTexto = "Activo" : x.estatusTexto = "Baja"; return x;}));
  }

  btnAgregar() {

    sessionStorage.removeItem("obraItem");
    this._router.navigate(["/catObrasDet"]);
  }

  btnEditar(obraItem: any) {
    sessionStorage.setItem("obraItem", JSON.stringify(obraItem));
    this._router.navigate(["/catObrasDet"]);
  }

  listadoObrasFiltrados(buscar: string) {
    this._servicios.wsGeneral("obras/getObrasFiltro", {filtro: buscar})
    .subscribe(resp => this._obrasList = resp
      , error => this._toastr.error("Error : " + error.error.ExceptionMessage, "Error al consultar obras.")
      ,() => this._obrasList = this._obrasList.map(x => {x.estatus == "A" ? x.estatusTexto = "Activo" : x.estatusTexto = "Baja"; return x;}));
  }

  ngOnDestroy(): void {
    this._subBuscar.unsubscribe();
  }
}
