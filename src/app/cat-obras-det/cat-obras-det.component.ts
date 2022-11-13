import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiciosService } from '../servicios.service';

@Component({
  selector: 'app-cat-obras-det',
  templateUrl: './cat-obras-det.component.html',
  styleUrls: ['./cat-obras-det.component.css']
})
export class CatObrasDetComponent implements OnInit {

  constructor(private _servicios: ServiciosService, private _router: Router) { }

  ngOnInit(): void {
  }

  btnGuardar(){
    this._router.navigate(["/catObras"]);
  }

}
