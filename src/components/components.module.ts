import { NgModule } from '@angular/core';
import { EditProfileFormComponent } from './edit-profile-form/edit-profile-form';
import { FormsModule } from '@angular/forms';
import { IonicModule } from 'ionic-angular';
import { OnlineUsersComponent } from './online-users/online-users';
import { LastMessagesListComponent } from './last-messages-list/last-messages-list';
import { ProfileViewComponent } from './profile-view/profile-view';
import { SearchUsersComponent } from './search-users/search-users';
import { AttachmetnsComponent } from './attachmetns/attachmetns';
@NgModule({
	declarations: [EditProfileFormComponent,
    OnlineUsersComponent,
    LastMessagesListComponent,
    ProfileViewComponent,
    SearchUsersComponent,
    AttachmetnsComponent,
    ],
	imports: [FormsModule,
		IonicModule],
	exports: [EditProfileFormComponent,
    OnlineUsersComponent,
    LastMessagesListComponent,
    ProfileViewComponent,
    SearchUsersComponent,
    AttachmetnsComponent,
    ]
})
export class ComponentsModule {}
