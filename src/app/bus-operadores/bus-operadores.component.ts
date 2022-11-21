import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ServiciosService } from '../servicios.service';
import { srvUtileriasService } from '../srvUtilerias.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bus-operadores',
  templateUrl: './bus-operadores.component.html',
  styleUrls: ['./bus-operadores.component.css']
})
export class BusOperadoresComponent implements OnInit, OnDestroy {
  _listado: any[] = [];
  _subBuscar: Subscription;

  constructor(private _servicios: ServiciosService, private _router: Router, private _toastr: ToastrService, private _svrUtilierias: srvUtileriasService) { }

  ngOnInit(): void {

    sessionStorage.removeItem("itemResp");

    this._servicios.wsGeneral("operadores/getOperadoresFiltro", {buscar: "", estatus: "A"})
    .subscribe(resp => this._listado = resp
      , error => this._toastr.error("Error : " + error.error.ExceptionMessage, "Error al consultar operadores.")
      ,() => this._listado = this._listado.map(x => {x.estatus == "A" ? x.estatusTexto = "Activo" : x.estatusTexto = "Baja"; return x;}));

    this._subBuscar = this._servicios.buscar$
    .subscribe(resp => {
      this.listadoFiltrado(resp);
    });
  }

  listadoFiltrado(buscar: string) {
    this._servicios.wsGeneral("operadores/getOperadoresFiltro", {buscar: buscar, estatus: "A"})
    .subscribe(resp => this._listado = resp
      , error => this._toastr.error("Error : " + error.error.ExceptionMessage, "Error al consultar operadores.")
      ,() => this._listado = this._listado.map(x => {x.estatus == "A" ? x.estatusTexto = "Activo" : x.estatusTexto = "Baja"; return x;}));
  }

  btnAceptar(item: any) {
    var itemResp = {busqueda: "", clave: "", claveTxt: ""};

    itemResp.busqueda = "Operadores";
    itemResp.clave = item.idOperador;
    itemResp.claveTxt = item.idOperador +" | "+ item.Nombre;
    sessionStorage.setItem("itemResp", JSON.stringify(itemResp));
    this.btnRegresar();
  }

  btnRegresar() {
    this._router.navigate(["/docUbicacionesDet"]);
  }

  ngOnDestroy(): void {
    this._subBuscar.unsubscribe();
  }


}
