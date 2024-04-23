import i18next from '~/utils/localisation';
import { colors } from '~/utils/styles/themeConstants';
import { DeliveryTypes, OrderStatus, OrderTypes } from './constants';

const { t } = i18next;

export function createId(): string {
  return Math.random().toString(36).slice(2);
}

export function getDeliveryTypeText(instruction: DeliveryTypes | null): string {
  switch (instruction) {
    case DeliveryTypes.MEET_DOOR:
      return t('cart.meetDoor');
    case DeliveryTypes.MEET_OUTSIDE:
      return t('cart.meetOutside');
    case DeliveryTypes.MEET_LOBBY:
      return t('cart.meetLobby');
    case DeliveryTypes.LEAVE_DOOR:
      return t('cart.leaveDoor');
    case DeliveryTypes.LEAVE_RECEPTION:
      return t('cart.leaveReception');
    case DeliveryTypes.LEAVE_INSIDE:
      return t('cart.leaveInside');

    default:
      return '';
  }
}

export function formatPrice(price: string | number): string {
  const formattedPrice = Number(price);

  if (price === Math.round(formattedPrice)) {
    return Math.round(formattedPrice).toString();
  } else {
    return formattedPrice.toFixed(2);
  }
}

export const PICKUP_TIME_NOW = 'PICKUP_TIME_NOW';

export function getOrderStatusText(status: OrderStatus, orderType: OrderTypes): string {
  if (orderType === OrderTypes.PICKUP) {
    switch (status) {
      case OrderStatus.CREATED:
        return t('orderStatus.pickup.created');
      case OrderStatus.FULFILLED:
        return t('orderStatus.pickup.fulfilled');
      case OrderStatus.CANCELED:
        return t('orderStatus.pickup.canceled');
    }
  } else if (orderType === OrderTypes.DELIVERY) {
    switch (status) {
      case OrderStatus.CREATED:
        return t('orderStatus.delivery.created');
      case OrderStatus.FULFILLED:
        return t('orderStatus.delivery.fulfilled');
      case OrderStatus.CANCELED:
        return t('orderStatus.delivery.canceled');
    }
  }

  return '';
}

export function getOrderStatusColor(status: OrderStatus) {
  switch (status) {
    case OrderStatus.CREATED:
      return colors.activeBold;
    case OrderStatus.FULFILLED:
      return colors.green;
    case OrderStatus.CANCELED:
      return colors.error;
  }
}
