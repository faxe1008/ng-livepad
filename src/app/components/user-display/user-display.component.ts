import { Component, OnInit } from '@angular/core';
import { LivePadService } from '../../services/livepad.service';
import { MatExpansionPanel } from '@angular/material/expansion';
import { User } from '../../model/user';

@Component({
  selector: 'user-display',
  templateUrl: './user-display.component.html',
  viewProviders: [MatExpansionPanel],
  styleUrls: ['./user-display.component.css']
})
export class UserDisplayComponent implements OnInit {

  public livePadService : LivePadService;

  constructor(public _livePadService : LivePadService){
    this.livePadService = _livePadService;
  }

  ngOnInit() {
  }

}
