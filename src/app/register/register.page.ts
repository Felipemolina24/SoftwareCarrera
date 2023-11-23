import { Component, OnInit } from '@angular/core';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  usuarioNombre: string = "";
  usuarioCedula: string = "";
  usuarioCelular: string = "";
  usuarioCorreo: string = "";
  usuarioContrasenia: string = "";

  constructor(private crudService: CrudService) { }

  ngOnInit() {}


  CreateRecord() {
    let record: any = {};
    record['Nombre'] = this.usuarioNombre;
    record['Cedula'] = this.usuarioCedula;
    record['Celular'] = this.usuarioCelular;
    record['Correo'] = this.usuarioCorreo;
    record['Contraseña'] = this.usuarioContrasenia;


    this.crudService.createUsuario(record).then(resp => {
      this.usuarioNombre = "";
      this.usuarioCedula = "";
      this.usuarioCelular = "";
      this.usuarioCorreo = "";
      this.usuarioContrasenia = "";
      console.log(resp);
    })
    .catch(error => {
      console.log(error);
    });
  }

}
