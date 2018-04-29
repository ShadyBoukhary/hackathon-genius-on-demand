import { NgModule } from '@angular/core';
import { EditProfileFormComponent } from './edit-profile-form/edit-profile-form';
import { FormsModule } from '@angular/forms';
import { IonicModule } from 'ionic-angular';
import { OnlineUsersComponent } from './online-users/online-users';
@NgModule({
	declarations: [EditProfileFormComponent,
    OnlineUsersComponent,
    ],
	imports: [FormsModule,
		IonicModule],
	exports: [EditProfileFormComponent,
    OnlineUsersComponent,
    ]
})
export class ComponentsModule {}
