import { Component, OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import { Question } from '../../models/question/question.interface';
import { Answer } from '../../models/answer/answer.interface';
import { Subscription } from 'rxjs/Subscription';
import { Profile } from '../../models/profile/profile.interface';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { DataService } from '../../providers/data-service/data-service';
import { Observable } from 'rxjs/Observable';
import { TutorResquest } from '../../models/tutor-request/tutor-request.interface';


@IonicPage()
@Component({
  selector: 'page-request-tutor-view',
  templateUrl: 'request-tutor-view.html',
})
export class RequestTutorViewPage implements OnDestroy{

  contactCheck: boolean = false;
  authenticatedUser$: Subscription;
  authenticatedUserProfile$: Subscription;
  authenticatedUserProfile: Profile;
  request: TutorResquest;

  constructor(public navCtrl: NavController, public navParams: NavParams, private view: ViewController,
    private auth: AuthServiceProvider, private data: DataService, private toast: ToastController) {
      this.authenticatedUser$ = this.auth.getAutenticatedUser().subscribe(user => {
       // this.answer.from = user.uid;
      });
      this.authenticatedUserProfile$ = this.data.getAuthenticatedUserProfile().subscribe(profile => {
        this.authenticatedUserProfile = profile;
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RequestTutorViewPage');
  }
  ionViewWillLoad() {
    this.request = this.navParams.get('request');
  }

  ngOnDestroy() {
    this.authenticatedUser$.unsubscribe();
    this.authenticatedUserProfile$.unsubscribe();
  }
  close() {
    this.view.dismiss();
  }
  contact() {
    this.view.dismiss();
    this.contactCheck = true;
    this.view.onWillDismiss(() => {
      if (this.contactCheck) {
        const profile: Profile = this.request.fromProfile;
        profile.$key = this.request.from;
        this.navCtrl.setRoot('TabsPage');
        this.navCtrl.push('Chat', {profile});
      }
    })
  }
}

