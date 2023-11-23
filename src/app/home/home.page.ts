import { Component, OnInit } from '@angular/core';
import { CrudService } from '../service/crud.service';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  private studentsCollection = this.firestore.collection('Student');
  students: any;
  studentName: string = "";
  studentAge: string = "correoexample1@mail.com";
  studentAddress: string = "";
  selectedCarril: string = "";

  showRegistrar: boolean = false;
  showRecoger: boolean = false;
  showTabla: boolean = false;


  constructor(private firestore: AngularFirestore, private crudService: CrudService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.studentAge = params['fatherEmail'];
    });
  }
  ngOnInit() {
    this.buscaEstudiantes();
  }

  buscaEstudiantes() {
    try {
      this.studentsCollection.ref.where('correoPadre', '==', this.studentAge).get().then((querySnapshot) => {
        let users: any = [];
        querySnapshot.forEach((doc) => {
          users.push(doc.data());
        });
        
        if (users.length > 0) {
          console.log(users);
          this.students = users.map((user: any) => {
            return {
              Name: user.Name,
              Address: user.Address
            };
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
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

  llegueAlumno() {

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
