import { Component, OnInit, Input } from '@angular/core';
import { LivePadService } from '../../services/livepad.service';
import { MatExpansionPanel } from '@angular/material/expansion';
import { User } from '../../model/user';

@Component({
  selector: 'app-user-display',
  templateUrl: './user-display.component.html',
  viewProviders: [MatExpansionPanel],
  styleUrls: ['./user-display.component.css']
})
export class UserDisplayComponent implements OnInit {


  @Input() drawingRestrictable: boolean = false;

  constructor(public livePadService: LivePadService) {
  }

  ngOnInit() {
  }

}
