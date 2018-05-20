import { Component, EventEmitter } from '@angular/core';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ActionSheetController, ToastController } from 'ionic-angular';


@Component({
  selector: 'attachmetns',
  templateUrl: 'attachmetns.html'
})
export class AttachmetnsComponent {

  base64Images: string[] = [];
  imageData: string;
  allImages: EventEmitter<string[]>;

  constructor(private camera: Camera, private actionSheetCtrl: ActionSheetController, private toast: ToastController) {
    console.log('Hello AttachmetnsComponent Component');
    this.allImages = new EventEmitter<string[]>();
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
  

  async getImageHandler(camUpload: boolean) {
    let options: CameraOptions;
    if (!camUpload) {
      options = {
        quality: 100,
        destinationType: this.camera.DestinationType.DATA_URL,
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
        encodingType: this.camera.EncodingType.JPEG,
        correctOrientation: true
      };
    }
    else {
      options = {
        quality: 100,
        destinationType: this.camera.DestinationType.DATA_URL,
        sourceType: this.camera.PictureSourceType.CAMERA,
        encodingType: this.camera.EncodingType.JPEG,
        correctOrientation: true
      };
    }
    
    try {
      this.imageData = await this.camera.getPicture(options);
      this.base64Images[this.base64Images.length] = `data:image/jpeg;base64,${this.imageData}`;
    }
    catch(error) {
      console.log(error);
      this.toast.create({
        message: error,
        duration: 2000
      }).present();
    }
  }
}
