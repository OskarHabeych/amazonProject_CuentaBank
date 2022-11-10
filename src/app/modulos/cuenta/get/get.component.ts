import { Component, OnInit } from '@angular/core';
import { CuentaModelo } from 'src/app/modelos/cuenta.model';
import { CuentaService } from 'src/app/servicios/cuenta.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-get',
  templateUrl: './get.component.html',
  styleUrls: ['./get.component.css']
})
export class GetComponent implements OnInit {

  constructor(private cuentaService: CuentaService) { }

  listar: CuentaModelo[] = []

  ngOnInit(): void {
    this.getAll()
  }

  //Método que me trae todo el listado de los usuarios registrados en el sistema
  getAll(){
    this.cuentaService.getAll().subscribe((data: CuentaModelo[]) => { //Por medio del método "getAll" que esta ubicado en el archivo cuenta.service se implementa este método "getAll" que se ubica acá
      this.listar = data //Me trae toda la info del listado de todas las cuentas, la variable "data" es la que me coge la información de la respuesta de la solicitud http
      console.log(data) //Imprime en pantalla el listado con toda la info de las cuentas 
    })
  }

  delete(id?: any){
    console.log(id)
    Swal.fire({ //Acá lanzamos el mensaje de alerta si efectivamente se borrará la cuenta o no en el formato de mensaje sweetAlert
      title: '¿Esta seguro de eliminar este registro?',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
    }).then((result) => { //la sentencia "then" me denota que se realice cierta acción despues de haber validado una acción anterior
      //Afirma que si la elección de eliminar una cuenta en el listado es positiva entonces elimine la cuenta
      if (result.isConfirmed) {  
        this.cuentaService.delete(id).subscribe((data: any) => {
          Swal.fire('¡Eliminada correctamente!', '', 'success') //Muestre el mensaje de alerta que la cuenta fue eliminada correctamente
          this.getAll(); // Finalmente vuelve a mostrar la lista general de cuentas despues de haber eliminado la cuenta en cuestión
        })
      }
    })
  }

}
