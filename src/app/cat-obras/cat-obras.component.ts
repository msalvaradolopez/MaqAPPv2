import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiciosService } from '../servicios.service';

@Component({
  selector: 'app-cat-obras',
  templateUrl: './cat-obras.component.html',
  styleUrls: ['./cat-obras.component.css']
})
export class CatObrasComponent implements OnInit {

  _obrasList: any [] = [];
  constructor(private _servicios: ServiciosService, private _router: Router) { }

  ngOnInit(): void {
    this._servicios.wsGeneral("obras/getObras", {claUN: "ALT"})
    .subscribe(resp => this._obrasList = resp);
  }

  btnAgregar() {
    this._router.navigate(["/catObrasDet"]);
  }

}
