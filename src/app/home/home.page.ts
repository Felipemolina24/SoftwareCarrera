import { Component, OnInit } from '@angular/core';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  students:any;
  studentName: string = "";
  studentAge: string = "correoexample1@mail.com";
  studentAddress: string = "";
  selectedCarril: string = "";

  showRegistrar: boolean = false;
  showRecoger: boolean = false;
  showTabla: boolean = false;


  constructor(private crudService: CrudService) {}

  ngOnInit() {
    this.crudService.read_student().subscribe((data: any)=>{
      this.students=data.map((e: any)=>{
        return {
          id: e.payload.doc.id,
          isEdit: false,
          Name: e.payload.doc.data()['Name'],
          correoPadre:e.payload.doc.data()['correoPadre'],
          Address: e.payload.doc.data()['Address']

        }
      })
    })
  }

  toggleRegistrar() {
    this.showRegistrar = true;
    this.showRecoger = false;
    this.showTabla = false;
  }

  toggleRecoger() {
    this.showRegistrar = false;
    this.showRecoger = true;
    this.showTabla = false;
  }

  mostrarTabla() {
    this.showRegistrar = false;
    this.showRecoger = false;
    this.showTabla = true;
  }

  llegueAlumno(){

  }


  registrarAlumno() {
    let record: any = {};
    record['Name'] = this.studentName;
    record['correoPadre'] = this.studentAge;
    record['Address'] = this.studentAddress;

    this.crudService.create_NewStudent(record).then(resp => {
      this.studentName = "";
      this.studentAge = "";
      this.studentAddress = "";
      console.log(resp);
    })
    .catch(error => {
      console.log(error);
    });
  }
}
