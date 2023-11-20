import { Component, OnInit } from '@angular/core';
import { CrudService } from '../service/crud.service';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent  implements OnInit {


  usuarioNombre: string = "";
  usuarioCedula: string = "";
  usuarioCelular: string = "";
  usuarioCorreo: string = "";
  usuarioContraseña: string = "";

  constructor(private crudService: CrudService) { }

  ngOnInit() {}


  CreateRecord() {
    let record: any = {};
    record['Nombre'] = this.usuarioNombre;
    record['Cedula'] = this.usuarioCedula;
    record['Celular'] = this.usuarioCelular;
    record['Correo'] = this.usuarioCorreo;
    record['Contraseña'] = this.usuarioContraseña;


    this.crudService.createUsuario(record).then(resp => {
      this.usuarioNombre = "";
      this.usuarioCedula = "";
      this.usuarioCelular = "";
      this.usuarioCorreo = "";
      this.usuarioContraseña = "";
      console.log(resp);
    })
    .catch(error => {
      console.log(error);
    });
  }

}
