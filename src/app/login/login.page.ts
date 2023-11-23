import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string = "";
  password: string = "";


  private usersCollection = this.firestore.collection('Usuarios');

  constructor(private firestore: AngularFirestore,
    public toastController: ToastController,
    private router: Router) { }

  ngOnInit() {
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Usuario o contraseña incorrectos',
      duration: 2000,
      position: 'bottom',
      color: 'dark', buttons: [
        {
          text: 'Cerrar',
          role: 'cancel'
        }
      ]
    });
    await toast.present();
  }

  Login() {
    try {
      this.usersCollection.valueChanges().subscribe((users: any) => {
        const user = users.find((u: any) => u.Correo === this.email && u.Contraseña === this.password);
        if (user) {
          this.router.navigate(['/home', { fatherEmail: this.email }]);
          this.email = "";
          this.password = "";
        } else {
          this.presentToast();
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

}
