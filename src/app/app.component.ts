import { Component, NgZone } from '@angular/core';
import { Platform,NavController } from '@ionic/angular';
import { Shake } from '@ionic-native/shake/ngx';
import { BackgroundMode } from '@ionic-native/background-mode/ngx/index';
import { Device } from '@ionic-native/device/ngx';
import { App } from '@capacitor/app';
import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion/ngx';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    public platform: Platform,
    public shake: Shake,
    public navCtrl: NavController,
    public device: Device,
    public ngZone: NgZone,
    public backgroundMode: BackgroundMode,
    public deviceMotion: DeviceMotion
  ) {
    this.initializeApp();
  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.shakeInit();
      this.motionInit();
      App.addListener('appStateChange', ({ isActive }) => {
        if(isActive){
          this.backgroundMode.disable();
        }else{
          this.backgroundMode.enable();
          this.shakeInit();
        }
      });
    });
  }
  shakeInit(){
    console.log('shake',this.shake);
   this.shake.startWatch(40).subscribe((res) => {
      console.log('shake implememented',res);
      },err =>{
        console.log('shake implememented error',err);
      });
  }
  motionInit(){
    this.deviceMotion.getCurrentAcceleration().then(
      (acceleration: DeviceMotionAccelerationData) => console.log(acceleration),
      (error: any) => console.log(error)
    );
    const subscription = this.deviceMotion.watchAcceleration().subscribe((acceleration: DeviceMotionAccelerationData) => {
      console.log(acceleration);
    });
    // Stop watch
    subscription.unsubscribe();
  }
}
