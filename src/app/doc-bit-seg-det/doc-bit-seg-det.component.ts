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
    claveTxt: "",
    nombre: ""
  }

  _accion: string = "E";
  _accionTxt: string = "";
  _fecha: string = "";
  _hora_inicio: string;
  _hora_termino: string;

  constructor(private _servicios: ServiciosService, private _router: Router, private _toastr: ToastrService, private _svrUtilierias: srvUtileriasService) { }

  ngOnInit(): void {

    this._fecha = this._svrUtilierias.convertDateToString(new Date());

    if(sessionStorage.getItem("Item")) {
      this._Item = JSON.parse(sessionStorage.getItem("Item"));
      var fechaAux = new Date(this._Item.fecha);
      var hora_inicioAux = new Date(this._Item.fecha);
      var _hora_terminoAux = new Date(this._Item.fecha);
      this._fecha = this._svrUtilierias.convertDateToString(fechaAux);
      this._hora_inicio = this._svrUtilierias.convertDateToString(fechaAux);
      this._hora_termino = this._svrUtilierias.convertDateToString(fechaAux);

      this._accion = this._Item.docBitacora == null ? "N" : "E";
    }
    else {
      this._accion = "N";
      this._Item.fecha = this._svrUtilierias.convertStringToDate(this._fecha);
      this._Item.hora_inicio = this._svrUtilierias.convertStringToDate(this._fecha);
      this._Item.hora_inicio = this._svrUtilierias.convertStringToDate(this._fecha);

      let nomUsuario: string = sessionStorage.getItem("nomUsuario");
      let idUsuario: string = sessionStorage.getItem("idUsuario");
      this._Item.idSupervisorTXT = idUsuario + " | " + nomUsuario;
      this._Item.supervisorNom = nomUsuario;

    }

    if(sessionStorage.getItem("busResp")) {
      this._BusResp = JSON.parse(sessionStorage.getItem("busResp"));

      if(this._BusResp.buscarPor == "Obras") {
        this._Item.idObraTXT =  this._BusResp.claveTxt;
        this._Item.obraNom = this._BusResp.nombre;
      }
      
      if(this._BusResp.buscarPor == "Supervisores")  {
        this._Item.idSupervisorTXT =  this._BusResp.claveTxt;
        this._Item.supervisorNom = this._BusResp.nombre;
      }
    }

    this._accionTxt = this._accion == "E" ? "Editando" : "Nuevo";

  }

  btnGuardar() {

  
    // OBTENER ID DEL TEXTO INPUT
    if(this._Item.idObraTXT) {
      var item = this._Item.idObraTXT.split("|");
      this._Item.idObra = item[0].trim();
    } else {
      this._toastr.error("Guardar.", "Falta obra")
      return
    }

    if(this._Item.idSupervisorTXT) {
      var item = this._Item.idSupervisorTXT.split("|");
      this._Item.idSupervisor = item[0].trim();
    } else {
      this._toastr.error("Guardar.", "Falta supervisor")
      return
    }

    if(this._Item.area == null) {
      this._toastr.error("Area requerida.", "Guardar.");
      return;
    }
      
    if(this._Item.ListadoBitSeg.length == 0) {
      this._toastr.error("Ingrese equipo(s) a la bitacora", "Guardar bitacora.")
      return;
    }
    


    this._fecha = $("#datepicker").val();
    this._Item.fecha = this._svrUtilierias.convertStringToDate(this._fecha);

    this._hora_inicio = $("#datepicker").val();
    this._Item.hora_inicio = this._svrUtilierias.convertStringToDate(this._hora_inicio);

    this._hora_termino = $("#datepicker").val();
    this._Item.hora_termino = this._svrUtilierias.convertStringToDate(this._hora_termino);

    //this._Item.idUsuario = sessionStorage.getItem("idUsuario");

    this._Item.ListadoBitSeg = this._Item.ListadoBitSeg.map(item => {
      item.idObra = this._Item.idObra;
      item.idObraTXT = this._Item.idObraTXT;
      item.idSupervisor = this._Item.idSupervisor;
      item.supervisorNom = this._Item.supervisorNom;
      item.idSupervisorTXT = this._Item.idSupervisorTXT;
      item.area = this._Item.area;
      item.fecha = this._Item.fecha;
      item.hora_inicio = this._Item.hora_inicio;
      item.hora_termino = this._Item.hora_termino;
      return item;
    });
  

    let lAccionRecurso: string = "bitSeg/insList"

    if(this._accion == "E")
      lAccionRecurso = "bitSeg/updList"

    this._servicios.wsGeneral(lAccionRecurso, this._Item.ListadoBitSeg)
    .subscribe(resp => { }
    , error => this._toastr.error("Error : " + error.error.ExceptionMessage, "Guardar bitacora.")
    ,() => { 
      sessionStorage.setItem("Item", JSON.stringify(this._Item));
      this._toastr.success("Bitacora guardada.") 
      this.btnRegresar();  
    });
  }


  buscarSupervisor() {


    var categoria = sessionStorage.getItem("categoria");

    if(categoria == "S" || categoria == "O")
      return;

    this._fecha = $("#datepicker").val();
    this._Item.fecha = this._svrUtilierias.convertStringToDate(this._fecha);

    this._hora_inicio = $("#datepicker").val();
    this._Item.hora_inicio = this._svrUtilierias.convertStringToDate(this._hora_inicio);

    this._hora_termino = $("#datepicker").val();
    this._Item.hora_termino = this._svrUtilierias.convertStringToDate(this._hora_termino);

    sessionStorage.setItem("Item", JSON.stringify(this._Item));
    sessionStorage.setItem("busResp", JSON.stringify(this._BusResp));
    this._router.navigate(["/busSupervisores"]);
  }

  buscarObra() {
    this._fecha = $("#datepicker").val();
    this._Item.fecha = this._svrUtilierias.convertStringToDate(this._fecha);
    this._hora_inicio = $("#datepicker").val();
    this._Item.hora_inicio = this._svrUtilierias.convertStringToDate(this._hora_inicio);

    this._hora_termino = $("#datepicker").val();
    this._Item.hora_termino = this._svrUtilierias.convertStringToDate(this._hora_termino);

    sessionStorage.setItem("Item", JSON.stringify(this._Item));
    sessionStorage.setItem("busResp", JSON.stringify(this._BusResp));
    this._router.navigate(["/busObras"]);
  }

  btnAgregar() {

    // OBTENER ID DEL TEXTO INPUT
    if(this._Item.idObraTXT) {
      var item = this._Item.idObraTXT.split("|");
      this._Item.idObra = item[0].trim();
      this._Item.obraNom = item[1].trim();
    } else {
      this._toastr.error("Guardar.", "Falta obra")
      return
    }

    if(this._Item.idSupervisorTXT) {
      var item = this._Item.idSupervisorTXT.split("|");
      this._Item.idSupervisor = item[0].trim();
      this._Item.supervisorNom = item[1].trim();
    } else {
      this._toastr.error("Guardar.", "Falta supervisor")
      return
    }

    if(this._Item.area == null) {
      this._toastr.error("Area requerida.", "Guardar.");
      return;
    }

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
    sessionStorage.removeItem("_listado");
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

  valoresRadioButtons(dato: string) :string {
    if(dato == "X") 
      return "N/A";

    if(dato == "S") 
    return "SI";

    if(dato == "N") 
    return "NO";

    return "";
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
