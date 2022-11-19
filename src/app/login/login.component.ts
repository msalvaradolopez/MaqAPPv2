import { Component, OnInit } from '@angular/core';
import { ServiciosService } from '../servicios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _servicios: ServiciosService, private _router: Router) { }

  ngOnInit(): void {
    this._servicios.headerSiNo(false);

    
  }

  btnAceptar() {
    this._router.navigate(["/menuGeneral"]);
    }

}
