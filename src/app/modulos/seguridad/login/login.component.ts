import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SeguridadService } from 'src/app/servicios/seguridad.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import * as cryptoJS from 'crypto-js';

//const cryptoJS = require("crypto-js");

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private seguridadService: SeguridadService,
    private router: Router) { }

     //Validación del correo y contraseña como campos requeridos de tipo "Validación reactiva"
    fgValidacion = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      clave: ['', [Validators.required, Validators.minLength(10)]]
    });

  ngOnInit(): void {
  }

  identificarUsuario() {
    let usuario = this.fgValidacion.controls["correo"].value; //Me trae la info del usuario
    let clave = this.fgValidacion.controls["clave"].value; //Me trae la info de la clave
    let claveCifrada = cryptoJS.MD5(clave).toString(); //Ciframos la clave ya que para este punto ya se recibio la clave sin cifrar del paso anterior
    
    this.seguridadService.login(usuario, claveCifrada).subscribe( //llamamos al método login con el usuario y la clave 
      // se hace el inicio de sesión y si muestra alguna información, entonces ésta info almacénela en la sesión 
      (data: any) => {  
        this.seguridadService.almacenarSesion(data) //Acá estamos verificando que la info sea correcta y si es así almacenará los datos de la sesión y me la redirecciona a la página del index
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Bienvenido',
          showConfirmButton: false,
          timer: 1500
        }).then(() =>{
          this.router.navigate(['/index']);
        })

      },
      (error: any) => {
        console.log(error)
        Swal.fire({
          title: 'Error!',
          text: 'Datos invalidos',
          icon: 'error',
          confirmButtonText: 'Cool'
        })

      }
      );
    }

}
