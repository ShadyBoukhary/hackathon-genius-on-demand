import { Component } from '@angular/core';
import { Profile } from '../../models/profile/profile.interface';
import { DataService } from '../../providers/data-service/data-service';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'search-users',
  templateUrl: 'search-users.html'
})
export class SearchUsersComponent {

  query: string;
  profileList: Profile[]; 
  constructor(private data: DataService, private navCtrl: NavController) {
    console.log('Hello SearchUsersComponent Component');
  }


  searchUser(query: string) {
    const trimmedQuery = query.trim();

    if (trimmedQuery === query)
    {
      this.data.search(query).subscribe((profiles) => {
        this.profileList = profiles;
      });
      console.log(this.profileList);
    }
    
  } 
  

  openChat(profile: Profile) {
    this.navCtrl.push('Chat', {profile});
  }

}
