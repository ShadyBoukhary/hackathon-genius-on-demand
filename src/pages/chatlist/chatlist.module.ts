import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChatlistPage } from './chatlist';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    ChatlistPage,
  ],
  imports: [
    IonicPageModule.forChild(ChatlistPage),
    ComponentsModule,
  ],
})
export class ChatlistPageModule {}
