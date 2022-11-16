import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ServiciosService } from '../servicios.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-doc-ubicaciones',
  templateUrl: './doc-ubicaciones.component.html',
  styleUrls: ['./doc-ubicaciones.component.css']
})
export class DocUbicacionesComponent implements OnInit {

  _listado: any [] = [];
  _subBuscar: Subscription;

  constructor(private _servicios: ServiciosService, private _router: Router, private _toastr: ToastrService) { }

  ngOnInit(): void {
    if(sessionStorage.getItem("_listado"))
      this._listado = JSON.parse(sessionStorage.getItem("_listado"));
    else {
      let _fecha_alta: Date = new Date(2022, 10, 15);
      console.log(_fecha_alta);
      this._servicios.wsGeneral("ubicaciones/getUbicacionesFiltro", {fecha_alta: _fecha_alta})
      .subscribe(resp => this._listado = resp
        , error => this._toastr.error("Error : " + error.error.ExceptionMessage, "Error al consultar ubicaciones.")
        ,() => this._listado = this._listado.map(x => {
          if(x.estatus == "A")
           x.estatusTexto = "Activo";
          else
           x.estatusTexto = "Baja"; 

           
           return x;
        }));
    }

    this._subBuscar = this._servicios.buscar$
    .subscribe(resp => {
      this.listadoFiltrado(resp);
    });

  }

  
  btnAgregar() {
    sessionStorage.setItem("_listado", JSON.stringify(this._listado));
    sessionStorage.removeItem("Item");
    this._router.navigate(["/catOperadoresDet"]);
  }

  btnEditar(Item: any) {
    sessionStorage.setItem("_listado", JSON.stringify(this._listado));
    sessionStorage.setItem("Item", JSON.stringify(Item));
    this._router.navigate(["/catOperadoresDet"]);
  }

  listadoFiltrado(buscar: string) {
    this._servicios.wsGeneral("ubicaciones/getUbicacionesFiltro", {filtro: buscar})
    .subscribe(resp => this._listado = resp
      , error => this._toastr.error("Error : " + error.error.ExceptionMessage, "Error al consultar ubicaciones.")
      ,() => this._listado = this._listado.map(x => {
        if(x.estatus == "A")
         x.estatusTexto = "Activo";
        else
         x.estatusTexto = "Baja"; 
         
         return x;
      }));
  }

  ngOnDestroy(): void {
    this._subBuscar.unsubscribe();
  }


}
