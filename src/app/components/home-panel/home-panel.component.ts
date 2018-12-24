import { Component  } from '@angular/core';
import { LivePadService } from '../../services/livepad.service';
import { Router } from '@angular/router';

@Component({
  selector: 'home-panel',
  templateUrl: './home-panel.component.html',
  styleUrls: ['./home-panel.component.css']
})

export class HomePanel{
  public qrcontent: string;
  public livePadService: LivePadService;
  public router : Router;

  constructor(public _livePadService : LivePadService,
              private _router: Router){
    this.livePadService = _livePadService;
    this.router = _router;
    this.qrcontent = this.livePadService.uuid;
  }
 
  navDraw(){
    this.router.navigate(['draw']);
  }

}
