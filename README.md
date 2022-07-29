# UserApp

## Descripción
Front desarrollado en Angular 12

Es un formulario reactivo que incluye los campos:
 - Nombre
 - Apellido
 - Mail
 - Rut
 
## Validación de formulario
Realiza validaciones de formato para Mail utilizando la expresión regular [a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$

Realizar validaciones de formato para Rut utlizando la expresion regular ^[0-9]+[-]{1}[0-9kK]{1}$

Se incluye digito Validador para el rut.

## Ejecución
Para la ejecución de la App ejecutar el comando 
``` ng serve ``` y desde el navegador ingresar a la url `http://localhost:4200/`

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.1.0.

