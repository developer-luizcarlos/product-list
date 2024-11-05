/* eslint-disable @next/next/no-img-element */
"use client";

/*
  This is a component that represents each element that indicates all of the products avaliable in the cart.
  The only handle function used here is to delete an item from the cart.
*/

import { useContext } from "react";
import { Context } from "@/context/Context";

interface Props {
  productName: string;
  productQuantity: number;
  productPrice: number;
  productTotal: number;
}

export default function ProductOnCart({
  productName,
  productQuantity,
  productPrice,
  productTotal,}:
  Props
) {
  const { dispatch } = useContext(Context)!;
  return (
    <div className="w-full flex items-center justify-between border-[0.5px] border-t-0 border-x-0 border-b-rose-100 py-4">
      <div className="flex flex-col gap-1">
        <h3 className="text-base font-medium text-rose-900">
          {productName}
        </h3>
        <div
          className="flex items-center gap-3 text-sm">
          <span className="text-red font-medium">
            {productQuantity}x
          </span>
          <span className="before:content-['@'] flex gap-2 text-rose-300">
            <span>
              {productPrice.toLocaleString('en',{ style: 'currency',currency: 'USD' })}
            </span>
          </span>
          <span className="text-rose-500">
            {productTotal.toLocaleString('en',{ style: 'currency',currency: 'USD' })}
          </span>
        </div>
      </div>
      <button
        onClick={() => {
          dispatch({ type: "DELETE",payload: productName });
        }}
        className="w-5 h-5 flex items-center justify-center rounded-full border-rose-500 border-[1px] cursor-pointer">
        <img src="./assets/images/icon-remove-item.svg" alt="delete product from the cart icon" />
      </button>
    </div>
  );
}