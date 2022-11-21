import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ServiciosService } from '../servicios.service';
import { srvUtileriasService } from '../srvUtilerias.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bus-obras',
  templateUrl: './bus-obras.component.html',
  styleUrls: ['./bus-obras.component.css']
})
export class BusObrasComponent implements OnInit, OnDestroy {
  _listado: any[] = [];
  _subBuscar: Subscription;

  constructor(private _servicios: ServiciosService, private _router: Router, private _toastr: ToastrService, private _svrUtilierias: srvUtileriasService) { }

  ngOnInit(): void {

    sessionStorage.removeItem("itemResp");

    this._servicios.wsGeneral("obras/getObrasFiltro", {buscar: "", estatus: "A"})
    .subscribe(resp => this._listado = resp
      , error => this._toastr.error("Error : " + error.error.ExceptionMessage, "Error al consultar obras.")
      ,() => this._listado = this._listado.map(x => {x.estatus == "A" ? x.estatusTexto = "Activo" : x.estatusTexto = "Baja"; return x;}));

    this._subBuscar = this._servicios.buscar$
    .subscribe(resp => {
      this.listadoFiltrado(resp);
    });
  }

  listadoFiltrado(buscar: string) {
    this._servicios.wsGeneral("obras/getObrasFiltro", {buscar: buscar, estatus: "A"})
    .subscribe(resp => this._listado = resp
      , error => this._toastr.error("Error : " + error.error.ExceptionMessage, "Error al consultar obras.")
      ,() => this._listado = this._listado.map(x => {x.estatus == "A" ? x.estatusTexto = "Activo" : x.estatusTexto = "Baja"; return x;}));
  }

  btnAceptar(item: any) {
    var itemResp = {busqueda: "", clave: "", claveTxt: ""};

    itemResp.busqueda = "Obras";
    itemResp.clave = item.idObra;
    itemResp.claveTxt = item.idObra +" | "+ item.Nombre;
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
