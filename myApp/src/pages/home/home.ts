import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AboutPage } from '../about/about';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  ChangePage()
  {
    this.navCtrl.setRoot(AboutPage);
  }
  constructor(public navCtrl: NavController) {


  }

}
