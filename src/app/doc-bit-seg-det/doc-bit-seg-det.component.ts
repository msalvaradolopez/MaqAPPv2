import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ServiciosService } from '../servicios.service';
import { srvUtileriasService } from '../srvUtilerias.service';

import { ToastrService } from 'ngx-toastr';
import { IUbicacion } from '../iubicacion';
import { IbusResp } from '../IBusResp';
import { IBitSegMaster } from '../IBitSegMaster';
declare var $: any;


@Component({
  selector: 'app-doc-bit-seg-det',
  templateUrl: './doc-bit-seg-det.component.html',
  styleUrls: ['./doc-bit-seg-det.component.css']
})
export class DocBitSegDetComponent implements OnInit, AfterViewInit, OnDestroy {
  
  _Item: IBitSegMaster = {
    idBitacora: null,
    docBitacora: null,
    fecha: null,
    idSupervisor: null,
    idObra: null,
    area: null,
    hora_inicio: null,
    hora_termino: null,
    supervisorNom: null,
    obraNom: null,
    ListadoBitSeg: [],
    idSupervisorTXT: null,
    idObraTXT: null,
  };

  _BusResp: IbusResp = {
    ventana: "docBitSegDet",
    buscarPor: "",
    clave: "",
    claveTxt: ""
  }

  _accion: string = "E";
  _accionTxt: string = "";
  _fecha: string = "";

  constructor(private _servicios: ServiciosService, private _router: Router, private _toastr: ToastrService, private _svrUtilierias: srvUtileriasService) { }

  ngOnInit(): void {

    this._fecha = this._svrUtilierias.convertDateToString(new Date());

    if(sessionStorage.getItem("Item")) {
      this._Item = JSON.parse(sessionStorage.getItem("Item"));
      var fechaAux = new Date(this._Item.fecha);
      this._fecha = this._svrUtilierias.convertDateToString(fechaAux);
      this._accion = this._Item.docBitacora == null ? "N" : "E";
    }
    else {
      this._accion = "N";
      this._Item.fecha = this._svrUtilierias.convertStringToDate(this._fecha);
    }

    if(sessionStorage.getItem("busResp")) {
      this._BusResp = JSON.parse(sessionStorage.getItem("busResp"));
      
      if(this._BusResp.buscarPor == "Supervisores") 
        this._Item.idSupervisor =  this._BusResp.claveTxt;

    }

    this._accionTxt = this._accion == "E" ? "Editando" : "Nuevo";

  }

  btnGuardar() {

    // OBTENER ID DEL TEXTO INPUT
    if(this._Item.idSupervisorTXT) {
      var item = this._Item.idSupervisorTXT.split("|");
      this._Item.idSupervisor = item[0].trim();
    } else {
      this._toastr.error("Guardar.", "Falta supervisor")
      return
    }

    this._fecha = $("#datepicker").val();
    this._Item.fecha = this._svrUtilierias.convertStringToDate(this._fecha);

    //this._Item.idUsuario = sessionStorage.getItem("idUsuario");
  

    let lAccionRecurso: string = "bitSeg/insList"

    if(this._accion == "E")
      lAccionRecurso = "bitSeg/updList"

    this._servicios.wsGeneral(lAccionRecurso, this._Item)
    .subscribe(resp => { }
    , error => this._toastr.error("Error : " + error.error.ExceptionMessage, "Guardar bitacora.")
    ,() => { 
      sessionStorage.setItem("Item", JSON.stringify(this._Item));
      this._toastr.success("Registro guardado.") 
      this.btnRegresar();  
    });
  }


  buscarSupervisor() {
    this._fecha = $("#datepicker").val();
    this._Item.fecha = this._svrUtilierias.convertStringToDate(this._fecha);
    sessionStorage.setItem("Item", JSON.stringify(this._Item));
    sessionStorage.setItem("busResp", JSON.stringify(this._BusResp));
    this._router.navigate(["/busOperadores"]);
  }

  btnAgregar() {
    sessionStorage.setItem("Item", JSON.stringify(this._Item));
    sessionStorage.removeItem("ItemDet");
    sessionStorage.removeItem("busResp");
    this._router.navigate(["/docBitSegDetEquipo"]);
  }

  btnEditar(ItemDet: any) {
    sessionStorage.setItem("Item", JSON.stringify(this._Item));
    sessionStorage.setItem("ItemDet", JSON.stringify(ItemDet));
    sessionStorage.removeItem("busResp");
    this._router.navigate(["/docBitSegDetEquipo"]);
  }

  btnRegresar() {
    sessionStorage.removeItem("busResp");
    this._router.navigate(["/docBitSeg"]);
  }

  

  LimpiarFormulario(){
    this._Item = {
      idBitacora: null,
      docBitacora: null,
      fecha: null,
      idSupervisor: null,
      idObra: null,
      area: null,
      hora_inicio: null,
      hora_termino: null,
      supervisorNom: null,
      obraNom: null,
      ListadoBitSeg: [],
      idSupervisorTXT: null,
      idObraTXT: null
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

  ngOnDestroy(): void {
    // sessionStorage.removeItem("busResp");
  }

}
