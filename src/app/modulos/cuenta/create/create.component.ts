import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClienteModelo } from 'src/app/modelos/cliente.model';
import { CuentaModelo } from 'src/app/modelos/cuenta.model';
import { ClienteService } from 'src/app/servicios/cliente.service';
import { CuentaService } from 'src/app/servicios/cuenta.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private cuentaService: CuentaService,
    private clienteService: ClienteService,
    private router: Router
  ) { }

  fgValidacion = this.fb.group({  
    num_Cuenta: ['', [Validators.required]],
    tipo_Cuenta: ['', [Validators.required]],
    estado_Cuenta: ['', [Validators.required]],
    debitos: ['', [Validators.required]],
    creditos: ['', [Validators.required]],
    savings: ['', [Validators.required]],
    padre: ['', [Validators.required]],
  });

  listadoClientes: ClienteModelo[] = []

  ngOnInit(): void {
    this.getAllClientes(); //este método ya va a tener la información del listado de todos los clientes para que aparezca impresa en la interface del usuario que se relaciona con el archivo "crear Cliente nuevo"
  }

  store(){
    let cuenta = new CuentaModelo();
    cuenta.num_Cuenta = this.fgValidacion.controls["num_Cuenta"].value;
    cuenta.tipo_Cuenta = this.fgValidacion.controls["tipo_Cuenta"].value;
    cuenta.estado_Cuenta = this.fgValidacion.controls["estado_Cuenta"].value;
    cuenta.debitos = this.fgValidacion.controls["debitos"].value;
    cuenta.creditos = this.fgValidacion.controls["creditos"].value;
    cuenta.savings = this.fgValidacion.controls["savings"].value;
    cuenta.padre = this.fgValidacion.controls["padre"].value;

    this.cuentaService.store(cuenta).subscribe((data: CuentaModelo)=> {
      Swal.fire('Cuenta Creada correctamente!', '', 'success')
      this.router.navigate(['/cuenta/get']);
    },
    (error: any) => {
      console.log(error)
      alert("Error en el envio");
    })
  }

  getAllClientes(){
    this.clienteService.getAll().subscribe((data: ClienteModelo[]) => { //este método getAll() conecta directamente con el servicio de traerme todo los clientes directamente de la BD 
      this.listadoClientes = data //Me agrega todo el listado del clientes a la variable de "tipo lista" acerca del modelo-cliente
      console.log(data) //Imprime en la interface del usuario el contenido de la variable "tipo lista" del paso anterior
    })
  }

}
