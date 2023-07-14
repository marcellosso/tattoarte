import { ProductType } from '@/types';
import Link from 'next/link';
import React, { FC } from 'react';
import CheckmarkIcon from './icons/checkmark';

interface IPriceCard {
  product: ProductType;
}

const PriceCard: FC<IPriceCard> = ({ product }) => {
  return (
    <div className="flex flex-col p-6 mx-auto max-w-lg text-center rounded-lg border shadow border-detail xl:p-6 bg-primary text-letter max-h-[95%]">
      <h3 className="text-2xl font-bold text-detail">{product.name}</h3>
      <span className="text-md font-bold text-letter">
        15% na 1ª compra{' '}
        {product.offerDetailWithDiscount && (
          <>
            -
            <span className="font-extrabold text-detail">
              {' '}
              {product.offerDetailWithDiscount}
            </span>
          </>
        )}
      </span>
      <div className="flex justify-center items-center my-4">
        <div className="flex flex-col items-center">
          {product.price && (
            <span className="mr-2 text-xs xs:text-md font-normal line-through text-letter">
              {product.price}
            </span>
          )}
          <span className="mr-2 text-lg xs:text-2xl font-extrabold text-detail">
            {product.priceWithDiscount}
          </span>
        </div>
        <span className="text-2xs xs:text-sm font-thin ml-1">
          {product.priceDetail}
        </span>
      </div>

      <Link
        href={`/checkout?priceId=${product.priceId}`}
        className="bg-gradient-to-r mb-3 font-bold text-center text-letter p-3 rounded-md from-green-600 to-blue-700 hover:from-pink-500 hover:to-yellow-500 transition-all"
      >
        Compre {product.name.split('-').at(-1)}
      </Link>

      <ul role="list" className="mb-8 space-y-4 text-left">
        {product.perks.map((perk) => (
          <li key={perk} className="flex items-center space-x-3">
            <CheckmarkIcon />
            <span>{perk}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PriceCard;
