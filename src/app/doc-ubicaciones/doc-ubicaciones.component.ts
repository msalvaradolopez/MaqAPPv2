import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ServiciosService } from '../servicios.service';
import { srvUtileriasService } from '../srvUtilerias.service';
import { ToastrService } from 'ngx-toastr';
import { IFiltros } from '../Ifiltros';
declare var $: any;

@Component({
  selector: 'app-doc-ubicaciones',
  templateUrl: './doc-ubicaciones.component.html',
  styleUrls: ['./doc-ubicaciones.component.css']
})
export class DocUbicacionesComponent implements OnInit, OnDestroy {

  _listado: any [] = [];
  _fecha: string = "";
  _filtros: IFiltros = {idUbicacion: null, idEconomico: null, idObra: null, idOperador: null, fecha_alta : null, fecha: null, estatus: "A", buscar: ""};
  _subBuscar: Subscription;

  constructor(private _servicios: ServiciosService, private _router: Router, private _toastr: ToastrService, private _svrUtilierias: srvUtileriasService) { }

  ngOnInit(): void {

    if(sessionStorage.getItem("Item"))
      sessionStorage.removeItem("_listado")

    if(sessionStorage.getItem("Filtros")){
      this._filtros = JSON.parse(sessionStorage.getItem("Filtros"));
      this._fecha = this._filtros.fecha;
    } 
    else {
      this._fecha = this._svrUtilierias.convertDateToString(new Date());
      this._filtros.fecha = this._fecha;
    }

    if(sessionStorage.getItem("_listado"))
      this._listado = JSON.parse(sessionStorage.getItem("_listado"));
    else {
      this._filtros.fecha_alta = this._svrUtilierias.convertStringToDate(this._fecha);
      this._servicios.wsGeneral("ubicaciones/getUbicacionesFiltro", this._filtros)
      .subscribe(resp => this._listado = resp
        , error => this._toastr.error("Error : " + error.error.ExceptionMessage, "Error al consultar ubicaciones.")
        ,() => this._listado = this._listado.map(x => {
          if(x.estatus == "A")
           x.estatusTexto = "Activo";
          else
           x.estatusTexto = "Baja"; 

           
           return x;
        }));
    }

    this._subBuscar = this._servicios.buscar$
    .subscribe(resp => {
      this.listadoFiltrado(resp);
    });

  }

  
  btnAgregar() {
    sessionStorage.setItem("_listado", JSON.stringify(this._listado));
    sessionStorage.removeItem("Item");
    this._router.navigate(["/docUbicacionesDet"]);
  }

  btnEditar(Item: any) {
    sessionStorage.setItem("_listado", JSON.stringify(this._listado));
    sessionStorage.setItem("Item", JSON.stringify(Item));
    this._router.navigate(["/docUbicacionesDet"]);
  }

  btnFiltros() {
    this._router.navigate(["/filtros"]);
  }

  listadoFiltrado(buscar: string) {
    this._filtros.fecha_alta = this._svrUtilierias.convertStringToDate(this._fecha);
    this._filtros.buscar = buscar;

    this._servicios.wsGeneral("ubicaciones/getUbicacionesFiltro", this._filtros)
    .subscribe(resp => this._listado = resp
      , error => this._toastr.error("Error : " + error.error.ExceptionMessage, "Error al consultar ubicaciones.")
      ,() => this._listado = this._listado.map(x => {
        if(x.estatus == "A")
         x.estatusTexto = "Activo";
        else
         x.estatusTexto = "Baja"; 
         
         return x;
      }));
  }

  ngOnDestroy(): void {
    this._subBuscar.unsubscribe();
  }


}
