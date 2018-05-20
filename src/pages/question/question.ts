import { Component, OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { Question } from '../../models/question/question.interface';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { DataService } from '../../providers/data-service/data-service';
import { Subscription } from 'rxjs/Subscription';
import { User, storage } from 'firebase/app';
import { Profile } from '../../models/profile/profile.interface';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ActionSheetController } from 'ionic-angular';


/**
 * Generated class for the QuestionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-question',
  templateUrl: 'question.html',
})
export class QuestionPage implements OnDestroy {

  question = {} as Question;
  authenticatedUser$: Subscription;
  authenticatedUserProfile$: Subscription;
  authenticatedUserProfile: Profile;
  imageData: string;
  base64Image: string[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthServiceProvider,
    private data: DataService, private toast: ToastController,
    private transfer: FileTransfer, private camera: Camera,
    private loadingCtrl: LoadingController,
    private actionSheetCtrl: ActionSheetController) {
    this.authenticatedUser$ = this.auth.getAutenticatedUser().subscribe(user => {
      this.question.from = user.uid;
    });
    this.authenticatedUserProfile$ = this.data.getAuthenticatedUserProfile().subscribe(profile => {
      this.authenticatedUserProfile = profile;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuestionPage');
  }
  async submit() {
    this.question.time = new Date();
    this.question.fromProfile = this.authenticatedUserProfile;

    // if question contains attachments
    if (this.base64Image.length > 0) {

      this.question.images = [];

      // generate IDs for images and store a reference in the question
      this.base64Image.forEach((image) => {
        const imageURL: string = this.generateUUID();
        this.question.images.push(imageURL);
      });

    }


    // upload question
    const response = await this.data.saveQuestion(this.question);
    // if question was uploaded, upload the images
    if (response) {
      if (this.base64Image.length > 0) {
        let x = 0;
        this.question.images.forEach((image) => {
          try {
            const imageRef = storage().ref(`questions/${image}`);
            imageRef.putString(this.base64Image[x++], 'data_url');
          }
          catch(error) {
            console.log(error);
            this.toast.create({
              message: error,
              duration: 3000
            }).present();
          }
          
        });
      }

      this.toast.create({
        message: 'Question submitted!',
        duration: 2000
      }).present();
      this.navCtrl.pop();
    }


  }

  async getImage() {
    let camUpload = false;
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Upload image from',
      buttons: [
        {
          text: 'Take photo',
          role: 'camera',
          handler: () => {
            console.log('From Camera upload');
            this.getImageHandler(true);
          }
        },
        {
          text: 'Camera Roll',
          role: 'roll',
          handler: async () => {
            console.log('Camera Roll Upload');
            await this.getImageHandler(false);
          }
        }
      ]
    }).present();


  }
  ngOnDestroy() {
    this.authenticatedUser$.unsubscribe();
    this.authenticatedUserProfile$.unsubscribe();
  }
  async getImageHandler(camUpload: boolean) {
    let options: CameraOptions;
    if (!camUpload) {
      options = {
        quality: 100,
        destinationType: this.camera.DestinationType.DATA_URL,
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
        encodingType: this.camera.EncodingType.JPEG,
        correctOrientation: true,
        targetHeight: 500,
        targetWidth: 500
      };
    }
    else {
      options = {
        quality: 100,
        destinationType: this.camera.DestinationType.DATA_URL,
        sourceType: this.camera.PictureSourceType.CAMERA,
        encodingType: this.camera.EncodingType.JPEG,
        correctOrientation: true,
        targetHeight: 500,
        targetWidth: 500
      };
    }

    try {
      this.imageData = await this.camera.getPicture(options);
      this.base64Image[this.base64Image.length] = `data:image/jpeg;base64,${this.imageData}`;

    }
    catch (error) {
      console.log(error);
      this.toast.create({
        message: error,
        duration: 2000
      }).present();
    }
  }
  private generateUUID(): any {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx'.replace(/[xy]/g, function (c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  }
}
