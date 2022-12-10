import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ServiciosService } from '../servicios.service';
import { srvUtileriasService } from '../srvUtilerias.service';

import { ToastrService } from 'ngx-toastr';
import { IUbicacion } from '../iubicacion';
import { IbusResp } from '../IBusResp';
import { IBitSegMaster } from '../IBitSegMaster';
import { IBitSegDetail } from '../IBitSegDetail';
declare var $: any;

@Component({
  selector: 'app-doc-bit-seg-det-equipo',
  templateUrl: './doc-bit-seg-det-equipo.component.html',
  styleUrls: ['./doc-bit-seg-det-equipo.component.css']
})
export class DocBitSegDetEquipoComponent implements OnInit {
  _Item: IBitSegDetail = {
    idBitacora: 0,
    docBitacora: 0,
    fecha: null,
    idSupervisor: null,
    idObra: null,
    area: null,
    hora_inicio: null,
    hora_termino: null,
    idEconomico: null,
    idOperador: null,
    actividad: null,
    pto_exacto: null,
    chequeo_medico: null,
    chequeo_medico_obs: null,
    checklist_maq_equip: null,
    checklist_maq_equip_obs: null,
    apr: null,
    apr_obs: null,
    permiso_instancia: null,
    permiso_instancia_obs: null,
    dc3: null,
    dc3_obs: null,
    extintor: null,
    extintor_obs: null,
    kit_antiderrames: null,
    kit_antiderrames_obs: null,
    platica_5min: null,
    platica_5min_obs: null,
    epp: null,
    epp_obs: null,
    otro: null,
    otro_descrip: null,
    otro_obs: null,
    idUsuario: null,
    idEconomicoTXT: null,
    idObraTXT: null,
    idOperadorTXT: null,
    supervisorNom: null,
    equipoNom: null,
    operadorNom: null,
    obraNom: null
  };

  _BusResp: IbusResp = {
    ventana: "docBitSegDetEquipo",
    buscarPor: "",
    clave: "",
    claveTxt: ""
  }

  _accion: string = "E";
  _accionTxt: string = "";

  constructor(private _servicios: ServiciosService, private _router: Router, private _toastr: ToastrService, private _svrUtilierias: srvUtileriasService) { }

  ngOnInit(): void {

    if(sessionStorage.getItem("ItemDet")) {
      this._Item = JSON.parse(sessionStorage.getItem("ItemDet"));
      this._accion = this._Item.docBitacora == null ? "N" : "E";
    }
    else {
      this._accion = "N";
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
    if(this._Item.idEconomicoTXT) {
      var item = this._Item.idEconomicoTXT.split("|");
      this._Item.idEconomico = item[0].trim();
    } else {
      this._toastr.error("Guardar.", "Equipo requerido.")
      return
    }

    if(this._Item.idOperadorTXT) {
      var item = this._Item.idOperadorTXT.split("|");
      this._Item.idOperador = item[0].trim();
    } else {
      this._toastr.error("Guardar.", "Operador requerdio")
      return
    }

    if(this._Item.idObraTXT) {
      var item = this._Item.idObraTXT.split("|");
      this._Item.idObra = item[0].trim();
    } else {
      this._toastr.error("Guardar.", "Obra reuqerido")
      return
    }  

    let lAccionRecurso: string = "bitSeg/insItem"

    if(this._accion == "E")
      lAccionRecurso = "bitSeg/updItem"

    this._servicios.wsGeneral(lAccionRecurso, this._Item)
    .subscribe(resp => { }
    , error => this._toastr.error("Error : " + error.error.ExceptionMessage, "Guardar equipo.")
    ,() => { 
      sessionStorage.setItem("ItemDet", JSON.stringify(this._Item));
      this._toastr.success("Registro guardado.") 
      this.btnRegresar();  
    });
  }


  buscarSupervisor() {
    sessionStorage.setItem("ItemDet", JSON.stringify(this._Item));
    sessionStorage.setItem("busResp", JSON.stringify(this._BusResp));
    this._router.navigate(["/busOperadores"]);
  }

  btnAgregar() {
    
  }
  
  btnRegresar() {
    sessionStorage.removeItem("busResp");
    this._router.navigate(["/docBitSegDet"]);
  }

  

  LimpiarFormulario(){
    this._Item = {
      idBitacora: 0,
      docBitacora: 0,
      fecha: null,
      idSupervisor: null,
      idObra: null,
      area: null,
      hora_inicio: null,
      hora_termino: null,
      idEconomico: null,
      idOperador: null,
      actividad: null,
      pto_exacto: null,
      chequeo_medico: null,
      chequeo_medico_obs: null,
      checklist_maq_equip: null,
      checklist_maq_equip_obs: null,
      apr: null,
      apr_obs: null,
      permiso_instancia: null,
      permiso_instancia_obs: null,
      dc3: null,
      dc3_obs: null,
      extintor: null,
      extintor_obs: null,
      kit_antiderrames: null,
      kit_antiderrames_obs: null,
      platica_5min: null,
      platica_5min_obs: null,
      epp: null,
      epp_obs: null,
      otro: null,
      otro_descrip: null,
      otro_obs: null,
      idUsuario: null,
      idEconomicoTXT: null,
      idObraTXT: null,
      idOperadorTXT: null,
      supervisorNom: null,
      equipoNom: null,
      operadorNom: null,
      obraNom: null
    };
  }

  ngAfterViewInit(): void {
   // 
  }

  ngOnDestroy(): void {
    // sessionStorage.removeItem("busResp");
  }

}

