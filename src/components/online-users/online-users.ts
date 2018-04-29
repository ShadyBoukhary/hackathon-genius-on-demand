import { Component, OnInit } from '@angular/core';
import { DataService } from '../../providers/data-service/data-service';
import { FirebaseListObservable } from 'angularfire2/database-deprecated';
import { Profile } from '../../models/profile/profile.interface';
import { NavController } from 'ionic-angular';

/**
 * Generated class for the OnlineUsersComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'online-users',
  templateUrl: 'online-users.html'
})
export class OnlineUsersComponent implements OnInit {

  userList: FirebaseListObservable<Profile[]>;
  constructor(private data: DataService, private navCtrl: NavController) {
    console.log('Hello OnlineUsersComponent Component');
  }

  setUserOnline() {
    this.data.getAuthenticatedUserProfile().subscribe(profile => {
      this.data.setUserOnline(profile);
    })
  }

  getOnlineUsers() {
    this.userList = this.data.getOnlineUsers();
  }

  openChat(profile: Profile) {
    this.navCtrl.push('Chat', {profile});
  }
  ngOnInit() {
    this.setUserOnline();
    this.getOnlineUsers();
  }
}
