import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import { Events, Content } from 'ionic-angular';
import { ChatService, UserInfo } from "../../providers/chat-service";
import { ChatMessage } from '../../models/chat-message/chat-message.interface'
import { Profile } from '../../models/profile/profile.interface';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { DataService } from '../../providers/data-service/data-service';
import { Observable } from "rxjs/Observable";


@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class Chat {

  @ViewChild(Content) content: Content;
  @ViewChild('chat_input') messageInput: ElementRef;
  user: UserInfo;
  toUser: UserInfo;
  editorMsg = '';
  showEmojiPicker = false;
  selectedProfile: Profile;
  userId: string;
  userProfile: Profile;
  messageList: Observable<ChatMessage[]>;

  constructor(private navParams: NavParams,
              private chatService: ChatService,
              private events: Events,
              private auth: AuthServiceProvider,
              private data: DataService) {
    // Get the navParams toUserId parameter
    this.toUser = {
      id: navParams.get('toUserId'),
      name: navParams.get('toUserName')
    };
    // Get mock user information
    this.chatService.getUserInfo()
    .then((res) => {
      this.user = res
    });
  }

  ionViewWillLeave() {
    // unsubscribe
    this.events.unsubscribe('chat:received');
  }

  ionViewDidEnter() {
    //get message list
    //this.getMsg();

    // Subscribe to received  new message events
    this.events.subscribe('chat:received', msg => {
      //this.pushNewMsg(msg);
    })
  }
  ionViewWillLoad() {
    this.selectedProfile = this.navParams.get('profile');
    console.log(this.selectedProfile);
    this.auth.getAutenticatedUser()
    .subscribe(auth => this.userId = auth.uid);
    this.data.getAuthenticatedUserProfile()
    .subscribe(profile => this.userProfile = profile);
    console.log('getting msgs');
    this.messageList = this.chatService.getChats(this.selectedProfile.$key);
    this.scrollToBottom();
  }

  async sendMessage(content: string) {

    try {
      
      const message: ChatMessage = {
        message: content,
        toUserId: this.selectedProfile.$key,
        userToProfile: {
          firstName: this.selectedProfile.firstName,
          lastName: this.selectedProfile.lastName,
          classification: this.selectedProfile.classification,
          major: this.selectedProfile.classification,
          degreeType: this.selectedProfile.degreeType,
          dateOfBirth: this.selectedProfile.dateOfBirth,
          email: this.selectedProfile.email,
          numberOfAnswers: this.selectedProfile.numberOfAnswers,
          numberOfQuestions: this.selectedProfile.numberOfQuestions,
          numberOfTutorRequests: this.selectedProfile.numberOfTutorRequests
        },
        userId: this.userId,
        userFromProfile: {
          firstName: this.userProfile.firstName,
          lastName: this.userProfile.lastName,
          classification: this.userProfile.classification,
          major: this.userProfile.classification,
          degreeType: this.userProfile.degreeType,
          dateOfBirth: this.userProfile.dateOfBirth,
          email: this.userProfile.email,
          numberOfAnswers: this.userProfile.numberOfAnswers,
          numberOfQuestions: this.userProfile.numberOfQuestions,
          numberOfTutorRequests: this.userProfile.numberOfTutorRequests
        },
        time: new Date()
      }
      console.log(message);
      await this.chatService.sendMessage(message);
      this.scrollToBottom();
    } catch (error) {
      console.log(error);
    }
  }
  onFocus() {
    this.showEmojiPicker = false;
    this.content.resize();
    this.scrollToBottom();
  }

  switchEmojiPicker() {
    this.showEmojiPicker = !this.showEmojiPicker;
    if (!this.showEmojiPicker) {
      this.focus();
    } else {
      this.setTextareaScroll();
    }
    this.content.resize();
    this.scrollToBottom();
  }

  // /**
  //  * @name getMsg
  //  * @returns {Promise<ChatMessage[]>}
  //  */
  // getMsg() {
  //   // Get mock message list
  //   return this.chatService
  //   //.getMsgList()
  //   .subscribe(res => {
  //     this.msgList = res;
  //     this.scrollToBottom();
  //   });
  // }

  /**
   */
  // sendMsg() {
  //   if (!this.editorMsg.trim()) return;

  //   // Mock message
  //   const id = Date.now().toString();
  //   let newMsg: ChatMessage = {
  //     messageId: Date.now().toString(),
  //     $userId: this.user.id,
  //     userName: this.user.name,
  //     userAvatar: this.user.avatar,
  //     $toUserId: this.toUser.id,
  //     time: Date.now(),
  //     message: this.editorMsg,
  //     status: 'pending'
  //   };

  //   this.pushNewMsg(newMsg);
  //   this.editorMsg = '';

  //   if (!this.showEmojiPicker) {
  //     this.focus();
  //   }

  //   this.chatService.sendMsg(newMsg)
  //   //.then(() => {
  //     let index = this.getMsgIndexById(id);
  //     if (index !== -1) {
  //       this.msgList[index].status = 'success';
  //     //}
  //   }//)
  // }

  /**
   * @name pushNewMsg
   * @param msg
   */
  // pushNewMsg(msg: ChatMessage) {
  //   const userId = this.user.id,
  //     toUserId = this.toUser.id;
  //   // Verify user relationships
  //   if (msg.$userId === userId && msg.$toUserId === toUserId) {
  //     this.msgList.push(msg);
  //   } else if (msg.$toUserId === userId && msg.$userId === toUserId) {
  //     this.msgList.push(msg);
  //   }
  //   this.scrollToBottom();
  // }

  // getMsgIndexById(id: string) {
  //   return this.msgList.findIndex(e => e.messageId === id)
  // }

  scrollToBottom() {
    setTimeout(() => {
      if (this.content.scrollToBottom) {
        this.content.scrollToBottom();
      }
    }, 400)
  }

  private focus() {
    if (this.messageInput && this.messageInput.nativeElement) {
      this.messageInput.nativeElement.focus();
    }
  }

  private setTextareaScroll() {
    const textarea =this.messageInput.nativeElement;
    textarea.scrollTop = textarea.scrollHeight;
  }
}