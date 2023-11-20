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
  studentAge: number = 0;
  studentAddress: string = "";

  constructor(private crudService: CrudService) {}

  ngOnInit() {
    this.crudService.read_student().subscribe((data: any)=>{
      this.students=data.map((e: any)=>{
        return {
          id: e.payload.doc.id,
          isEdit: false,
          Name: e.payload.doc.data()['Name'],
          age:e.payload.doc.data()['Age'],
          Address: e.payload.doc.data()['Address']

        }
      })
    })
  }

  CreateRecord() {
    let record: any = {};
    record['Name'] = this.studentName;
    record['Age'] = this.studentAge;
    record['Address'] = this.studentAddress;

    this.crudService.create_NewStudent(record).then(resp => {
      this.studentName = "";
      this.studentAge = 0;
      this.studentAddress = "";
      console.log(resp);
    })
    .catch(error => {
      console.log(error);
    });
  }
}
