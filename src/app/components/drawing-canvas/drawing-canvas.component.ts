import { Component, ElementRef, QueryList, ViewChild ,OnInit } from '@angular/core';
import { CanvasWhiteboardComponent, CanvasWhiteboardUpdate, CanvasWhiteboardService } from 'ng2-canvas-whiteboard';
import { LivePadService } from '../../services/livepad.service';
import { Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { MqttService, IMqttMessage } from 'ngx-mqtt';
import { MatDialog } from '@angular/material';
import { User } from '../../model/user';
import { QrcodeDialogComponent } from '../qrcode-dialog/qrcode-dialog.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-drawing-canvas',
  templateUrl: './drawing-canvas.component.html',
  viewProviders: [CanvasWhiteboardComponent],
  styleUrls: ['./drawing-canvas.component.css']
})
export class DrawingCanvasComponent implements OnInit{
 
  private subscription: Subscription;

  @ViewChild('canvasContainer', {read : ElementRef}) canvasContainer: ElementRef;
  @ViewChild('canvasWhiteboard') canvas: CanvasWhiteboardComponent; 

  constructor(public livePadService: LivePadService,
              public dialog: MatDialog,
              private mqttService: MqttService, 
              private canvasWhiteboardService: CanvasWhiteboardService) {
    
  }

  ngOnInit(): void {
    this.mqttService.observe(this.livePadService.uuid + '/draw/#').subscribe((message: IMqttMessage) => {
      const user = this.livePadService.getUserByName(message.topic.split('/')[2]);
      const plainMessage = message.payload.toString();
      let updates = JSON.parse(plainMessage) as CanvasWhiteboardUpdate[];
      this.canvasWhiteboardService.drawCanvas(updates);
    });

   this.livePadService.onUserJoined().subscribe(user => {
     this.mqttService.unsafePublish(this.livePadService.uuid + '/join/' + user.name + '/accepted', JSON.stringify(user));
     this.mqttService.unsafePublish(this.livePadService.uuid + '/start', '');

    })
  }

  openQRCodeDialog() {
    const dialogRef = this.dialog.open(QrcodeDialogComponent, {
      width: '500px',
      data: {qrcontent: this.livePadService.uuid + '|' + this.livePadService.encryptionKey}
    });
  }

  sendBatchUpdate(updates: CanvasWhiteboardUpdate[]) {
    console.log(JSON.stringify(updates));
  }

  fullScreenCanvas() {
    console.log(this.canvasContainer);
    if (this.canvasContainer.nativeElement.requestFullscreen) {
      this.canvasContainer.nativeElement.requestFullscreen();
    } else if (this.canvasContainer.nativeElement.mozRequestFullScreen) {
      /* Firefox */
      this.canvasContainer.nativeElement.mozRequestFullScreen();
    } else if (this.canvasContainer.nativeElement.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      this.canvasContainer.nativeElement.webkitRequestFullscreen();
    } else if (this.canvasContainer.nativeElement.msRequestFullscreen) {
      /* IE/Edge */
      this.canvasContainer.nativeElement.msRequestFullscreen();
    }
  }

  downloadImage() {
    this.canvas.downloadCanvasImage('image/png', null, 'customFileName');
  }

}
