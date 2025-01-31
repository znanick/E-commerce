export enum MMKVKeys {
  HAS_ADDRESSES_BEEN_CLEARED_AFTER_UPDATING = 'HAS_ADDRESSES_BEEN_CLEARED_AFTER_UPDATING',
  HAS_CART_BEEN_CLEARED_AFTER_UPDATING = 'HAS_CART_BEEN_CLEARED_AFTER_UPDATING2',
}

export type KeysType = MMKVKeys | string;

export type ValueType = number | boolean | string;
