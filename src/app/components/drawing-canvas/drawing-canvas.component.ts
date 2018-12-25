import { Component, ElementRef, QueryList, ViewChild  } from '@angular/core';
import { CanvasWhiteboardComponent, CanvasWhiteboardUpdate, CanvasWhiteboardService } from 'ng2-canvas-whiteboard';
import { LivePadService } from '../../services/livepad.service';
import { Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { MqttService, IMqttMessage } from 'ngx-mqtt';
import { MatDialog } from '@angular/material';
import { User } from '../../model/user';
import { QrcodeDialogComponent } from '../qrcode-dialog/qrcode-dialog.component';

@Component({
  selector: 'app-drawing-canvas',
  templateUrl: './drawing-canvas.component.html',
  viewProviders: [CanvasWhiteboardComponent],
  styleUrls: ['./drawing-canvas.component.css']
})
export class DrawingCanvasComponent {
 

  @ViewChild('canvasContainer', {read : ElementRef}) canvasContainer: ElementRef;
  @ViewChild('canvasWhiteboard') canvas: CanvasWhiteboardComponent; 

  constructor(public livePadService: LivePadService,
              public dialog: MatDialog,
              private mqttService: MqttService, 
              private canvasWhiteboardService: CanvasWhiteboardService) {


    this.mqttService.observe(livePadService.uuid + '/draw/#').subscribe((message: IMqttMessage) => {
      const user = this.livePadService.getUserByName(message.topic.split('/')[2]);
      const plainMessage = message.payload.toString();
      const update = CanvasWhiteboardUpdate.deserializeJson(plainMessage);
      
      update.selectedShapeOptions.fillStyle = user.color;
      update.selectedShapeOptions.strokeStyle = user.color;
  
      this.canvasWhiteboardService.drawCanvas([update]);

    });

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
