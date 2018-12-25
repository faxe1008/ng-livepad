import { Observable } from 'rxjs';

import {
  IMqttServiceOptions
} from 'ngx-mqtt';

export const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
  hostname: 'livepad.ddns.net',
  port: 9001,
  protocol: 'wss' 
};
