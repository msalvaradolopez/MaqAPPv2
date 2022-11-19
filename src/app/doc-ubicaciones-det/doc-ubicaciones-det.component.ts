import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiciosService } from '../servicios.service';
import { ToastrService } from 'ngx-toastr';
import { IUbicacion } from '../iubicacion';

@Component({
  selector: 'app-doc-ubicaciones-det',
  templateUrl: './doc-ubicaciones-det.component.html',
  styleUrls: ['./doc-ubicaciones-det.component.css']
})
export class DocUbicacionesDetComponent implements OnInit {
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

  constructor(private _servicios: ServiciosService, private _router: Router, private _toastr: ToastrService) { }

  ngOnInit(): void {
    if(sessionStorage.getItem("Item"))
      this._Item = JSON.parse(sessionStorage.getItem("Item"));
    else
      this._accion = "N";

    this._accionTxt = this._accion == "E" ? "Editando" : "Nuevo";
  }

  btnGuardar() {

    if(this._Item.idEconomico == "") {
      this._toastr.error("Guardar obra.", "Falta Clave de la obra")
      return
    }

    if(this._Item.idOperador == "") {
      this._toastr.error("Guardar obra.", "Falta Nombre de la obra")
      return
    }

    if(this._Item.idObra == "") {
      this._toastr.error("Guardar obra.", "Falta Nombre de la obra")
      return
    }
      

    let lAccionRecurso: string = "ubicaciones/insUbicacion"

    if(this._accion == "E")
      lAccionRecurso = "ubicaciones/updUbicacion"

    this._servicios.wsGeneral(lAccionRecurso, this._Item)
    .subscribe(resp => { }
    , error => this._toastr.error("Error : " + error.error.ExceptionMessage, "Guardar ubicacion.")
    ,() => { 
      this._toastr.success("Registro guardado.") 
      if(this._accion == "E")
        this.btnRegresar();  
      else
        this.LimpiarFormulario();  
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


}
