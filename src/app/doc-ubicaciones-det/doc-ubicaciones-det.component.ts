import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ServiciosService } from '../servicios.service';
import { srvUtileriasService } from '../srvUtilerias.service';

import { ToastrService } from 'ngx-toastr';
import { IUbicacion } from '../iubicacion';
import { IbusResp } from '../IBusResp';
declare var $: any;

@Component({
  selector: 'app-doc-ubicaciones-det',
  templateUrl: './doc-ubicaciones-det.component.html',
  styleUrls: ['./doc-ubicaciones-det.component.css']
})
export class DocUbicacionesDetComponent implements OnInit, AfterViewInit, OnDestroy {
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
    ventana: "U",
    idEconomicoTXT: null,
    idObraTXT: null,
    idOperadorTXT: null,
    equipoNom: null,
    operadorNom: null,
    obraNom: null
  };

  _BusResp: IbusResp = {
    ventana: "docUbicacionesDet",
    buscarPor: "",
    clave: "",
    claveTxt: "",
    nombre: ""
  }

  _accion: string = "E";
  _accionTxt: string = "";
  _fecha: string = "";

  constructor(private _servicios: ServiciosService, private _router: Router, private _toastr: ToastrService, private _svrUtilierias: srvUtileriasService) { }

  ngOnInit(): void {

    this._fecha = this._svrUtilierias.convertDateToString(new Date());

    if(sessionStorage.getItem("Item")) {
      this._Item = JSON.parse(sessionStorage.getItem("Item"));
      var fechaAux = new Date(this._Item.fecha_alta);
      this._fecha = this._svrUtilierias.convertDateToString(fechaAux);
      this._accion = this._Item.idUbicacion == null ? "N" : "E";
    }
    else {
      this._accion = "N";
      this._Item.fecha_alta = this._svrUtilierias.convertStringToDate(this._fecha);
    }

    if(sessionStorage.getItem("busResp")) {
      this._BusResp = JSON.parse(sessionStorage.getItem("busResp"));
      
      if(this._BusResp.buscarPor == "Equipos") 
        this._Item.idEconomicoTXT =  this._BusResp.claveTxt;
    
      if(this._BusResp.buscarPor == "Obras") 
        this._Item.idObraTXT =  this._BusResp.claveTxt;

      if(this._BusResp.buscarPor == "Operadores") 
        this._Item.idOperadorTXT =  this._BusResp.claveTxt;

    }

    this._accionTxt = this._accion == "E" ? "Editando" : "Nuevo";

  }

  btnGuardar() {

    // OBTENER ID DEL TEXTO INPUT
    if(this._Item.idEconomicoTXT) {
      var item = this._Item.idEconomicoTXT.split("|");
      this._Item.idEconomico = item[0].trim();
    } else {
      this._toastr.error("Guardar.", "Falta equipo.")
      return
    }

    if(this._Item.idOperadorTXT) {
      var item = this._Item.idOperadorTXT.split("|");
      this._Item.idOperador = item[0].trim();
    } else {
      this._toastr.error("Guardar.", "Falta operador")
      return
    }

    if(this._Item.idObraTXT) {
      var item = this._Item.idObraTXT.split("|");
      this._Item.idObra = item[0].trim();
    } else {
      this._toastr.error("Guardar.", "Falta obra")
      return
    }

    if(this._Item.odometro == null) {
      this._toastr.error("Guardar.", "Falta Od??metro")
      return
    }
    
    this._fecha = $("#datepicker").val();
    this._Item.fecha_alta = this._svrUtilierias.convertStringToDate(this._fecha);

    this._Item.idUsuario = sessionStorage.getItem("idUsuario");
  

    let lAccionRecurso: string = "ubicaciones/insItem"

    if(this._accion == "E")
      lAccionRecurso = "ubicaciones/updItem"

    this._servicios.wsGeneral(lAccionRecurso, this._Item)
    .subscribe(resp => { }
    , error => this._toastr.error("Error : " + error.error.ExceptionMessage, "Guardar ubicacion.")
    ,() => { 
      sessionStorage.setItem("Item", JSON.stringify(this._Item));
      this._toastr.success("Registro guardado.") 
      this.btnRegresar();  
    });
  }

  buscarEquipo() {
    this._fecha = $("#datepicker").val();
    this._Item.fecha_alta = this._svrUtilierias.convertStringToDate(this._fecha);
    sessionStorage.setItem("Item", JSON.stringify(this._Item));
    sessionStorage.setItem("busResp", JSON.stringify(this._BusResp));
    this._router.navigate(["/busEquipos"]);
  }

  buscarObra() {
    this._fecha = $("#datepicker").val();
    this._Item.fecha_alta = this._svrUtilierias.convertStringToDate(this._fecha);
    sessionStorage.setItem("Item", JSON.stringify(this._Item));
    sessionStorage.setItem("busResp", JSON.stringify(this._BusResp));
    this._router.navigate(["/busObras"]);
  }

  buscarOperador() {
    this._fecha = $("#datepicker").val();
    this._Item.fecha_alta = this._svrUtilierias.convertStringToDate(this._fecha);
    sessionStorage.setItem("Item", JSON.stringify(this._Item));
    sessionStorage.setItem("busResp", JSON.stringify(this._BusResp));
    this._router.navigate(["/busOperadores"]);
  }

  btnRegresar() {
    sessionStorage.removeItem("busResp");
    sessionStorage.removeItem("_listado");
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
      ventana: "U",
      idEconomicoTXT: null,
      idObraTXT: null,
      idOperadorTXT: null,
      equipoNom: null,
      operadorNom: null,
      obraNom: null
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
      dayNames: ['Domingo', 'Lunes', 'Martes', 'Mi??rcoles', 'Jueves', 'Viernes', 'S??bado'],
      dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mi??', 'Juv', 'Vie', 'S??b'],
      dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'S??'],
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

  ngOnDestroy(): void {
    // sessionStorage.removeItem("busResp");
  }

}
