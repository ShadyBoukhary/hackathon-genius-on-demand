import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Base64 } from '@ionic-native/base64';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Camera } from '@ionic-native/camera';
import { MyApp } from './app.component';
import { EmojiProvider } from '../providers/emoji';
import { ChatService } from '../providers/chat-service';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { AngularFireModule } from 'angularfire2';
import { AngularFireStorage, AngularFireStorageModule } from 'angularfire2/storage';
import { FIREBASE_CONFIG } from '../firebase-config/app.firebase.config';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database-deprecated';
import { DataService } from '../providers/data-service/data-service';


@NgModule({
  declarations: [
    MyApp,
    
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    EmojiProvider,
    AuthServiceProvider,
    DataService,
    ChatService,
    Base64,
    FileTransfer,
    FileTransferObject,
    File,
    Camera,
  ]
})
export class AppModule {}
