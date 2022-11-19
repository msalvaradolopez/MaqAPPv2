import { Component, OnInit } from '@angular/core';
import { ServiciosService } from '../servicios.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  _usuario: string = "";
  _passw: string = "";

  constructor(private _servicios: ServiciosService, private _router: Router, private _toastr: ToastrService) { }

  ngOnInit(): void {
    this._servicios.headerSiNo(false);

    
  }

  btnAceptar() {

    if(this._usuario == "") {
      this._toastr.error("falta usuario", "Acceso.");
      return;
    }

    if(this._passw == "") {
      this._toastr.error("falta contraseña", "Acceso.");
      return;
    }


    this._servicios.wsGeneral("accesos/Login", {idOperador: this._usuario, passw: this._passw})
    .subscribe(resp => sessionStorage.setItem("categoria", resp)
      , error => this._toastr.error(error.error.ExceptionMessage, "Acceso.")
      ,() => {
        this._router.navigate(["/menuGeneral"]);
      });
    }

}
