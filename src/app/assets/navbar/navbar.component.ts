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
  subs: Subscription = new Subscription();


  ngOnInit(): void {
    this.subs = this.seguridadService.datosUsuarioSesion().subscribe((data: UsuarioModelo) => { // Acá decimos que vaya al archivo de "seguiridadService" y verifique un método llamado "datosUsuarioSesion()" para que me retorne los datos de la sesión del usuario
      console.log(data)
        this.activeSession = data.isLoggedIn; // con base al valor de la variable "activeSession" será verdadera si hay una sesión de usuario abierta "isLoggedIn=True" o será falsa si no hay ninguna sesión de usuario abierta
    })

  }

}
