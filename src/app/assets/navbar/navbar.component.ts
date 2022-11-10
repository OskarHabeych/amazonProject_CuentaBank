import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UsuarioModelo } from 'src/app/modelos/usuario.model';
import { SeguridadService } from 'src/app/servicios/seguridad.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private seguridadService: SeguridadService) { }

  activeSession?:boolean = false; // Estado de la variable "activeSession" se inicializa en falso, esta variable es la que me rige si una sesión de usuario esta abierta actualmente o esta cerrada
  /*Esto sería para coger un valor particular de una persona
  nombre?: string= "";*/
  subs: Subscription = new Subscription();


  ngOnInit(): void {
    this.subs = this.seguridadService.datosUsuarioSesion().subscribe((data: UsuarioModelo) => { // Acá decimos que vaya al archivo de "seguridadService" y verifique un método llamado "datosUsuarioSesion()" para que me retorne los datos de la sesión del usuario
      console.log(data) //Por medio de la variable activeSession valida para imprimir una info que son los datos del usuario
      /* Continuación de como coger una valor particular de una persona
      this.nombre=  data.username;*/
      this.activeSession = data.isLoggedIn; // con base al valor de la variable "activeSession" será verdadera si hay una sesión de usuario abierta "isLoggedIn=True" o será falsa si no hay ninguna sesión de usuario abierta
    })

  }

}
