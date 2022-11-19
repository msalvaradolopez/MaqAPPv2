import { Component, OnInit, OnDestroy, AfterViewInit  } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ServiciosService } from '../servicios.service';
import { srvUtileriasService } from '../srvUtilerias.service';
import { ToastrService } from 'ngx-toastr';
import { IFiltros } from '../Ifiltros';
declare var $: any;

@Component({
  selector: 'app-filtros',
  templateUrl: './filtros.component.html',
  styleUrls: ['./filtros.component.css']
})
export class FiltrosComponent implements OnInit, AfterViewInit {

  _fecha: string = "          ";
  _idEquipo: string = "";
  _idObra: string = "";
  _idOperador: string = "";
  _equiposList: any[] = [];
  _obrasList: any[] = [];
  _operadoresList: any[] = [];

  constructor(private _servicios: ServiciosService, private _router: Router, private _toastr: ToastrService, private _svrUtilierias: srvUtileriasService) { }

  ngOnInit(): void {
    sessionStorage.removeItem("Filtros");
    sessionStorage.removeItem("_listado");

    this._fecha = this._svrUtilierias.convertDateToString(new Date());

    this._servicios.wsGeneral("maquinaria/getMaquinariaFiltro", {buscar:"", estatus: "A"})
      .subscribe(resp => {this._equiposList = resp}
        , error => this._toastr.error("Error : " + error.error.ExceptionMessage, "Error al consultar equipos.")
        ,() => this._equiposList = this._equiposList.map(x => {x.estatus == "A" ? x.estatusTexto = "Activo" : x.estatusTexto = "Baja"; return x;}));

    this._servicios.wsGeneral("obras/getObrasFiltro", {buscar: "", estatus: "A"})
    .subscribe(resp => {this._obrasList = resp}
      , error => this._toastr.error("Error : " + error.error.ExceptionMessage, "Error al consultar obras.")
      ,() => this._obrasList = this._obrasList.map(x => {x.estatus == "A" ? x.estatusTexto = "Activo" : x.estatusTexto = "Baja"; return x;}));

    this._servicios.wsGeneral("operadores/getOperadoresFiltro", {buscar: "", estatus: "A"})
    .subscribe(resp => {this._operadoresList = resp}
      , error => this._toastr.error("Error : " + error.error.ExceptionMessage, "Error al consultar obras.")
      ,() => this._operadoresList = this._operadoresList.map(x => {x.estatus == "A" ? x.estatusTexto = "Activo" : x.estatusTexto = "Baja"; return x;}));
  }


  btnGuardar() {

    let filtros: IFiltros = {idUbicacion: null, idEconomico: null, idObra: null, idOperador: null, fecha_alta : null, buscar: "", fecha: null, estatus: "A"};


    // OBTENER ID DEL TEXTO INPUT
    if(this._idEquipo) {
      var item = this._idEquipo.split("|");
      filtros.idEconomico = item[0].trim();
    }

    if(this._idOperador) {
      var item = this._idOperador.split("|");
      filtros.idOperador = item[0].trim();
    }

    if(this._idObra) {
      var item = this._idObra.split("|");
      filtros.idObra = item[0].trim();
    }
    
    
    this._fecha = $("#datepicker").val();
    filtros.fecha = this._fecha;
    
    sessionStorage.setItem("Filtros", JSON.stringify(filtros));
    this.btnRegresar();
  }

  btnRegresar() {
    this._router.navigate(["/docUbicaciones"]);
  }

  ngAfterViewInit(): void {
    $.datepicker.regional['es'] = {
      closeText: 'Cerrar',
      prevText: '<Ant',
      nextText: 'Sig>',
      currentText: 'Hoy',
      monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
      monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
      dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
      dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Juv', 'Vie', 'Sáb'],
      dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'],
      weekHeader: 'Sm',
      dateFormat: 'dd/mm/yy',
      firstDay: 1,
      isRTL: false,
      showMonthAfterYear: false,
      yearSuffix: ''
    };

    $.datepicker.setDefaults($.datepicker.regional['es']);

    $( "#datepicker" ).datepicker({ dateFormat: 'dd/mm/yy' });    
  }

}
