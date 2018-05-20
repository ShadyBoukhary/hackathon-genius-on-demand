import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Modal } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Question } from '../../models/question/question.interface';
import { TutorResquest } from '../../models/tutor-request/tutor-request.interface';
import { DataService } from '../../providers/data-service/data-service';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage implements OnInit {

  questionList: Observable<Question[]>;
  requestList: Observable<TutorResquest[]>;
  filter: string = 'questions';

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private data: DataService, private modal: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  goQuestionsPage() {
    this.navCtrl.push("QuestionPage");
  }
  goTutorPage() {
    this.navCtrl.push("RequestTutorPage");
  }


  
 ngOnInit() {
  this.questionList = this.data.getQuestions();
  console.log(this.questionList);
  this.requestList = this.data.getRequests();

 }
 openQuestion(question: Question) {
  const modal: Modal = this.modal.create('QuestionViewPage', {question});
  modal.present();
 }
 openRequest(request: TutorResquest) {
   const modal: Modal = this.modal.create('RequestTutorViewPage', {request});
   modal.present();
 }
}
