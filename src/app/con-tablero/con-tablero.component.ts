import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-con-tablero',
  templateUrl: './con-tablero.component.html',
  styleUrls: ['./con-tablero.component.css']
})
export class ConTableroComponent implements OnInit {

  _listado: any[] = [{idEconomico: "Equipo", lunes: "Lunes", martes: "Martes", miercoles: "Miercoles", jueves: "Jueves", viernes: "Viernes", sabado: "Sabado", domingo: "Domingo"},
                      {idEconomico: "", lunes: "21", martes: "23", miercoles: "24", jueves: "25", viernes: "26", sabado: "27", domingo: "28"},
                      {idEconomico: "CURB-01", lunes: null, martes: null, miercoles: "PESQ-03", jueves: null, viernes: null, sabado: null, domingo: null},
                      {idEconomico: "CURB-02", lunes: null, martes: null, miercoles: "PESQ-03", jueves: null, viernes: null, sabado: null, domingo: null},
                      {idEconomico: "CURB-03", lunes: null, martes: null, miercoles: null, jueves: null, viernes: "", sabado: null, domingo: null},
                      {idEconomico: "CURB-04", lunes: null, martes: null, miercoles: null, jueves: null, viernes: null, sabado: null, domingo: null},
                      {idEconomico: "CURB-05", lunes: "PESQ-03", martes: null, miercoles: "PESQ-01", jueve: null, viernes: null, sabado: null, domingo: null},
                      {idEconomico: "CURB-06", lunes: null, martes: null, miercoles: "PESQ-03", jueves: null, viernes: null, sabado: null, domingo: null},
                      {idEconomico: "CURB-07", lunes: null, martes: null, miercoles: "PESQ-04", jueves: null, viernes: null, sabado: null, domingo: null},
                      {idEconomico: "CURB-08", lunes: null, martes: null, miercoles: "PESQ-03", jueves: null, viernes: null, sabado: null, domingo: null}
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
