import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Question } from '../../models/question/question.interface';
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
export class QuestionViewPage {
  //question: Question;
  question: TestQuestion;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad QuestionViewPage');
  }
  ionViewWillLoad() {
    //this.question = this.navParams.get('question');
    
    //testing, creating a fake question
    this.question = new TestQuestion();
    this.question.title = "Help with my Algebra homework";
    this.question.subtitle = "Find value for x";
    this.question.description = "Testing a description that is longer than the usual title or subtitle, field should be able to display entire question in a nice format. Making up some extra words so that the question is even longer. Blablbalblablablablablalbalbalbalblablalbalblalblablablalbalblablalblablablalbalblablalblalbalblalba."
    console.log(this.question)
  }
  goSubmitAnswerPage(){
    this.navCtrl.push("SubmitAnswerPage", {'questionDescription': this.question.description});
  }
}

//Purely for html formatting testing
class TestQuestion{
  public title: string;
  public subtitle: string;
  public description: string;
}