import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ValidadoresService {

  constructor() { }

  dv(T:number){
    var M=0,S=1;

    for(;T;T=Math.floor(T/10))
			S=(S+T%10*(9-M++%6))%11;

      return S?S-1:'k';
  }

  checkRut(){
    return (formGroup: FormGroup) => {
      const rutCompleto = formGroup.controls['rut'];

      console.log("rutCompleto " + rutCompleto);
      var tmp 	= rutCompleto.value.split('-');
		  var digv	= tmp[1];
		  var rut 	= tmp[0];

      if ( digv == 'K' ) digv = 'k' ;

      if (this.dv(rut) == digv ){
        rutCompleto.setErrors(null);
      } else {
        rutCompleto.setErrors({noRutValido:true});
      }

    }
  }


}
