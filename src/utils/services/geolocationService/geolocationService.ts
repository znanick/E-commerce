import Geolocation from 'react-native-geolocation-service';
import { RESULTS } from 'react-native-permissions';

import { Routes } from '~/navigation/routes';
import { checkGeolocationPermission } from '~/utils/helpers/permissions';
import { navigationService } from '../navigationService';

export class GeolocationService {
  private geolocation = Geolocation;

  getCurrentPosition = (): Promise<Geolocation.GeoCoordinates> => {
    return new Promise((resolve, reject) => {
      checkGeolocationPermission()
        .then(result => {
          if (result !== RESULTS.GRANTED) {
            navigationService.navigate(Routes.GEOLOCATION_ACCESS_MODAL, { closeOnSuccess: true });
            reject();
          } else {
            this.geolocation.getCurrentPosition(
              (position: Geolocation.GeoPosition) => {
                resolve(position.coords);
              },
              () => {
                reject();
              },
              { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
            );
          }
        })
        .catch(() => {
          reject();
        });
    });
  };
}

export const geolocationService = new GeolocationService();
