import { Component, OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import { Question } from '../../models/question/question.interface';
import { Answer } from '../../models/answer/answer.interface';
import { Subscription } from 'rxjs/Subscription';
import { Profile } from '../../models/profile/profile.interface';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { DataService } from '../../providers/data-service/data-service';
import { Observable } from 'rxjs/Observable'
/**
 * Generated class for the QuestionViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-question-view',
  templateUrl: 'question-view.html',
})
export class QuestionViewPage implements OnDestroy{
  //question: Question;
  question: Question;
  answer = {} as Answer;
  answerList: Answer[];
  questionById: Observable<Question>;
  questionById$: Subscription;

  writeAnswerToggle: boolean = false;
  showAnswersToggle: boolean = false;
  authenticatedUser$: Subscription;
  authenticatedUserProfile$: Subscription;
  authenticatedUserProfile: Profile;


  constructor(public navCtrl: NavController, public navParams: NavParams, private view: ViewController,
    private auth: AuthServiceProvider, private data: DataService, private toast: ToastController) {
    this.authenticatedUser$ = this.auth.getAutenticatedUser().subscribe(user => {
      this.answer.from = user.uid;
    });
    this.authenticatedUserProfile$ = this.data.getAuthenticatedUserProfile().subscribe(profile => {
      this.authenticatedUserProfile = profile;
    });
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad QuestionViewPage');
  }
  ionViewWillLoad() {
    this.question = this.navParams.get('question');
    console.log(this.question);
    this.questionById$ = this.data.getQuestionByID(this.question).subscribe((q: Question) => {
      this.answerList = q.answers;
      console.log(this.answerList);
    });

  }
  goSubmitAnswerPage(){
    this.navCtrl.push("SubmitAnswerPage", {'questionDescription': this.question.description});
  }
  close() {
    this.view.dismiss();
  }
  writeAnswer() {
    this.writeAnswerToggle = true;
  }
  
  showAnswers() {
    if (!this.showAnswersToggle) {
      this.showAnswersToggle = true;
    }
    else {
      this.showAnswersToggle = false;
    }
  }
  async submit() {
    this.answer.from = this.authenticatedUserProfile.$key;
    this.answer.fromProfile = this.authenticatedUserProfile;
    this.answer.time = new Date();
    console.log(this.answer.time);
    if (!this.question.answers) {
      this.question.answers = [];
    }
    console.log(this.question.answers);
    this.question.answers[this.question.answers.length] = this.answer;
    const response = await this.data.saveAnswer(this.question);
    if (response) {
      this.toast.create({
        message: 'Answer Successfully Submitted!',
        duration: 2000
      }).present();
      this.writeAnswerToggle = false;
      this.showAnswersToggle = false;
    }
    else {
      this.toast.create({
        message: 'An error has occurred!',
        duration: 2000
      }).present();
    }


  }
  ngOnDestroy() {
    this.authenticatedUser$.unsubscribe();
    this.authenticatedUserProfile$.unsubscribe();
    this.questionById$.unsubscribe();
  }
}

