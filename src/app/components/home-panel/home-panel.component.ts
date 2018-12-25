import { Component  } from '@angular/core';
import { LivePadService } from '../../services/livepad.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-panel',
  templateUrl: './home-panel.component.html',
  styleUrls: ['./home-panel.component.css']
})

export class HomePanelComponent {
  public qrcontent: string;

  constructor(public livePadService: LivePadService, private router: Router) {
    this.qrcontent = this.livePadService.uuid + '|' + this.livePadService.encryptionKey;
  }
 
  navDraw() {
    this.router.navigate(['draw']);
  }

}
