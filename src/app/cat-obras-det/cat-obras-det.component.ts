import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiciosService } from '../servicios.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cat-obras-det',
  templateUrl: './cat-obras-det.component.html',
  styleUrls: ['./cat-obras-det.component.css']
})
export class CatObrasDetComponent implements OnInit {

  _obraItem: any = {idObra: "", Nombre: "", estatus: "A", fecha_alta: ""};
  _accion: string = "E";

  constructor(private _servicios: ServiciosService, private _router: Router, private _toastr: ToastrService) { }

  ngOnInit(): void {
    if(sessionStorage.getItem("obraItem"))
      this._obraItem = JSON.parse(sessionStorage.getItem("obraItem"));
    else
      this._accion = "N";
  }

  btnGuardar() {
    let lAccionRecurso: string = "obras/insObra"

    if(this._accion == "E")
      lAccionRecurso = "obras/updObra"

    this._servicios.wsGeneral(lAccionRecurso, this._obraItem)
    .subscribe(resp => { }
    , error => this._toastr.error("Error : " + error.error.ExceptionMessage, "Guardar obra.")
    ,() => { 
      this._toastr.success("Registro guardado.") 
      if(this._accion == "E")
        this.btnRegresar();  
      else
        this.LimpiarFormulario();  
    });
  }

  btnRegresar() {
    this._router.navigate(["/catObras"]);
  }

  LimpiarFormulario(){
    this._obraItem = {idObra: "", Nombre: "", estatus: "A", fecha_alta: ""};
  }

}
