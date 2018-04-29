import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { LoginResponse } from '../../models/login/login-response.interface';
import { Account } from '../../models/account/account.interface';
import { Subscription } from 'rxjs/Subscription';
import { DataService } from '../../providers/data-service/data-service';
import { User } from 'firebase';
import { Profile } from '../../models/profile/profile.interface';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  account = {} as Account;
  authUser$: Subscription;
  authProfile$: Subscription;
  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthServiceProvider,
    private toast: ToastController, private data: DataService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  register() {
    this.navCtrl.push('RegisterPage');
  }
  
  async login() {
    const response: LoginResponse = await this.auth.signInWithEmailAndPassword(this.account);
    if (!response.error) {
      this.toast.create({
        message: 'Welcome!',
        duration: 1500
      }).present();
      this.authProfile$ = this.data.getProfile(<User>response.result).subscribe((profile: Profile) => {
        console.log(profile);
        if (profile.lastName != '') {
          console.log('To tabs page');
          this.navCtrl.setRoot('TabsPage');
        }
        else {
          console.log('About to Edit Profile');
          this.navCtrl.setRoot('EditProfilePage');
        }
      })
    }
    else {
      console.log(response.error.message);
    }
    console.log(response.result);
  }
}
