import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, ToastController } from 'ionic-angular';
import { dataService } from '../../providers/data-service';
import { Http, Response } from '@angular/http';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Camera, CameraOptions } from '@ionic-native/camera';

@Component({
  selector: 'page-newItem',
  templateUrl: 'newItem.html'
})
export class NewItemPage {
  imageURI: any;
  imageFileName: any;

  todo = {
    "title": "",
    "description": "",
    "category": "",
    "priority": 1
  }
  config: any;
  color: any;
  imageChosen: any = 0;
  imagePath: any;

  constructor(public navCtrl: NavController,
    public dataservice: dataService,
    public alertCtrl: AlertController,
    private http: Http,
    private transfer: FileTransfer,
    private camera: Camera,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController) {

    this.color = localStorage.getItem('back_color');
    this.initialList()
      .subscribe(res => {
        this.config = res;
      });
  }

  initialList() {
    let apiUrl = 'assets/data/config.json';
    return this.http.get(apiUrl)
      .map((response: Response) => {
        const data = response.json();
        return data;
      });
  }

  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Success',
      subTitle: 'New Item Added',
      buttons: ['OK']
    });
    alert.present();
  }

  logForm() {
    console.log(this.todo)
    this.dataservice.createItem(this.todo).then((res) => {
      this.uploadFile();
      this.todo.title = null;
      this.todo.description = null;
      this.todo.category = null;
      this.todo.priority = 1;
      //this.showAlert();
    })
  }

  getImage() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }

    this.camera.getPicture(options).then((imageData) => {
      this.imageURI = imageData;
      this.imageChosen = 1;
    }, (err) => {
      console.log(err);
      this.presentToast(err);
    });
  }

  uploadFile() {
    let loader = this.loadingCtrl.create({
      content: "Uploading..."
    });
    loader.present();
    const fileTransfer: FileTransferObject = this.transfer.create();

    let options: FileUploadOptions = {
      fileKey: 'ionicfile',
      fileName: 'ionicfile',
      chunkedMode: false,
      mimeType: "image/jpeg",
      headers: {}
    }

    fileTransfer.upload(this.imageURI, 'http://10.0.2.2:8080/api/uploadImage', options)
      .then((data) => {
        console.log(data + " Uploaded Successfully");
        this.imageFileName = "http://192.168.0.7:8080/static/images/ionicfile.jpg"
        loader.dismiss();
        this.presentToast("New Item Added successfully");
      }, (err) => {
        console.log(err);
        loader.dismiss();
        this.presentToast(err);
      });
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
    toast.present();
  }

  download() {
    const fileTransfer: FileTransferObject = this.transfer.create();
    const url = 'http://www.example.com/file.pdf';
    fileTransfer.download(url, 'this.file.dataDirectory '+ 'file.pdf').then((entry) => {
      console.log('download complete: ' + entry.toURL());
    }, (error) => {
      // handle error
    });
  }

}
