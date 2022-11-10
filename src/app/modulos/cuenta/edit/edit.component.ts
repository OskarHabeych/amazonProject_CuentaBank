import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CuentaModelo } from 'src/app/modelos/cuenta.model';
import { CuentaService } from 'src/app/servicios/cuenta.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private cuentaService: CuentaService,
    private router: Router,
    private route: ActivatedRoute
) { }

fgValidacion = this.fb.group({  
  id: ['', [Validators.required]],
  num_Cuenta: ['', [Validators.required]],
  tipo_Cuenta: ['', [Validators.required]],
  estado_Cuenta: ['', [Validators.required]],
  debitos: ['', [Validators.required]],
  creditos: ['', [Validators.required]],
  savings: ['', [Validators.required]],
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
    this.cuentaService.getWithId(id).subscribe((data: CuentaModelo) => { 
      console.log(data)

      this.fgValidacion.controls["id"].setValue(id)
      this.fgValidacion.controls["num_Cuenta"].setValue(data.num_Cuenta)
      this.fgValidacion.controls["tipo_Cuenta"].setValue(data.tipo_Cuenta)
      this.fgValidacion.controls["estado_Cuenta"].setValue(data.estado_Cuenta)
      this.fgValidacion.controls["debitos"].setValue(data.debitos)
      this.fgValidacion.controls["creditos"].setValue(data.creditos)
      this.fgValidacion.controls["savings"].setValue(data.savings)
    })
  }

  edit(){ 
    let cuenta = new CuentaModelo();
    cuenta.id = this.fgValidacion.controls["id"].value;
    cuenta.num_Cuenta = this.fgValidacion.controls["num_Cuenta"].value;
    cuenta.tipo_Cuenta = this.fgValidacion.controls["tipo_Cuenta"].value;
    cuenta.estado_Cuenta = this.fgValidacion.controls["estado_Cuenta"].value;
    cuenta.debitos = this.fgValidacion.controls["debitos"].value;
    cuenta.creditos = this.fgValidacion.controls["creditos"].value;
    cliente.savings = this.fgValidacion.controls["savings"].value;
    
    this.cuentaService.update(cuenta).subscribe((data: CuentaModelo)=> {
      Swal.fire('Cliente Editado Correctamente!', '', 'success')
      this.router.navigate(['/cliente/get']);
    },
    (error: any) => {
      console.log(error)
      alert("Error en el envio");
    })
  }

}
