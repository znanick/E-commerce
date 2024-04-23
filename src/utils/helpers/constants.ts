import { Dimensions } from 'react-native';
import Config from 'react-native-config';

export const API_URL = Config.API_URL;

export const PP_URL = Config.WEB_URL + '/privacy-policy';
export const TC_URL = Config.WEB_URL + '/terms-and-conditions';

export const GEOCODING_URL = Config.GEOCODING_API_URL;
export const GEOCODING_API_KEY = Config.GEOCODING_API_KEY;

export const STRIPE_KEY = Config.STRIPE_PUBLISHABLE_KEY;
export const APPLE_MERCHANT_ID = Config.APPLE_MERCHANT_ID;

export enum OrderTypes {
  DELIVERY = 'DELIVERY',
  PICKUP = 'PICKUP',
}

export enum DeliveryTypes {
  MEET_DOOR = 'MEET_DOOR',
  MEET_OUTSIDE = 'MEET_OUTSIDE',
  MEET_LOBBY = 'MEET_LOBBY',
  LEAVE_DOOR = 'LEAVE_DOOR',
  LEAVE_RECEPTION = 'LEAVE_RECEPTION',
  LEAVE_INSIDE = 'LEAVE_INSIDE',
}

const { height: windowHeight } = Dimensions.get('window');
export const BOTTOM_SHEET_MAX_HEIGHT = windowHeight - 100;

export const MAX_AVATAR_SIZE = 10000000;

export enum MediaPickerType {
  CAMERA = 'CAMERA',
  GALLERY = 'GALLERY',
}

export enum PromoCodeValues {
  FIXED_AMOUNT = 'fixed_amount',
  PERCENTAGE = 'percentage',
}

export enum PromoCodeTargets {
  PRODUCTS = 'line_item',
  DELIVERY = 'shipping_line',
}

export enum OrderStatus {
  CREATED = 'CREATED',
  FULFILLED = 'FULFILLED',
  CANCELED = 'CANCELED',
}
