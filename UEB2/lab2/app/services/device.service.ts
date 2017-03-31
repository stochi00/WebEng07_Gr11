import { Device } from '../model/device';
import { DEVICES } from '../resources/mock-devices';
import { Injectable } from '@angular/core';

/**
 * Dieses Service kann verwendet werden um auf die in mock-devices.ts gespeicherten Geräte zuzugreifen
 * Es kann dabei als Provider verwendet und so in der ganzen Applikation eingesetzt werden.
 */
@Injectable()
export class DeviceService {

  /**
   * Liest die gemockten Geräte und liefert diese als Promise zurück
   * @returns {Promise<Device[]>}
   */
  getDevices(): Promise<Device[]> {
    return Promise.resolve(DEVICES);
  }

  /**
   *
   * Liest die gemockten Geräte und liefert das gewünschte Gerät als Promise zurück
   * @param id zur Identifkation des gewünschten Gerätes
   * @returns {Promise<TResult>}
   */
  getDevice(id: string): Promise<Device> {
    return this.getDevices()
      .then(devices => devices.find(device => device.id === id));
  }
}
