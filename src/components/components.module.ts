import { NgModule } from '@angular/core';
import { EditProfileFormComponent } from './edit-profile-form/edit-profile-form';
import { FormsModule } from '@angular/forms';
import { IonicModule } from 'ionic-angular';
@NgModule({
	declarations: [EditProfileFormComponent],
	imports: [FormsModule,
		IonicModule],
	exports: [EditProfileFormComponent]
})
export class ComponentsModule {}
