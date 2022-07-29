import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
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


  //Valida si el correo es valido
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  MiErrorStateMatcher!: ErrorStateMatcher;

  matcher = new MyErrorStateMatcher();

  constructor(private builder: FormBuilder,
              private validadores: ValidadoresService) {

    this.construirFormulario();
   }

  ngOnInit(): void {}

/**
 * Funcion construirFormulario
 */
construirFormulario(){
    this.formulario = this.builder.group({
    nombre: new FormControl('', [Validators.required, Validators.minLength(2)] ),
    apellido: new FormControl('', [Validators.required, Validators.minLength(2)] ),
    mail: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')] ),
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
    console.log(this.formulario);

    if (this.formulario.invalid) {

      return Object.values( this.formulario.controls).forEach( control => {

        if (control instanceof FormGroup ) {

          return Object.values( control.controls).forEach( control => { control.markAsTouched()});

        } else {
          control.markAsTouched();

        }
      })
    }
  }

}

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
