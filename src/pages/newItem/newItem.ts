import { Component } from '@angular/core';
import { NavController,AlertController } from 'ionic-angular';
import { dataService } from '../../providers/data-service';
import { Http, Response } from '@angular/http';

@Component({
  selector: 'page-newItem',
  templateUrl: 'newItem.html'
})
export class NewItemPage {
  todo = {
    "title" : "",
    "description" : "",
    "category" : "",
    "priority" : 1
  }
  config: any;
  color: any;

  constructor(public navCtrl: NavController, public dataservice : dataService,public alertCtrl: AlertController, private http: Http) {
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
      this.todo.title = null;
      this.todo.description = null;
      this.todo.category = null;
      this.todo.priority = 1;
      this.showAlert();
    })
  }

}
