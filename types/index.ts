export type ParamsType = {
  prompt: string;
  colorsStyle: string;
  tattooStyle: string;
  artistInspiration?: string;
  isHD?: boolean;
  isPrivate?: boolean;
  colors?: string[];
};

export type ProductType = {
  name: string;
  price: string;
  priceBeforeDiscount: string;
  priceDetail: string;
  perks: string[];
  callToAction: JSX.Element;
};

export enum PriceTabEnum {
  ACCESS = 'access',
  PACKAGE = 'package',
}
