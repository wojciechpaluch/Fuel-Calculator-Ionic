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

    var logToDom = function (message) {
      var e = document.createElement('label');
      e.innerText = message;

      var br = document.createElement('br');
      var br2 = document.createElement('br');
      document.body.appendChild(e);
      document.body.appendChild(br);
      document.body.appendChild(br2);

      window.scrollTo(0, window.document.height);
    };

    var delegate = new cordova.plugins.locationManager.Delegate();

    delegate.didDetermineStateForRegion = function (pluginResult) {

      logToDom('[DOM] didDetermineStateForRegion: ' + JSON.stringify(pluginResult));

      cordova.plugins.locationManager.appendToDeviceLog('[DOM] didDetermineStateForRegion: '
        + JSON.stringify(pluginResult));
    };

    delegate.didStartMonitoringForRegion = function (pluginResult) {
      console.log('didStartMonitoringForRegion:', pluginResult);

      logToDom('didStartMonitoringForRegion:' + JSON.stringify(pluginResult));
    };

    delegate.didRangeBeaconsInRegion = function (pluginResult) {
      logToDom('[DOM] didRangeBeaconsInRegion: ' + JSON.stringify(pluginResult));
    };

    var uuid = '00000000-0000-0000-0000-000000000000';
    var identifier = 'beaconOnTheMacBooksShelf';
    var minor = 1000;
    var major = 5;
    var beaconRegion = new cordova.plugins.locationManager.BeaconRegion(identifier, uuid, major, minor);

    cordova.plugins.locationManager.setDelegate(delegate);

// required in iOS 8+
    cordova.plugins.locationManager.requestWhenInUseAuthorization();
// or cordova.plugins.locationManager.requestAlwaysAuthorization()

    cordova.plugins.locationManager.startRangingBeaconsInRegion(beaconRegion)
      .fail(function(e) { console.error(e); })
      .done();

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

    let beaconRegion = this.ibeacon.BeaconRegion('Kontakt', 'F7826DA6-4FA2-4E98-8024-BC5B71E0893E', 16396, 54173);

    this.ibeacon.startMonitoringForRegion(beaconRegion)
      .then(
        () => console.log('Native layer recieved the request to monitoring'),
        error => console.error('Native layer failed to begin monitoring: ', error)
      );


  }
}




