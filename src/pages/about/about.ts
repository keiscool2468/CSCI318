import { Component } from '@angular/core';
import { 
  NavController,
  ViewController,
  NavParams
} from 'ionic-angular';
import _ from 'lodash';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  task: any;
  tasks:any = [];
  people: any= [];

  constructor(
    public navCtrl: NavController,
    public params: NavParams,
    public viewCtrl: ViewController,
    private storage: Storage
  ) {
      this.task = this.params.get('tasked');
      this.tasks = this.params.get('tasksed');
      this.people = this.params.get('peopled');
  }
  editTask() {
      _.pull(this.tasks, this.task);
      this.tasks.unshift(this.task)
      this.storage.set('tasks', this.tasks);
      this.navCtrl.pop();
  }
}
