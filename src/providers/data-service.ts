import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class dataService {

  data: any;

  constructor(public http: Http) {
    this.data = null;
  }

  getItems() {
    return new Promise(resolve => {
      this.http.get('http://localhost:8080/api/items')
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
  }

  createItem(item) {
    return new Promise(resolve => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.http.post('http://localhost:8080/api/items', JSON.stringify(item), { headers: headers })
        .subscribe(res => {
          console.log(res.json());
          resolve(res.json());
        });
    });
  }

  deleteItem(id) {
    return new Promise(resolve => {
      this.http.delete('http://localhost:8080/api/items/' + id)
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
  }

  getPersons() {
    return new Promise(resolve => {
      this.http.get('http://localhost:8080/api/persons')
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
  }

  addPerson(person) {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.http.post('http://localhost:8080/api/persons', JSON.stringify(person), { headers: headers })
        .subscribe(res => {
          console.log(res.json());
        });
  }

}