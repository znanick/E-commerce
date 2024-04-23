import { Routes } from "~/navigation/routes";

const { BOTTOM_TAB, CART,CART_SCREEN } = Routes

const config = {
  screens: {
    [BOTTOM_TAB]: {
      screens: {
        [CART]:  'cart'
      }
    }
  },
};

export const LINKING_CONFIG = {
  prefixes: ['https://e-commerce.com'],
};
