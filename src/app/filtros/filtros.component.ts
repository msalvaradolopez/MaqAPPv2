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

  constructor(private _servicios: ServiciosService, private _router: Router, private _toastr: ToastrService, private _svrUtilierias: srvUtileriasService) { }

  ngOnInit(): void {
    sessionStorage.removeItem("Filtros");

    this._fecha = this._svrUtilierias.convertDateToString(new Date());
    console.log("init", this._fecha);

  }


  btnGuardar() {

    let filtros: IFiltros = {idUbicacion: null, idEconomico: null, idObra: null, idOperador: null, fecha_alta : null, filtro: null, fecha: null};
    this._fecha = $("#datepicker").val();
    filtros.fecha = this._fecha;
    

    console.log("guardar", this._fecha);

    sessionStorage.setItem("Filtros", JSON.stringify(filtros));
    this.btnRegresar();
  }

  btnRegresar() {
    this._router.navigate(["/docUbicaciones"]);
  }

  ngAfterViewInit(): void {
    /*
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
*/
    $( "#datepicker" ).datepicker({ dateFormat: 'dd/mm/yy' });    
  }

}
