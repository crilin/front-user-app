import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { PhoneModel } from 'src/app/models/phone.model';
import { UserModel } from 'src/app/models/user.model';
import { userResponseModel } from 'src/app/models/userResponse.model';
import { UserService } from 'src/app/services/user.service';
import { ValidadoresService } from '../../services/validadores.service';


@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

  // Inicializa formulario
  forma!: FormGroup;

  formulario!: FormGroup;
  phone: PhoneModel = new PhoneModel();
  usuario: UserModel = new UserModel();
  userResponse: userResponseModel = new userResponseModel();

  //Valida si el correo es valido
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  MiErrorStateMatcher!: ErrorStateMatcher;

  matcher = new MyErrorStateMatcher();

  constructor(private builder: FormBuilder,
              private validadores: ValidadoresService,
              private userServ: UserService) {

    this.construirFormulario();
    this.formulario.get('countrycode')?.setValue('56');
   }

  ngOnInit(): void {}

/**
 * Funcion construirFormulario
 */
construirFormulario(){
    this.formulario = this.builder.group({
    nombre: new FormControl('', [Validators.required, Validators.minLength(2)] ),
    password: new FormControl('', [Validators.required, Validators.pattern('^([A-Z]{1})([a-z]+)([0-9]{1})$')] ),
    mail: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')] ),
    phone: new FormControl('',[Validators.required,Validators.pattern('^[0-9]{8,9}$')]),
    citycode: new FormControl('',[Validators.required,Validators.pattern('^[0-9]{1,2}$')]),
    countrycode: new FormControl('',[Validators.required,Validators.pattern('^[0-9]{2,3}$')]),
    rut : new FormControl('', [Validators.required, Validators.pattern('^[0-9]+[-]{1}[0-9kK]{1}$')])
    },{
     validators: this.validadores.checkRut('rut')
  });
}


/**
 * Funcion inputInvalido
 */
  controlInput(input:string) {

    return this.formulario.get(input)?.invalid;
  }

  /**
 * Funcion inputInvalido
 */
   inputRequerido(input:string) {

    return this.formulario.get(input)?.hasError('required');
  }

/**
 * Funcion guardar
 */
  enviar() {

    if (this.formulario.invalid) {

      console.log(this.formulario);

      return Object.values( this.formulario.controls).forEach( control => {

        if (control instanceof FormGroup ) {

          return Object.values( control.controls).forEach( control => { control.markAsTouched()});

        } else {
          control.markAsTouched();

        }
      })
    } else{



      this.usuario.name = this.formulario.get('nombre')!.value;
      this.usuario.email = this.formulario.get('mail')?.value;
      this.usuario.password = this.formulario.get('password')?.value;
      this.phone.number = this.formulario.get('phone')?.value;
      this.phone.citycode = this.formulario.get('citycode')?.value;
      this.phone.countrycode = this.formulario.get('countrycode')?.value;
      this.usuario.phones = [];
      this.usuario.phones.push(this.phone);
      this.userServ.guardarUser(this.usuario).subscribe(
        (user:any) => {

        console.log("Respuesta = " , user);
        this.userResponse = user;
      });
    }
  }

  cambiar() {

    var input = document.getElementById('password');
    if ( input?.getAttribute('type') === 'password') {
      input.setAttribute("type", "text");
    } else {
      input?.setAttribute("type", "password");
    }
  };

}

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
