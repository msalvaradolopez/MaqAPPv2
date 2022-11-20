import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ServiciosService } from '../servicios.service';
import { srvUtileriasService } from '../srvUtilerias.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bus-equipos',
  templateUrl: './bus-equipos.component.html',
  styleUrls: ['./bus-equipos.component.css']
})
export class BusEquiposComponent implements OnInit, OnDestroy {

  _listado: any[] = [];
  _subBuscar: Subscription;

  constructor(private _servicios: ServiciosService, private _router: Router, private _toastr: ToastrService, private _svrUtilierias: srvUtileriasService) { }

  ngOnInit(): void {

    sessionStorage.removeItem("itemResp");

    this._servicios.wsGeneral("maquinaria/getMaquinariaFiltro", {buscar:"", estatus: "A"})
      .subscribe(resp => {this._listado = resp}
        , error => this._toastr.error("Error : " + error.error.ExceptionMessage, "Error al consultar equipos.")
        ,() => { });

    this._subBuscar = this._servicios.buscar$
    .subscribe(resp => {
      this.listadoFiltrado(resp);
    });
  }

  listadoFiltrado(buscar: string) {
    this._servicios.wsGeneral("maquinaria/getMaquinariaFiltro", {buscar: buscar, estatus: "A"})
    .subscribe(resp => this._listado = resp
      , error => this._toastr.error("Error : " + error.error.ExceptionMessage, "Error al consultar equipos.")
      ,() => this._listado = this._listado.map(x => {x.estatus == "A" ? x.estatusTexto = "Activo" : x.estatusTexto = "Baja"; return x;}));
  }

  btnAceptar(item: any) {
    var itemResp = {busqueda: "", clave: "", claveTxt: ""};

    itemResp.busqueda = "Equipos";
    itemResp.clave = item.idEconomico;
    itemResp.claveTxt = item.idEconomico +" | "+ item.Tipo;
    console.log("Respuesta", itemResp);
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
