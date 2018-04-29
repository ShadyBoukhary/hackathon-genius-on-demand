import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { map } from 'rxjs/operators/map';
//import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { ChatMessage } from '../models/chat-message/chat-message.interface'
import { DataService } from './data-service/data-service';
import { FirebaseObjectObservable, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { User, database } from 'firebase/app';
import { AuthServiceProvider } from './auth-service/auth-service';
import 'rxjs/add/operator/first';
import 'rxjs/add/observable/forkJoin';

export class UserInfo {
  id: string;
  name?: string;
  avatar?: string;
}

@Injectable()
export class ChatService {

  constructor(private auth:AuthServiceProvider, private events: Events, private database: AngularFireDatabase) {
  }


  
  async sendMessage(message: ChatMessage) {
    console.log(message);
    await this.database.list(`/messages`).push(message);
  }

  getChats(userToId: string) {
    return this.auth.getAutenticatedUser()
    .map(auth => auth.uid)
    .mergeMap(uid => this.database.list(`/user-messages/${uid}/${userToId}`))
    .mergeMap(chats => {
      return Observable.forkJoin(
        chats.map(chat => this.database.object(`/messages/${chat.$key}`)
      .first()),
      (...vals: ChatMessage[]) => {
        return vals;
      }
      )
    })
  }

  getUserInfo(): Promise<UserInfo> {
    const userInfo: UserInfo = {
      id: '140000198202211138',
      name: 'Luff',
      avatar: './assets/user.jpg'
    };
    return new Promise(resolve => resolve(userInfo));
  }



}