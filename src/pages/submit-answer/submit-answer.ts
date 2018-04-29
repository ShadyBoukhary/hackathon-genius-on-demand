import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SubmitAnswerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-submit-answer',
  templateUrl: 'submit-answer.html',
})
export class SubmitAnswerPage {
  questionDescription: string;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SubmitAnswerPage');
  }
  ionViewWillLoad() {
    this.questionDescription = this.navParams.get('questionDescription');
    console.log(this.questionDescription)
  }
}
