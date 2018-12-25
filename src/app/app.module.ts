import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatDialogModule, MatProgressSpinnerModule, MatFormFieldModule, MatCardModule, MatIconModule, MatSnackBarModule} from '@angular/material';
import { QRCodeModule } from 'angularx-qrcode';
import { HomePanelComponent } from './components/home-panel/home-panel.component';
import { DrawingCanvasComponent } from './components/drawing-canvas/drawing-canvas.component';
import { CanvasWhiteboardModule } from 'ng2-canvas-whiteboard';
import { MQTT_SERVICE_OPTIONS } from './services/mqtt.service';
import { MqttModule } from 'ngx-mqtt';
import { AppRoutingModule } from './app-routing.module';
import { LivePadService  } from './services/livepad.service';
import { MatExpansionModule } from '@angular/material/expansion';
import { AvatarModule } from 'ng2-avatar';
import { UserDisplayComponent } from './components/user-display/user-display.component';
import { SnackbarMessageComponent } from './components/snackbar-message/snackbar-message.component';
import { CRYPT_CONFIG_PROVIDER, CryptConfigProvider, EncryptionServiceModule } from 'angular-encryption-service';
import { QrcodeDialogComponent } from './components/qrcode-dialog/qrcode-dialog.component';

const AppCryptConfigProvider: CryptConfigProvider = {
  getSalt(): Promise<string> {
    return Promise.resolve('saltsalt');
  }
};
 
@NgModule({
  declarations: [
    AppComponent,
    HomePanelComponent,
    DrawingCanvasComponent,
    UserDisplayComponent,
    SnackbarMessageComponent,
    QrcodeDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MqttModule.forRoot(MQTT_SERVICE_OPTIONS),
    AvatarModule.forRoot(),
    EncryptionServiceModule.forRoot(),
    CanvasWhiteboardModule,
    QRCodeModule,
    MatButtonModule, MatDialogModule, MatProgressSpinnerModule, MatFormFieldModule, MatCardModule, MatExpansionModule, MatIconModule, MatSnackBarModule,
    AppRoutingModule
  ],
  entryComponents: [SnackbarMessageComponent, QrcodeDialogComponent],
  providers: [ LivePadService, {provide: CRYPT_CONFIG_PROVIDER, useValue: AppCryptConfigProvider} ],
  bootstrap: [AppComponent]
})
export class AppModule { }
