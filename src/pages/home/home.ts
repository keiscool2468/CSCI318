import { Component } from '@angular/core';
import {
  NavController,
  LoadingController,
  ModalController
} from 'ionic-angular';
import { Observable} from 'rxjs/Rx';
import { Storage } from '@ionic/storage';
import _ from 'lodash';
import { AboutPage } from '../about/about';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  todo = {};
  tasks: any = [];
  people: any= [];

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    private storage: Storage,
    public modalCtrl: ModalController
  ) {
  }


  ionViewDidLoad() {
    let loader = this.loadingCtrl.create({
      content: 'Fetching the Tasks...'
    });
    loader.present().then(() => {
      Observable.forkJoin(
        this.storage.get('tasks'),
        this.storage.get('people')
      ).subscribe( data => {
          this.tasks = _.values(data[0]);
          this.people = _.values(data[1]);
          console.log(this.people);
          console.log(this.tasks);
          loader.dismiss();
        });
    }),
    err => {
      console.error(err);
    }
  }
  doRefresh(refresher) {
    setTimeout(() => {
      this.storage.get('people').then(data =>{
        this.people = data;
      })
      refresher.complete();
    }, 500);
  }
  createTask() {
    if(this.tasks){
      this.tasks.push(this.todo);
    } else {
      this.tasks[0] = this.todo;
    }
    this.storage.set('tasks', this.tasks);
    this.todo = {};
  }
  done(task: Object){
    console.log(task);
    _.pull(this.tasks, task)
    this.storage.set('tasks', this.tasks);
  }
  edit(tasks, task: Object){
    console.log(task);
      this.navCtrl.push(AboutPage, {tasksed: tasks, tasked: task, peopled: this.people });
  }
}
