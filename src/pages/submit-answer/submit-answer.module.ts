import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SubmitAnswerPage } from './submit-answer';

@NgModule({
  declarations: [
    SubmitAnswerPage,
  ],
  imports: [
    IonicPageModule.forChild(SubmitAnswerPage),
  ],
})
export class SubmitAnswerPageModule {}
