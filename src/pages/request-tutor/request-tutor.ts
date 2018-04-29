import { Component, OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { TutorResquest } from '../../models/tutor-request/tutor-request.interface';
import {AuthServiceProvider} from '../../providers/auth-service/auth-service';
import { Subscription } from 'rxjs/Subscription';
import { DataService } from '../../providers/data-service/data-service';
import { LoginResponse } from '../../models/login/login-response.interface';
import { Profile } from '../../models/profile/profile.interface';

/**
 * Generated class for the RequestTutorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-request-tutor',
  templateUrl: 'request-tutor.html',
})
export class RequestTutorPage implements OnDestroy{

  Subject: string;
  Major: string;
  Status: string;
  ClassName: string;
  Description: string;
  MeetingPlace: string;
  Day: string;
  Time: string;
  tutorRequest = {} as TutorResquest;
  authenticatedUser$: Subscription;
  authenticatedUserProfile$: Subscription;
  authenticatedUserProfile: Profile;



  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthServiceProvider,
    private data: DataService, private toast: ToastController) {
      this.authenticatedUser$ = this.auth.getAutenticatedUser().subscribe(user => {
        this.tutorRequest.from = user.uid;
      });
      this.authenticatedUserProfile$ = this.data.getAuthenticatedUserProfile().subscribe(profile => {
        this.authenticatedUserProfile = profile;
      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RequestTutorPage');
  }

  submit() {
     
    this.tutorRequest.time = new Date();
    this.tutorRequest.fromProfile = this.authenticatedUserProfile;
    const result = this.data.saveRequest(this.tutorRequest);
    if (result) {
      this.toast.create({
        message: 'Request sent!',
        duration: 2000
      }).present();
      this.navCtrl.pop();
    }
    else {
      this.toast.create({
        message: 'An error occured!',
        duration: 2000
      }).present();
    }
  }
  ngOnDestroy() {
    this.authenticatedUser$.unsubscribe();
    this.authenticatedUserProfile$.unsubscribe();
  }
}
