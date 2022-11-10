import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ClienteModelo } from '../modelos/cliente.model';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient,
    private seguridadService: SeguridadService) {
      this.token = this.seguridadService.getToken();
     }

   url = "http://localhost:3000" 
  token: string = ''

  store(cliente: ClienteModelo): Observable<ClienteModelo> { 
    return this.http.post<ClienteModelo>(`${this.url}/clientes`, { 
      //Este es el body que pasa los parametros que empatan con el Request body del modelo de clientes en la sección o petición "Post-cliente" en el API loopback
      nombre: cliente.nombre,
      apellidos: cliente.apellidos,
      tipo_DocIdentidad: cliente.tipo_DocIdentidad,
      documento_Identidad: cliente.documento_Identidad,
      telefono: cliente.telefono,
      correo: cliente.correo,
      direccion: cliente.direccion, 
      poblacion: cliente.poblacion,
      estado: cliente.estado 
    }, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    });
  }

  getAll(): Observable<ClienteModelo[]>{
    return this.http.get<ClienteModelo[]>(`${this.url}/usuarios`, {
      headers: new HttpHeaders({ //Se debe entregar un encabezado y este se llama "Authorization: `Bearer" para que me pase el Token de la sesión, ya que para que me traiga todos los usuarios se necesita dar el permiso con el token respectivo
        "Authorization": `Bearer ${this.token}`
      })
    })
  }

  update(cliente: ClienteModelo): Observable<ClienteModelo> { //Actuliza un usuario
    return this.http.patch<ClienteModelo>(`${this.url}/clientes/${cliente.id}`, { //Se utilizara una solictud Http tipo patch al "servicio de Usuarios", entonces para actualizar una persona se debe pasar su Id
      nombre: cliente.nombre,
      apellidos: cliente.apellidos,
      tipo_DocIdentidad: cliente.tipo_DocIdentidad,
      documento_Identidad: cliente.documento_Identidad,
      telefono: cliente.telefono,
      correo: cliente.correo,
      direccion: cliente.direccion, 
      poblacion: cliente.poblacion,
      estado: cliente.estado 
      }, {
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      });
    }

    delete(id: string): Observable<ClienteModelo[]>{ 
      return this.http.delete<ClienteModelo[]>(`${this.url}/clientes/${id}`, { 
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      })
    }

    getWithId(id: string): Observable<ClienteModelo>{
      return this.http.get<ClienteModelo>(`${this.url}/usuarios/${id}`,{
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      })
    }
    
}
