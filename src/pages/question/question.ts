import { Component, OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Question } from '../../models/question/question.interface';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { DataService } from '../../providers/data-service/data-service';
import { Subscription } from 'rxjs/Subscription';
import { User } from 'firebase/app';
import { Profile } from '../../models/profile/profile.interface';

/**
 * Generated class for the QuestionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-question',
  templateUrl: 'question.html',
})
export class QuestionPage implements OnDestroy{
  
  question = {} as Question;
  authenticatedUser$: Subscription;
  authenticatedUserProfile$: Subscription;
  authenticatedUserProfile: Profile;

  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthServiceProvider,
    private data: DataService, private toast: ToastController) {
    this.authenticatedUser$ = this.auth.getAutenticatedUser().subscribe(user => {
      this.question.from = user.uid;
    });
    this.authenticatedUserProfile$ = this.data.getAuthenticatedUserProfile().subscribe(profile => {
      this.authenticatedUserProfile = profile;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuestionPage');
  }
  async submit() {
    this.question.time = new Date();
    this.question.fromProfile = this.authenticatedUserProfile;
    const response = await this.data.saveQuestion(this.question);
    if (response) {
      this.toast.create({
        message: 'Question submitted!',
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
