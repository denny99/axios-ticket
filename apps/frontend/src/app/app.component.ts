import {SettingService} from './config/setting.service';
import { Component } from '@angular/core';

@Component({
  selector: 'axios-ticket-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
public constructor(private readonly settingsService: SettingService) {}

  title = 'frontend';
}
