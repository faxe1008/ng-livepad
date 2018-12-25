import { Component, ViewEncapsulation, ContentChild } from '@angular/core';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material';
import { Observable, Subscription } from 'rxjs';
import { MqttService, IMqttMessage, IOnConnectEvent } from 'ngx-mqtt';
import { LivePadService } from './services/livepad.service';
import { User } from './model/user';
import {SnackbarMessageComponent} from './components/snackbar-message/snackbar-message.component';
import { MatSnackBarConfig } from '@angular/material';
import { CanvasWhiteboardComponent } from 'ng2-canvas-whiteboard';
import { DrawingCanvasComponent } from './components/drawing-canvas/drawing-canvas.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DrawingCanvasComponent],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {

  private subscription: Subscription;


  constructor(private mqttService: MqttService,
              private router: Router, 
              public livePadService: LivePadService, 
              public snackBar: MatSnackBar) {
    
                
    this.subscription = this.mqttService.observe(livePadService.uuid + '/join/+').subscribe((message: IMqttMessage) => {
      const requestingUser = new User(message.topic.split('/')[2]);
      livePadService.joinUser(requestingUser);

      this.snackBar.openFromComponent(SnackbarMessageComponent,  {
        panelClass : 'snackbarNotification',
        duration: 3000,
        data : { message : 'User ' + requestingUser.name + ' has joined!', type: 'info'}
      });
    });
   
    this.mqttService.onOffline.subscribe(() => {
        this.snackBar.openFromComponent(SnackbarMessageComponent,  {
          panelClass : 'snackbarNotification',
          data : { message : 'Reconnecting ...', type: 'wait'}
        });
    });

    this.mqttService.onConnect.subscribe(() => {
      this.snackBar.dismiss();
    });    
  }
}
