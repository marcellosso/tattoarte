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
      <div className="flex justify-center items-baseline my-4">
        <span className="mr-2 text-3xl font-extrabold">{product.price}</span>
        {product.priceDetail && (
          <span className="ml-1 text-sm font-thin">{product.priceDetail}</span>
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
