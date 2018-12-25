import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { DrawingCanvasComponent } from '../drawing-canvas/drawing-canvas.component';

export interface DialogData {
  qrcontent: string;
}

@Component({
  selector: 'app-qrcode-dialog',
  templateUrl: './qrcode-dialog.component.html',
  styleUrls: ['./qrcode-dialog.component.css']
})
export class QrcodeDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DrawingCanvasComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}
