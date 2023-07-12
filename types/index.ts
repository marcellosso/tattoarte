export type ParamsType = {
  prompt: string;
  colorsStyle: string;
  tattooStyle: string;
  iaVersion: string;
  artistInspiration?: string;
  isHD?: boolean;
  isPrivate?: boolean;
  colors?: string[];
  baseImage?: string;
};

export type ProductType = {
  name: string;
  price: string;
  priceId: string;
  priceBeforeDiscount: string;
  priceDetail: string;
  perks: string[];

  offerDetail?: string;
};

export enum PriceTabEnum {
  ACCESS = 'access',
  PACKAGE = 'package',
}
