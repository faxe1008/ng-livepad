import { Component, ElementRef, QueryList, ViewChild  } from '@angular/core';
import { CanvasWhiteboardComponent, CanvasWhiteboardUpdate } from 'ng2-canvas-whiteboard';
import { LivePadService } from '../../services/livepad.service';
import { Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { MqttService } from 'ngx-mqtt';

@Component({
  selector: 'drawing-canvas',
  templateUrl: './drawing-canvas.component.html',
  viewProviders: [CanvasWhiteboardComponent],
  styleUrls: ['./drawing-canvas.component.css']
})
export class DrawingCanvas{
  private livePadService : LivePadService;
  private mqttService : MqttService;

  @ViewChild(CanvasWhiteboardComponent, { read: ElementRef }) canvasElement:ElementRef; 
  @ViewChild('canvasWhiteboard') canvas:CanvasWhiteboardComponent; 

  constructor(public _livePadService : LivePadService, private _mqttService : MqttService){
    this.livePadService = _livePadService;
    this.mqttService = _mqttService;
  }

  sendBatchUpdate(updates: CanvasWhiteboardUpdate[]){

  }

  fullScreenCanvas() {
    console.log(this.canvasElement);
    if (this.canvasElement.nativeElement.requestFullscreen) {
      this.canvasElement.nativeElement.requestFullscreen();
    } else if (this.canvasElement.nativeElement.mozRequestFullScreen) {
      /* Firefox */
      this.canvasElement.nativeElement.mozRequestFullScreen();
    } else if (this.canvasElement.nativeElement.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      this.canvasElement.nativeElement.webkitRequestFullscreen();
    } else if (this.canvasElement.nativeElement.msRequestFullscreen) {
      /* IE/Edge */
      this.canvasElement.nativeElement.msRequestFullscreen();
    }
  }

  downloadImage(){
    this.canvas.downloadCanvasImage("image/png", null, "customFileName");
  }

}
