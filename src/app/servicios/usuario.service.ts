import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsuarioModelo } from '../modelos/usuario.model';
import { Injectable } from '@angular/core';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient,
    private seguridadService: SeguridadService
    ) {
      this.token = this.seguridadService.getToken(); //Iinicialización del Token dentro del constructor
     }

  url = "http://localhost:3000"  //Variable que alberga la URL del API loopback
  token: string = '' //Variable que alberga el Token que es el que se va a utilizar en las solicitudes

  //Método que me hace el papel de registrar un usuario
  store(usuario: UsuarioModelo): Observable<UsuarioModelo> { //Recibe un objeto de tipo usuario modelo osea los datos de un usuario
    return this.http.post<UsuarioModelo>(`${this.url}/usuarios`, { //Me hace una solictud http por el método Post a la URL localhost:3000 a los servicios del modelo "Usuarios" 
      //Este es el body que pasa los parametros que empatan con el Request body del modelo de usuarios en la sección o petición "Post-usuario" en el API loopback
      nombre: usuario.nombres,
      apellidos: usuario.apellidos,
      telefono: usuario.telefono,
      correo: usuario.correo
    });
  }

  getAll(): Observable<UsuarioModelo[]>{
    return this.http.get<UsuarioModelo[]>(`${this.url}/usuarios`, {
      headers: new HttpHeaders({ //Se debe entregar un encabezado y este se llama "Authorization: `Bearer" para que me pase el Token de la sesión, ya que para que me traiga todos los usuarios se necesita dar el permiso con el token respectivo
        "Authorization": `Bearer ${this.token}`
      })
    })
  }

  update(usuario: UsuarioModelo): Observable<UsuarioModelo> { //Actualiza un usuario
    return this.http.patch<UsuarioModelo>(`${this.url}/usuarios/${usuario.id}`, { //Se utilizara una solictud Http tipo patch al "servicio de Usuarios", entonces para actualizar una persona se debe pasar su Id
      nombre: usuario.nombres,
      apellidos: usuario.apellidos,
      telefono: usuario.telefono,
        correo: usuario.correo
      }, {
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      });
    }

    delete(id: string): Observable<UsuarioModelo[]>{ 
      return this.http.delete<UsuarioModelo[]>(`${this.url}/usuarios/${id}`, { //Elimina un usuario  por medio de pasar un Id del usuario que se desea eliminar
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      })
    }

    getWithId(id: string): Observable<UsuarioModelo>{
      return this.http.get<UsuarioModelo>(`${this.url}/usuarios/${id}`,{
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      })
    }

}
