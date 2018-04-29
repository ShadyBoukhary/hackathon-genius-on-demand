import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RequestTutorViewPage } from './request-tutor-view';

@NgModule({
  declarations: [
    RequestTutorViewPage,
  ],
  imports: [
    IonicPageModule.forChild(RequestTutorViewPage),
  ],
})
export class RequestTutorViewPageModule {}
