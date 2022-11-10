import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioModelo } from 'src/app/modelos/usuario.model';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router,
    private route: ActivatedRoute
) { }

fgValidacion = this.fb.group({
  id: ['', [Validators.required]],
  nombres: ['', [Validators.required]],
  apellidos: ['', [Validators.required]],
  telefono: ['', [Validators.required, Validators.minLength(6)]],
  correo: [{value:'', disabled: true },[Validators.required, Validators.email]],
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
    this.usuarioService.getWithId(id).subscribe((data: UsuarioModelo) => { 
      console.log(data)

      this.fgValidacion.controls["id"].setValue(id)
      this.fgValidacion.controls["nombres"].setValue(data.nombres)
      this.fgValidacion.controls["apellidos"].setValue(data.apellidos)
      this.fgValidacion.controls["correo"].setValue(data.correo)
      this.fgValidacion.controls["telefono"].setValue(data.telefono)
    })
  }

  edit(){ 
    let usuario = new UsuarioModelo();
    usuario.id = this.fgValidacion.controls["id"].value;
    usuario.nombres = this.fgValidacion.controls["nombres"].value;
    usuario.apellidos = this.fgValidacion.controls["apellidos"].value;
    // Al editar la info, puedo cambiar el "correo" pero se me mantiene la contraseña inicial
    usuario.correo = this.fgValidacion.controls["correo"].value;
    usuario.telefono = this.fgValidacion.controls["telefono"].value;
    this.usuarioService.update(usuario).subscribe((data: UsuarioModelo)=> {
      Swal.fire('Editado Correctamente!', '', 'success')
      this.router.navigate(['/admin/get']);
    },
    (error: any) => {
      console.log(error)
      alert("Error en el envio");
    })
  }

}
