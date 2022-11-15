import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ServiciosService } from '../servicios.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cat-operadores',
  templateUrl: './cat-operadores.component.html',
  styleUrls: ['./cat-operadores.component.css']
})
export class CatOperadoresComponent implements OnInit, OnDestroy {

  _listado: any [] = [];
  _subBuscar: Subscription;

  constructor(private _servicios: ServiciosService, private _router: Router, private _toastr: ToastrService) { }

  ngOnInit(): void {
    if(sessionStorage.getItem("_listado"))
      this._listado = JSON.parse(sessionStorage.getItem("_listado"));
    else {
      this._servicios.wsGeneral("operadores/getOperadores", {claUN: "ALT"})
      .subscribe(resp => this._listado = resp
        , error => this._toastr.error("Error : " + error.error.ExceptionMessage, "Error al consultar operadores.")
        ,() => this._listado = this._listado.map(x => {x.estatus == "A" ? x.estatusTexto = "Activo" : x.estatusTexto = "Baja"; return x;}));
    }

    this._subBuscar = this._servicios.buscar$
    .subscribe(resp => {
      this.listadoFiltrado(resp);
    });

  }

  
  btnAgregar() {
    sessionStorage.setItem("_listado", JSON.stringify(this._listado));
    sessionStorage.removeItem("Item");
    this._router.navigate(["/catOperadoresDet"]);
  }

  btnEditar(obraItem: any) {
    sessionStorage.setItem("_listado", JSON.stringify(this._listado));
    sessionStorage.setItem("Item", JSON.stringify(obraItem));
    this._router.navigate(["/catOperadoresDet"]);
  }

  listadoFiltrado(buscar: string) {
    this._servicios.wsGeneral("operadores/getOperadores", {filtro: buscar})
    .subscribe(resp => this._listado = resp
      , error => this._toastr.error("Error : " + error.error.ExceptionMessage, "Error al consultar operadores.")
      ,() => this._listado = this._listado.map(x => {x.estatus == "A" ? x.estatusTexto = "Activo" : x.estatusTexto = "Baja"; return x;}));
  }

  ngOnDestroy(): void {
    this._subBuscar.unsubscribe();
  }

}