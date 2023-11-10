import {isPlatformServer} from '@angular/common';
import {Inject, Injectable, Optional, PLATFORM_ID, TransferState} from '@angular/core';

export interface Config {
  isServer?: boolean;
  serverUrl?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  public config: Config = {};

  public constructor(
          @Optional() @Inject('serverUrl') private serverUrl: string,
          @Inject(PLATFORM_ID) public readonly platformId: any,
          state: TransferState) {
    this.config.isServer = isPlatformServer(platformId);
    if (this.config.isServer) {
      this.config.serverUrl = serverUrl;
    } else {
      // does not matter in the browser
      this.config.serverUrl = '';
    }
  }
}
