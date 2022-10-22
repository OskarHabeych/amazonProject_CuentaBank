import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { CuentaModelo } from '../modelos/cuenta.model';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class CuentaService {

  constructor(private http: HttpClient,
    private seguridadService: SeguridadService) {
      this.token = this.seguridadService.getToken();
     }

   url = "http://localhost:3000" 
  token: string = ''

  store(cuenta: CuentaModelo): Observable<CuentaModelo> { 
    return this.http.post<CuentaModelo>(`${this.url}/cuentas`, { 
      //Este es el body que pasa los parametros que empatan con el Request body del modelo de cuenta en la sección o petición "Post-cuenta" en el API loopback
      numeroCuenta: cuenta.num_Cuenta,
      tipoCuenta: cuenta.tipo_Cuenta,
      estadoCuenta: cuenta.estado_Cuenta,
      debitos: cuenta.debitos,
      creditos: cuenta.creditos,
      savings: cuenta.savings,
      padre: cuenta.padre 
    });
  }

  getAll(): Observable<CuentaModelo[]>{
    return this.http.get<CuentaModelo[]>(`${this.url}/cuentas`, {
      headers: new HttpHeaders({ //Se debe entregar un encabezado y este se llama "Authorization: `Bearer" para que me pase el Token de la sesión, ya que para que me traiga todos las cuentas se necesita dar el permiso con el token respectivo
        "Authorization": `Bearer ${this.token}`
      })
    })
  }

  update(cuenta: CuentaModelo): Observable<CuentaModelo> { //Actuliza una cuenta
    return this.http.patch<CuentaModelo>(`${this.url}/cuentas/${cuenta.id}`, { //Se utilizara una solictud Http tipo patch al "servicio de cuentas", entonces para actualizar una cuenta se debe pasar su Id
      numeroCuenta: cuenta.num_Cuenta,
      tipoCuenta: cuenta.tipo_Cuenta,
      estadoCuenta: cuenta.estado_Cuenta,
      debitos: cuenta.debitos,
      creditos: cuenta.creditos,
      savings: cuenta.savings,
      padre: cuenta.padre 
      }, {
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      });
    }

    delete(id: string): Observable<CuentaModelo[]>{ 
      return this.http.delete<CuentaModelo[]>(`${this.url}/cuentas/${id}`, { 
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      })
    }

    getWithId(id: string): Observable<CuentaModelo>{
      return this.http.get<CuentaModelo>(`${this.url}/cuentas/${id}`,{
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      })
    }
    
}
