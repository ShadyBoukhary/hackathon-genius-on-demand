import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { LoginResponse } from '../../models/login/login-response.interface';
import { Account } from '../../models/account/account.interface';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  password: string;
  account = {} as Account;
  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthServiceProvider,
    private toast: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  async register() {
    if (this.account.password == this.password) {
      const response: LoginResponse = await this.auth.createUserWithEmailAndPassword(this.account);
      if (!response.error) {
        this.toast.create({
          message: 'Account created successfully',
          duration: 1500
        }).present();
        this.navCtrl.setRoot('LoginPage');
      }
      else {
        console.log(response.error.message);
      }
      
    }
    else {
      this.toast.create({
        message: 'Password mismatch',
        duration: 1500
      }).present();
    }
  }
}
