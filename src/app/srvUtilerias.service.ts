import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class srvUtileriasService {

  constructor() { }

  convertDateToString(pFechaDate: Date): string {

    var _mesNumber: number = pFechaDate.getMonth()+1;
    var _diaTxt : string = pFechaDate.getDate() < 10 ? "0" + pFechaDate.getDate().toString() : pFechaDate.getDate().toString();
    var _mesTxt : string = _mesNumber < 10 ? "0" + _mesNumber.toString() : _mesNumber.toString();
    var _annoTxt : string = pFechaDate.getFullYear().toString();

    return _diaTxt + "/" + _mesTxt + "/" + _annoTxt;
  }

  convertStringToDate(pFechaString: string): Date {

    var _fechaArray = pFechaString.split("/");

    return new Date(_fechaArray[2] + "-" + _fechaArray[1] + "-" + _fechaArray[0]);
  }
}
