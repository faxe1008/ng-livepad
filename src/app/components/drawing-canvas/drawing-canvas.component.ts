import { Component, ElementRef, QueryList, ViewChild  } from '@angular/core';
import { CanvasWhiteboardComponent, CanvasWhiteboardUpdate, CanvasWhiteboardService, CanvasWhiteboardShapeOptions } from 'ng2-canvas-whiteboard';
import { LivePadService } from '../../services/livepad.service';
import { Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { MqttService, IMqttMessage } from 'ngx-mqtt';
import { User } from '../../model/user';

@Component({
  selector: 'drawing-canvas',
  templateUrl: './drawing-canvas.component.html',
  viewProviders: [CanvasWhiteboardComponent],
  styleUrls: ['./drawing-canvas.component.css']
})
export class DrawingCanvas{
  private livePadService : LivePadService;
  private mqttService : MqttService;

  //@ViewChild(CanvasWhiteboardComponent, { read: ElementRef }) canvasElement:ElementRef; 
  @ViewChild('canvasContainer', {read : ElementRef}) canvasContainer: ElementRef;

  @ViewChild('canvasWhiteboard') canvas:CanvasWhiteboardComponent; 

  constructor(public _livePadService : LivePadService,
              private _mqttService : MqttService, 
              private _canvasWhiteboardService: CanvasWhiteboardService){

    this.livePadService = _livePadService;
    this.mqttService = _mqttService;

    this._mqttService.observe(_livePadService.uuid + "/draw/#").subscribe((message: IMqttMessage)=>{
      let user = this.livePadService.getUserByName(message.topic.split("/")[2]);
      let plainMessage = message.payload.toString();
      let update = CanvasWhiteboardUpdate.deserializeJson(plainMessage);
      
      update.selectedShapeOptions.fillStyle = user.color;
      update.selectedShapeOptions.strokeStyle = user.color;
  
      this._canvasWhiteboardService.drawCanvas([update]);

    })

  }

  sendBatchUpdate(updates: CanvasWhiteboardUpdate[]){
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

  downloadImage(){
    this.canvas.downloadCanvasImage("image/png", null, "customFileName");
  }

}
