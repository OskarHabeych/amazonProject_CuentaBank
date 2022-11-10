import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClienteModelo } from 'src/app/modelos/cliente.model';
import { ClienteService } from 'src/app/servicios/cliente.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private clienteService: ClienteService,
    private router: Router
  ) { }

  fgValidacion = this.fb.group({  
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

  ngOnInit(): void {
  }

  store(){
    let cliente = new ClienteModelo();
    cliente.nombre = this.fgValidacion.controls["nombres"].value;
    cliente.apellidos = this.fgValidacion.controls["apellidos"].value;
    cliente.tipo_DocIdentidad = this.fgValidacion.controls["tipo_DocIdentidad"].value;
    cliente.documento_Identidad = this.fgValidacion.controls["documento_Identidad"].value;
    cliente.correo = this.fgValidacion.controls["correo"].value;
    cliente.telefono = this.fgValidacion.controls["telefono"].value;
    cliente.direccion = this.fgValidacion.controls["direccion"].value;
    cliente.poblacion = this.fgValidacion.controls["poblacion"].value;
    cliente.estado = this.fgValidacion.controls["estado"].value;

    this.clienteService.store(cliente).subscribe((data: ClienteModelo)=> {
      Swal.fire('Cliente Creado correctamente!', '', 'success')
      this.router.navigate(['/cliente/get']);
    },
    (error: any) => {
      console.log(error)
      alert("Error en el envio");
    })
  }

}
