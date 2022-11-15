import { Component, OnInit } from '@angular/core';
import { ServiciosService } from '../servicios.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private _servicios: ServiciosService) { }

  ngOnInit(): void {
  }

  onKeypressEvent(event: any){
    if (event.target.value.length > 2)
      this._servicios.buscar(event.target.value);
    else 
      this._servicios.buscar("");
  }

}
