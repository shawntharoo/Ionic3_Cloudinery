import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { NewItemPage } from '../pages/newItem/newItem';
import { LoginPage } from '../pages/login/login';
import { ListPage } from '../pages/list/list';
import { SampleModalPage } from '../pages/modal/modal';
import { dataService } from '../providers/data-service';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { WelcomePage } from '../pages/welcome/welcome';
import { SignupPage } from '../pages/signup/signup';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Camera } from '@ionic-native/camera';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    NewItemPage,
    ListPage,
    LoginPage,
    WelcomePage,
    SignupPage,
    SampleModalPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    NewItemPage,
    ListPage,
    LoginPage,
    WelcomePage,
    SignupPage,
    SampleModalPage
  ],
  providers: [
    dataService,
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    FileTransfer,
    FileTransferObject,
    File,
    Camera
  ]
})
export class AppModule { }
