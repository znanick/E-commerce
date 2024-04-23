import { AxiosResponse } from 'axios';

import { CoordinatesType } from '~/store/addresses/types';
import { BaseClient, baseApiClient } from '~/utils/API/baseClient';
import { GEOCODING_API_KEY, GEOCODING_URL } from '~/utils/helpers/constants';
import {
  GoogleGeocodingApiResponse,
  ReturnedAddressType,
  ReturnedGeocodingCoordinatesType,
} from './types';

export class GeocodingService {
  constructor(private api: BaseClient) {}
  private geocodingUrl = GEOCODING_URL;
  private prefferedRegion = 'us';

  geocodeAddress = async ({
    address,
    zipCode,
  }: {
    address: string;
    zipCode?: string;
  }): Promise<ReturnedGeocodingCoordinatesType> => {
    const zipPostfix = zipCode ? `, ${zipCode}` : '';

    const response: AxiosResponse<GoogleGeocodingApiResponse> = await this.api.get(
      `${this.geocodingUrl}?address=${encodeURIComponent(address + zipPostfix)}&region=${
        this.prefferedRegion
      }&key=${GEOCODING_API_KEY}`,
    );

    return {
      coordinates: this.findCoordinates(response.data),
      address: this.findAddress(response.data),
    };
  };

  geocodeCoordinates = async ({ lat, lng }: CoordinatesType): Promise<ReturnedAddressType> => {
    const response: AxiosResponse<GoogleGeocodingApiResponse> = await this.api.get(
      `${this.geocodingUrl}?latlng=${lat},${lng}&region=${this.prefferedRegion}&key=${GEOCODING_API_KEY}`,
    );
    return this.findAddress(response.data);
  };

  private findCoordinates = (data: GoogleGeocodingApiResponse): CoordinatesType => {
    return data.results[0].geometry.location;
  };

  private findAddress = (data: GoogleGeocodingApiResponse): ReturnedAddressType => {
    let streetAddress = '';
    let city = '';
    let zipCode = '';
    let state = '';
    const result = data.results[0];

    if (result.address_components.length) {
      result.address_components.forEach(component => {
        if (component.types.includes('street_number')) {
          streetAddress += component.long_name + ' ';
        }
      });

      result.address_components.forEach(component => {
        if (component.types.includes('route')) {
          streetAddress += component.long_name;
        } else if (component.types.includes('locality')) {
          city = component.long_name;
        } else if (component.types.includes('postal_code')) {
          zipCode = component.long_name;
        } else if (component.types.includes('administrative_area_level_1')) {
          state = component.long_name;
        }
      });
    }

    return { streetAddress: streetAddress.trim(), city, placeId: result.place_id, zipCode, state };
  };
}

export const geocodingService = new GeocodingService(baseApiClient);
