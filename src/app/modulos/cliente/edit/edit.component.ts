import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteModelo } from 'src/app/modelos/cliente.model';
import { ClienteService } from 'src/app/servicios/cliente.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private clienteService: ClienteService,
    private router: Router,
    private route: ActivatedRoute
) { }

fgValidacion = this.fb.group({  
  id: ['', [Validators.required]],
  nombres: ['', [Validators.required]],
  apellidos: ['', [Validators.required]],
  tipo_DocIdentidad: ['', [Validators.required]],
  documento_Identidad: ['', [Validators.required]],
  correo: ['', [Validators.required, Validators.email]],
  telefono: ['', [Validators.required, Validators.minLength(6)]],
  direccion: ['', [Validators.required]],
  poblacion: ['', [Validators.required]],
  estado: ['', [Validators.required]],
});

id: string=''

  ngOnInit(): void {
    //Captura el id del usuario que se encuentra en la url
    this.id = this.route.snapshot.params["id"] //Coja la ruta y captura (snapshot) el parametro llamado id
    //Ejecuta la función para buscar el registro
    this.buscarRegistro(this.id);

  }

  buscarRegistro(id: string){
    // Identifica el usuario por su id y trae la Info de ese usuario de la BD Mongo 
    this.clienteService.getWithId(id).subscribe((data: ClienteModelo) => { 
      console.log(data)

      this.fgValidacion.controls["id"].setValue(id)
      this.fgValidacion.controls["nombres"].setValue(data.nombre)
      this.fgValidacion.controls["apellidos"].setValue(data.apellidos)
      this.fgValidacion.controls["tipo_DocIdentidad"].setValue(data.tipo_DocIdentidad)
      this.fgValidacion.controls["documento_Identidad"].setValue(data.documento_Identidad)
      this.fgValidacion.controls["correo"].setValue(data.correo)
      this.fgValidacion.controls["telefono"].setValue(data.telefono)
      this.fgValidacion.controls["direccion"].setValue(data.direccion)
      this.fgValidacion.controls["poblacion"].setValue(data.poblacion)
      this.fgValidacion.controls["estado"].setValue(data.estado)
    })
  }

  edit(){ 
    let cliente = new ClienteModelo();
    cliente.id = this.fgValidacion.controls["id"].value;
    cliente.nombre = this.fgValidacion.controls["nombres"].value;
    cliente.apellidos = this.fgValidacion.controls["apellidos"].value;
    cliente.tipo_DocIdentidad = this.fgValidacion.controls["tipo_DocIdentidad"].value;
    cliente.documento_Identidad = this.fgValidacion.controls["documento_Identidad"].value;
    cliente.correo = this.fgValidacion.controls["correo"].value;
    cliente.telefono = this.fgValidacion.controls["telefono"].value;
    cliente.direccion = this.fgValidacion.controls["direccion"].value;
    cliente.poblacion = this.fgValidacion.controls["poblacion"].value;
    cliente.estado = this.fgValidacion.controls["estado"].value;
   
    this.clienteService.update(cliente).subscribe((data: ClienteModelo)=> {
      Swal.fire('Cliente Editado Correctamente!', '', 'success')
      this.router.navigate(['/cliente/get']);
    },
    (error: any) => {
      console.log(error)
      alert("Error en el envio");
    })
  }

}
