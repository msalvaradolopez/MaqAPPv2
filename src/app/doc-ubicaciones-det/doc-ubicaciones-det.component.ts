import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiciosService } from '../servicios.service';
import { srvUtileriasService } from '../srvUtilerias.service';

import { ToastrService } from 'ngx-toastr';
import { IUbicacion } from '../iubicacion';
declare var $: any;

@Component({
  selector: 'app-doc-ubicaciones-det',
  templateUrl: './doc-ubicaciones-det.component.html',
  styleUrls: ['./doc-ubicaciones-det.component.css']
})
export class DocUbicacionesDetComponent implements OnInit, AfterViewInit {
  _Item: IUbicacion = {
    idUbicacion: null,
    idEconomico: null,
    idOperador: null,
    idObra: null,
    fecha_alta: null,
    comentarios: null,
    idUsuario: null,
    fecha_ingreso: null,
    hodometro: 0,
    odometro: null,
    sello: null,
    litros: null,
    horometro: null,
    ventana: "U"
  };
  _accion: string = "E";
  _accionTxt: string = "";
  _fecha: string = "";

  _idEquipo: string = "";
  _idObra: string = "";
  _idOperador: string = "";
  _equiposList: any[] = [];
  _obrasList: any[] = [];
  _operadoresList: any[] = [];

  
  constructor(private _servicios: ServiciosService, private _router: Router, private _toastr: ToastrService, private _svrUtilierias: srvUtileriasService) { }

  ngOnInit(): void {

    this._fecha = this._svrUtilierias.convertDateToString(new Date());

    if(sessionStorage.getItem("Item")) {
      this._Item = JSON.parse(sessionStorage.getItem("Item"));
      var fechaAux = new Date(this._Item.fecha_alta);
      this._fecha = this._svrUtilierias.convertDateToString(fechaAux);
    }
    else {
      this._accion = "N";
      this._fecha = this._svrUtilierias.convertDateToString(new Date());
    }

    this._accionTxt = this._accion == "E" ? "Editando" : "Nuevo";

    this._servicios.wsGeneral("maquinaria/getMaquinariaFiltro", {buscar:"", estatus: "A"})
      .subscribe(resp => {this._equiposList = resp}
        , error => this._toastr.error("Error : " + error.error.ExceptionMessage, "Error al consultar equipos.")
        ,() => {
          if(this._Item.idEconomico)
            this._idEquipo = this._Item.idEconomico + " | " + (this._equiposList.filter(x => x.idEconomico == this._Item.idEconomico))[0].Tipo;
        });

    this._servicios.wsGeneral("obras/getObrasFiltro", {buscar: "", estatus: "A"})
    .subscribe(resp => {this._obrasList = resp}
      , error => this._toastr.error("Error : " + error.error.ExceptionMessage, "Error al consultar obras.")
      ,() => {
        if(this._Item.idObra)
            this._idObra = this._Item.idObra + " | " + (this._obrasList.filter(x => x.idObra == this._Item.idObra))[0].Nombre;
      });

    this._servicios.wsGeneral("operadores/getOperadoresFiltro", {buscar: "", estatus: "A"})
    .subscribe(resp => {this._operadoresList = resp}
      , error => this._toastr.error("Error : " + error.error.ExceptionMessage, "Error al consultar obras.")
      ,() => {
        if(this._Item.idOperador)
            this._idOperador = this._Item.idOperador + " | " + (this._operadoresList.filter(x => x.idOperador == this._Item.idOperador))[0].Nombre;
      });
  }

  btnGuardar() {

    // OBTENER ID DEL TEXTO INPUT
    if(this._idEquipo) {
      var item = this._idEquipo.split("|");
      this._Item.idEconomico = item[0].trim();
    } else {
      this._toastr.error("Guardar.", "Falta equipo.")
      return
    }

    if(this._idOperador) {
      var item = this._idOperador.split("|");
      this._Item.idOperador = item[0].trim();
    } else {
      this._toastr.error("Guardar.", "Falta operador")
      return
    }

    if(this._idObra) {
      var item = this._idObra.split("|");
      this._Item.idObra = item[0].trim();
    } else {
      this._toastr.error("Guardar.", "Falta obra")
      return
    }

    if(this._Item.odometro == null) {
      this._toastr.error("Guardar.", "Falta Odómetro")
      return
    }

    
    this._fecha = $("#datepicker").val();
    this._Item.fecha_alta = this._svrUtilierias.convertStringToDate(this._fecha);
  

    let lAccionRecurso: string = "ubicaciones/insUbicacion"

    if(this._accion == "E")
      lAccionRecurso = "ubicaciones/updUbicacion"

    this._servicios.wsGeneral(lAccionRecurso, this._Item)
    .subscribe(resp => { }
    , error => this._toastr.error("Error : " + error.error.ExceptionMessage, "Guardar ubicacion.")
    ,() => { 
      sessionStorage.setItem("Item", JSON.stringify(this._Item));
      this._toastr.success("Registro guardado.") 
      this.btnRegresar();  
    });
  }

  btnRegresar() {
    this._router.navigate(["/docUbicaciones"]);
  }

  LimpiarFormulario(){
    this._Item = {
      idUbicacion: null,
      idEconomico: null,
      idOperador: null,
      idObra: null,
      fecha_alta: null,
      comentarios: null,
      idUsuario: null,
      fecha_ingreso: null,
      hodometro: 0,
      odometro: null,
      sello: null,
      litros: null,
      horometro: null,
      ventana: null
    };
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
