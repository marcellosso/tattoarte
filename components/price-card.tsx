import { ProductType } from '@/types';
import React, { FC } from 'react';
import CheckmarkIcon from './icons/checkmark';

interface IPriceCard {
  product: ProductType;
}

const PriceCard: FC<IPriceCard> = ({ product }) => {
  return (
    <div className="flex flex-col p-6 mx-auto max-w-lg text-center rounded-lg border shadow border-gray-600 xl:p-6 bg-primary text-letter max-h-[95%]">
      <h3 className="text-2xl font-bold text-detail">{product.name}</h3>
      {product.priceBeforeDiscount && (
        <span className="text-md font-extrabold text-letter">
          Oferta limitada
        </span>
      )}
      <div className="flex justify-center items-center my-4">
        <div className="flex flex-col items-center">
          {product.priceBeforeDiscount && (
            <span className="mr-2 text-xs xs:text-md font-normal line-through text-letter">
              {product.priceBeforeDiscount}
            </span>
          )}
          <span className="mr-2 text-lg xs:text-2xl font-extrabold text-detail">
            {product.price}
          </span>
        </div>
        {product.priceDetail && (
          <span className="text-2xs xs:text-sm font-thin ml-1">
            {product.priceDetail}
          </span>
        )}
      </div>

      {product.callToAction}

      <ul role="list" className="mb-8 space-y-4 text-left">
        {product.perks.map((perk) => (
          <li className="flex items-center space-x-3">
            <CheckmarkIcon />
            <span>{perk}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PriceCard;
