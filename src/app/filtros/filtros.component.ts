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
  _equiposList: any[] = [];

  constructor(private _servicios: ServiciosService, private _router: Router, private _toastr: ToastrService, private _svrUtilierias: srvUtileriasService) { }

  ngOnInit(): void {
    sessionStorage.removeItem("Filtros");

    this._fecha = this._svrUtilierias.convertDateToString(new Date());
    console.log("init", this._fecha);

    this._servicios.wsGeneral("maquinaria/getMaquinaria", {claUN: "ALT"})
      .subscribe(resp => {this._equiposList = resp}
        , error => this._toastr.error("Error : " + error.error.ExceptionMessage, "Error al consultar equipos.")
        ,() => this._equiposList = this._equiposList.map(x => {x.estatus == "A" ? x.estatusTexto = "Activo" : x.estatusTexto = "Baja"; return x;}));
  }


  btnGuardar() {

    let filtros: IFiltros = {idUbicacion: null, idEconomico: null, idObra: null, idOperador: null, fecha_alta : null, filtro: "", fecha: null};


    // OBTENER ID DEL TEXTO INPUT
    if(this._idEquipo) {
      var item = this._idEquipo.split("|");
      filtros.idEconomico = item[0].trim();
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
