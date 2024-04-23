import { CoordinatesType } from '~/store/addresses/types';

export type GoogleGeocodingApiResponse = {
  results: Array<{
    geometry: {
      location: CoordinatesType;
    };
    address_components: Array<{
      long_name: string;
      short_name: string;
      types: string[];
    }>;
    place_id: string;
  }>;
};

export type ReturnedAddressType = {
  streetAddress: string;
  city: string;
  zipCode: string;
  placeId: string;
  state: string;
};

export type ReturnedGeocodingCoordinatesType = {
  coordinates: CoordinatesType;
  address: ReturnedAddressType;
};
