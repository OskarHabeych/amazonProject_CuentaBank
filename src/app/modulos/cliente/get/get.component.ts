import { Component, OnInit } from '@angular/core';
import { ClienteModelo } from 'src/app/modelos/cliente.model';
import { ClienteService } from 'src/app/servicios/cliente.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-get',
  templateUrl: './get.component.html',
  styleUrls: ['./get.component.css']
})
export class GetComponent implements OnInit {

  constructor(private clienteService: ClienteService) { }

  listar: ClienteModelo[] = []

  ngOnInit(): void {
    this.getAll()
  }

  //Método que me trae todo el listado de los usuarios registrados en el sistema
  getAll(){
    this.clienteService.getAll().subscribe((data: ClienteModelo[]) => { //Por medio del método "getAll" que esta ubicado en el archivo cliente.service se implementa este método "getAll" que se ubica acá
      this.listar = data //Me trae toda la info del listado de todos los clientes, la variable "data" es la que me coge la información de la respuesta de la solicitud http
      console.log(data) //Imprime en pantalla el listado con toda la info de los clientes 
    })
  }

  delete(id?: any){
    console.log(id)
    Swal.fire({ //Acá lanzamos el mensaje de alerta si efectivamente se borrará el cliente o no en el formato de mensaje sweetAlert
      title: '¿Esta seguro de eliminar este registro?',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
    }).then((result) => { //la sentencia "then" me denota que se realice cierta acción despues de haber validado una acción anterior
      //Afirma que si la elección de eliminar un cliente en el listado es positiva entonces elimine el cliente
      if (result.isConfirmed) {  
        this.clienteService.delete(id).subscribe((data: any) => {
          Swal.fire('¡Eliminado correctamente!', '', 'success') //Muestre el mensaje de alerta que el usuario fue eliminado correctamente
          this.getAll(); // Finalmente vuelve a mostrar la lista general de clientes despues de haber eliminado el cliente en cuestión
        })
      }
    })
  }

}
