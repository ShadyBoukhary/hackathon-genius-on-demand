import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService } from '../../providers/chat-service';
import { ChatMessage } from '../../models/chat-message/chat-message.interface';
import { Observable } from "rxjs/Observable";
import { Profile } from '../../models/profile/profile.interface';
import { NavController } from 'ionic-angular';
import { DataService } from '../../providers/data-service/data-service';
import { Subscription } from 'rxjs/Subscription';

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
export class LastMessagesListComponent implements OnInit, OnDestroy{

  userProfile: Profile;
  userProfile$: Subscription;
  messageList: Observable<ChatMessage[]>;
  constructor(private chat: ChatService, private navCtrl: NavController, private data: DataService) {
    this.userProfile$ = this.data.getAuthenticatedUserProfile().subscribe(profile => {
      this.userProfile = profile;
    })
  }


  ngOnInit() {
    this.messageList = this.chat.getLastMessages();
    console.log(this.messageList);
  }
  openMessage(message: ChatMessage) {
    console.log(message);
    if(this.checkMessage(message)) {
      const profile: Profile = {
        $key: message.userId,
        firstName: message.userFromProfile.firstName,
        lastName: message.userFromProfile.lastName,
        numberOfAnswers: message.userFromProfile.numberOfAnswers,
        numberOfQuestions: message.userFromProfile.numberOfQuestions,
        numberOfTutorRequests: message.userFromProfile.numberOfTutorRequests,
        major: message.userFromProfile.major,
        email: message.userFromProfile.email,
        degreeType: message.userFromProfile.degreeType,
        classification: message.userFromProfile.classification,
        dateOfBirth: message.userFromProfile.dateOfBirth
      };
      this.navCtrl.push('Chat', {profile});
    }
    else {
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
      };
      this.navCtrl.push('Chat', {profile});
    }
    
  }

  // check who sent the last message to display correctly
  checkMessage(message: ChatMessage) {

    if (message.toUserId === this.userProfile.$key) {
      return true;
    }
    return false;
  }
  ngOnDestroy() {
    this.userProfile$.unsubscribe();
  }
}
