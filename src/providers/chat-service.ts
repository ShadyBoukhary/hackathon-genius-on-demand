import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { map } from 'rxjs/operators/map';
import { Observable } from "rxjs/Observable";
import { ChatMessage } from '../models/chat-message/chat-message.interface'
import { DataService } from './data-service/data-service';
import { FirebaseObjectObservable, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { User, database } from 'firebase/app';
import { AuthServiceProvider } from './auth-service/auth-service';
import 'rxjs/add/operator/first';
import 'rxjs/add/observable/forkJoin';


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

  getLastMessages(): Observable<ChatMessage[]> {
    return this.auth.getAutenticatedUser()
    .map(auth => auth.uid)
    .mergeMap(authId => this.database.list(`/last-messages/${authId}`))
    .mergeMap(messageIds => {
      return Observable.forkJoin(
        messageIds.map(message => {
          return this.database.object(`/messages/${message.key}`)
          .first()
        }),
        (...values) => {
          console.log(values);
          return values;
        }
      )
    })
  }


}