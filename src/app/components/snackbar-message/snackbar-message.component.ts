import { Component, OnInit, Inject } from '@angular/core';
import {MAT_SNACK_BAR_DATA} from '@angular/material';


@Component({
  selector: 'app-snackbar-message',
  templateUrl: './snackbar-message.component.html',
  styleUrls: ['./snackbar-message.component.css']
})
export class SnackbarMessageComponent implements OnInit {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {

  }

  ngOnInit() {
  }

}
