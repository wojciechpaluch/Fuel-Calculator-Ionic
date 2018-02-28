import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';


@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  Quotient() {

    this.querySelector(".specyfic .selector #to-range").value / document.querySelector(".other .selector #to-number").value;

  }

  constructor(public navCtrl: NavController) {


  }

}
