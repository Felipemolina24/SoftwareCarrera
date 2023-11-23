import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private firestore: AngularFirestore) { }

  create_NewStudent(record: any){
    return this.firestore.collection('Student').add(record)
  }

  read_student(){
    return this.firestore.collection('Student').snapshotChanges();
  }

  createUsuario(record:any){
    return this.firestore.collection('Usuarios').add(record)
  }
}
