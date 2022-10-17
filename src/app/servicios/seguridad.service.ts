import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { UsuarioModelo } from '../modelos/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class SeguridadService {

  url = "http://localhost:3000"; //Esta es la URL del API loopback
  sessionUserData = new BehaviorSubject<UsuarioModelo>(new UsuarioModelo()); // captura el comportamiento de los datos en la sesión en específico

  constructor(private http: HttpClient) {
    this.verificarSesion();
   }

  login(correo: String, clave: String): Observable<any> { //Un "observable" es una definición de algo que esta esperando que algo suceda, en el momento que lo soliciten enotnces él realiza una acción y se debe utilizar por medio de una subscripción
    //Hacemos la solicitud al servicio web de login pasandole usuario y clave
    return this.http.post<any>(`${this.url}/login`, {
      usuario: correo,
      password: clave
    }, {
      headers: new HttpHeaders({

      })
    });
  }

  almacenarSesion(data: any): Boolean {
    // Verificamos si existe la sesion
    let sessionData = localStorage.getItem("sessionData"); //El "localStorage" es la info de cuando se inicia sesión en una pag web, por medio del localStorage no se tiene que estar iniciando la sesión cada vez que abrimos una página 
    if (sessionData) {
      return false;
    } else {
      // Definimos los datos a almacenar
      let payload = {
        id: data?.data.id,
        username: data?.data.nombre + " " + data?.data.apellidos ,
        token: data.token,
        isLoggedIn: true
      };
      // Lo convertimos a string
      let datosString = JSON.stringify(payload);
      // Almacenamos los datos en el localStorage
      localStorage.setItem("sessionData", datosString);
      // Definimos una bandera de session
      data.isLoggedIn = true;
      // Refrescamos los datos de la session
      this.refrescarDatosSession(data);
      return true;
    }
  }

  refrescarDatosSession(data: any){
    this.sessionUserData.next(data)
  }

  eliminarSesion(){
    //Eliminamos los datos de la sesion
    localStorage.removeItem("sessionData")
    this.refrescarDatosSession(new UsuarioModelo)
  }

  verificarSesion(){
    let data = this.isLoggedIn();
    if(data){
      this.refrescarDatosSession(data)
    }
  }

  isLoggedIn(){ //Verifica si el usuario está logueado..
    //Verifica si hay información en el localStorage
    let sessionData = localStorage.getItem("sessionData");
    if(sessionData){
      //Si hay info la retorno
      let data = JSON.parse(sessionData);
      return data;
    }
    return null
  }

  datosUsuarioSesion(){
    return this.sessionUserData.asObservable();
  }

  getToken(){
    let sessionData = localStorage.getItem("sessionData");
    if(sessionData){
      let data = JSON.parse(sessionData);
      return data.token;
    }
    return ''
  }

}
