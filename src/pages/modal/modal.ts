import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';

@Component({
    selector: 'sample-modal',
    templateUrl: 'modal.html'
})
export class SampleModalPage {
    item: object = this.navParams.data;
    constructor(public viewCtrl: ViewController, public navParams: NavParams) {
        
    }

    closeModal() {
        this.viewCtrl.dismiss();
    }
}