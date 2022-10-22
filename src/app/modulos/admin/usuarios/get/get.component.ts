import { Component, OnInit } from '@angular/core';
import { UsuarioModelo } from 'src/app/modelos/usuario.model';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-get',
  templateUrl: './get.component.html',
  styleUrls: ['./get.component.css']
})
export class GetComponent implements OnInit {

  constructor(private usuarioService: UsuarioService) { }

  listado: UsuarioModelo[] = [] //Variable de tipo lista del Modelo-usuario

  ngOnInit(): void {
    this.getAll()
  }

  //Método que me trae todo el listado de los usuarios registrados en el sistema
  getAll(){
    this.usuarioService.getAll().subscribe((data: UsuarioModelo[]) => { //Por medio del método "getAll" que esta ubicado en el archivo usuario.service se implementa este método "getAll" que se ubica acá
      this.listado = data //Me trae toda la info del listado de todos los usuarios, la variable "data" es la que me coge la información de la respuesta de la solicitud http
      console.log(data) //Imprime en pantalla el listado con toda la info de los usuarios 
    })
  }

  delete(id?: any){
    console.log(id)
    Swal.fire({ //Acá lanzamos el mensaje de alerta si efectivamente se borrará el usuario o no en el formato de mensaje sweetAlert
      title: '¿Esta seguro de eliminar este registro?',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
    }).then((result) => { //la sentencia "then" me denota que se realice cierta acción despues de haber validado una acción anterior
      //Afirma que si la elección de eliminar un usuario en el listado es positiva entonces elimine el usuario
      if (result.isConfirmed) {  
        this.usuarioService.delete(id).subscribe((data: any) => {
          Swal.fire('¡Eliminado correctamente!', '', 'success') //Muestre el mensaje de alerta que el usuario fue eliminado correctamente
          this.getAll(); // Finalmente vuelva a mostrar la lista general de usuarios despues de haber eliminado el usuario en cuestión
        })
      }
    })
  }

}
