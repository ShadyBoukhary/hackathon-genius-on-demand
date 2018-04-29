import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TutorRequest } from '../../models/tutor-request/tutor-request.interface';
/**
 * Generated class for the RequestTutorViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-request-tutor-view',
  templateUrl: 'request-tutor-view.html',
})
export class RequestTutorViewPage {
  //tutorRequest: TutorRequest;
  tutorRequest: TestTutorRequest; //testing

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RequestTutorViewPage');
  }
  ionViewWillLoad() {
    //this.tutorRequest = this.navParams.get('tutorRequest');
    
    //testing, creating a fake tutor request
    this.tutorRequest = new TestTutorRequest();
    this.tutorRequest.Subject = "Test subject";
    this.tutorRequest.Major = "Test Major";
    this.tutorRequest.ClassName = "test ClassName";
    this.tutorRequest.Description = "test description";
    this.tutorRequest.MeetingPlace = "test meething place";
    this.tutorRequest.Status = "Test Undergrad";
    this.tutorRequest.Day = "Testday 12 April";
    this.tutorRequest.Time = "12:05"

    console.log(this.tutorRequest)
  }
}
class TestTutorRequest{ //purely for testing purposes
  public Subject: string;
  public Major: string;
  public Status: string;
  public ClassName: string;
  public Description: string;
  public MeetingPlace: string;
  public Day: string;
  public Time: string;
}