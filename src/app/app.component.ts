import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material';
import { Observable, Subscription } from 'rxjs';
import { MqttService, IMqttMessage, IOnConnectEvent } from 'ngx-mqtt';
import { UUID } from 'angular2-uuid';
import { LivePadService } from './services/livepad.service';
import { User } from './model/user';
import {SnackbarReconnectComponent} from './components/snackbar-reconnect/snackbar-reconnect.component';
import { MatSnackBarConfig } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  private subscription: Subscription;
  private uuid: string;


  constructor(private _mqttService: MqttService, private router: Router, public _livePadService: LivePadService, public snackBar: MatSnackBar){
    
    this.uuid =  UUID.UUID();
    
    _livePadService.uuid = this.uuid;
    this.subscription = this._mqttService.observe(this.uuid + '/join/+').subscribe((message: IMqttMessage) => {
      _livePadService.users.push(new User(message.topic.split("/")[2]));
    });
   
    this._mqttService.onOffline.subscribe(()=>{
        let config = new MatSnackBarConfig();
        config.panelClass = 'snackbarNotification';
        this.snackBar.openFromComponent(SnackbarReconnectComponent, config);
    });

    this._mqttService.onConnect.subscribe(()=>{
      this.snackBar.dismiss();
    })

  }
}
