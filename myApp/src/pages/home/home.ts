import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {AboutPage} from '../about/about';
import {IBeacon} from '@ionic-native/ibeacon';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  delegate:any;
  region:any;

  ChangePage() {
    this.navCtrl.setRoot(AboutPage);
  }

  constructor(public navCtrl: NavController, private ibeacon: IBeacon) {

  }

  initScanner() {

    this.delegate.didRangeBeaconsInRegion()
      .subscribe(
        data => console.log('didRangeBeaconsInRegion: ', data),
        error => console.error()
      );
    this.delegate.didStartMonitoringForRegion()
      .subscribe(
        data => console.log('didStartMonitoringForRegion: ', data),
        error => console.error()
      );
    this.delegate.didEnterRegion()
      .subscribe(
        data => {
          console.log('didEnterRegion: ', data);
        }
      );

    let beaconRegion = this.ibeacon.BeaconRegion('Kontakt', 'f7826da6-4fa2-4e98-8024-bc5b71e0893e');

    this.ibeacon.startMonitoringForRegion(beaconRegion)
      .then(
        () => console.log('Native layer recieved the request to monitoring'),
        error => console.error('Native layer failed to begin monitoring: ', error)
      );


  }
}




