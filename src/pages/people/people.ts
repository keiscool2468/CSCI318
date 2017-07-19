import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Storage } from '@ionic/storage';
import _ from 'lodash';
/**
 * Generated class for the People page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-people',
  templateUrl: 'people.html',
})
export class People {
  person = {};
  people: any = [];

  constructor(
    public navCtrl: NavController,
    private storage: Storage,
    public navParams: NavParams
  ) {
    this.storage.get('people').then( data =>{
      if(data){
        this.people = data;
      }
    })
  }

  createPeople() {
    // if(this.people){
      this.people.push(this.person);
    // } else {
      // this.people[0] = this.person
    // }
    this.storage.set('people', this.people);
    // this.person.name = null;
  }
  delete(person: Object){
    console.log(person);
    _.pull(this.people, person)
    this.storage.set('people', this.people);
  }
}
