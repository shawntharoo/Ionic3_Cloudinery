import { Component, ViewChild } from '@angular/core';
import { Nav } from 'ionic-angular';
import { Http, Response } from '@angular/http';
import { dataService } from '../../providers/data-service';

import { NewItemPage } from '../newItem/newItem';
import { ListPage } from '../list/list';

@Component({
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = ListPage;
  pages: Array<{title: string, component: any, image: string}>;
  config: any;
  personInfo : any;

  constructor(private http: Http, public dataservice : dataService) {

    this.pages = [
      { title: 'All Items', component: ListPage, image: 'mail' },
      { title: 'New Item', component: NewItemPage, image: 'send' }
    ];

  }

  ngOnInit() {
    this.initialList()
    .subscribe(res => {
      this.config = res;
      localStorage.setItem('back_color', this.config.header_color);
    });

    this.dataservice.getPersons().then((res) => {
      this.personInfo = res[0];
    })
  }

  initialList(){
    let apiUrl = 'assets/data/config.json';
    return this.http.get(apiUrl)
    .map( (response: Response) => {
       const data = response.json();
       return data;
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }
}
