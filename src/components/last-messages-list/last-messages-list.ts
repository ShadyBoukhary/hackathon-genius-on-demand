import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../providers/chat-service';
import { ChatMessage } from '../../models/chat-message/chat-message.interface';
import { Observable } from "rxjs/Observable";
import { Profile } from '../../models/profile/profile.interface';
import { NavController } from 'ionic-angular';

/**
 * Generated class for the LastMessagesListComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'last-messages-list',
  templateUrl: 'last-messages-list.html'
})
export class LastMessagesListComponent implements OnInit{

  messageList: Observable<ChatMessage[]>;
  constructor(private chat: ChatService, private navCtrl: NavController) {

  }

  ngOnInit() {
    this.messageList = this.chat.getLastMessages();
    console.log(this.messageList);
  }
  openMessage(message: ChatMessage) {
    console.log(message);
    const profile: Profile = {
      $key: message.toUserId,
      firstName: message.userToProfile.firstName,
      lastName: message.userToProfile.lastName,
      numberOfAnswers: message.userToProfile.numberOfAnswers,
      numberOfQuestions: message.userToProfile.numberOfQuestions,
      numberOfTutorRequests: message.userToProfile.numberOfTutorRequests,
      major: message.userToProfile.major,
      email: message.userToProfile.email,
      degreeType: message.userToProfile.degreeType,
      classification: message.userToProfile.classification,
      dateOfBirth: message.userToProfile.dateOfBirth
    }
    this.navCtrl.push('Chat', {profile});
  }

}
