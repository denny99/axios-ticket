import {Injectable} from '@nestjs/common';
import {convictConfig} from './config-loader';

@Injectable()
export class ConfigService {
  public get databaseHost(): string {
    return convictConfig.get('database.host');
  }

  public get databasePort(): number {
    return convictConfig.get('database.port');
  }

  public get databaseName(): string {
    return convictConfig.get('database.database');
  }

  public get databaseUsername(): string {
    return convictConfig.get('database.username');
  }

  public get databasePassword(): string {
    return convictConfig.get('database.password');
  }

  public get databaseReplicaSet(): string | undefined {
    return convictConfig.get('database.replicaSet');
  }

  public get applicationName(): string {
    return convictConfig.get('server.applicationName');
  }

  public get applicationColor(): string {
    return convictConfig.get('server.applicationColor');
  }

  public get applicationIcon(): string {
    return convictConfig.get('server.applicationIcon');
  }

  public get applicationDomain(): string {
    return convictConfig.get('server.applicationDomain');
  }

  public get serverAddress(): string {
    return convictConfig.get('server.address');
  }

  public get ssrCaching(): boolean {
    return convictConfig.get('server.ssrCaching');
  }

  public get enableMicroApplications(): boolean {
    return convictConfig.get('cluster.microApplications');
  }

  public get msAddress(): string {
    return convictConfig.get('ms.host');
  }

  public get msPort(): number {
    return convictConfig.get('ms.port');
  }

  public get msPassword(): string {
    return convictConfig.get('ms.password');
  }

  public get msUsername(): string {
    return convictConfig.get('ms.username');
  }

  public get example(): string {
    return convictConfig.get('example');
  }
}

export const config = new ConfigService();
