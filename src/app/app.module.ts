import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatProgressSpinnerModule, MatInputModule, MatFormFieldModule, MatCardModule, MatIconModule, MatSnackBarModule} from '@angular/material';
import { QRCodeModule } from 'angularx-qrcode';
import { HomePanel } from './components/home-panel/home-panel.component';
import { DrawingCanvas } from './components/drawing-canvas/drawing-canvas.component';
import { CanvasWhiteboardModule } from 'ng2-canvas-whiteboard';
import { MQTT_SERVICE_OPTIONS } from './services/mqtt.service'
import { MqttModule } from 'ngx-mqtt';
import { AppRoutingModule } from './app-routing.module';
import { LivePadService } from './services/livepad.service';
import { MatExpansionModule } from '@angular/material/expansion';
import { AvatarModule } from 'ng2-avatar';
import { UserDisplayComponent } from './components/user-display/user-display.component';
import { SnackbarReconnectComponent } from './components/snackbar-reconnect/snackbar-reconnect.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePanel,
    DrawingCanvas,
    UserDisplayComponent,
    SnackbarReconnectComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MqttModule.forRoot(MQTT_SERVICE_OPTIONS),
    AvatarModule.forRoot(),
    CanvasWhiteboardModule,
    QRCodeModule,
    MatButtonModule, MatProgressSpinnerModule, MatInputModule, MatFormFieldModule, MatCardModule, MatExpansionModule, MatIconModule,MatSnackBarModule,
    AppRoutingModule
  ],
  entryComponents: [SnackbarReconnectComponent],
  providers: [ LivePadService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
