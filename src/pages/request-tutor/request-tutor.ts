import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
export class RequestTutorPage {

  Subject: string;
  Major: string;
  Status: string;
  ClassName: string;
  Description: string;
  MeetingPlace: string;
  Day: string;
  Time: string;


  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RequestTutorPage');
  }

}
