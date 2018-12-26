import { Component  } from '@angular/core';
import { LivePadService } from '../../services/livepad.service';
import { Router } from '@angular/router';
import { MqttService } from 'ngx-mqtt';

@Component({
  selector: 'app-home-panel',
  templateUrl: './home-panel.component.html',
  styleUrls: ['./home-panel.component.css']
})

export class HomePanelComponent {
  public qrcontent: string;

  constructor(public livePadService: LivePadService, private mqttService: MqttService,  private router: Router) {
    this.qrcontent = this.livePadService.uuid + '|' + this.livePadService.encryptionKey;
  }
 
  navDraw() {
    this.mqttService.unsafePublish(this.livePadService.uuid + "/start", "");
    this.router.navigate(['draw']);

  }

}
