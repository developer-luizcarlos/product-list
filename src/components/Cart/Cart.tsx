/* eslint-disable @next/next/no-img-element */
"use client";

import { useContext } from "react";
import { Context } from "@/context/Context";
import ProductOnCart from "./ProductOnCart/ProductOnCart";

export default function Cart() {
  const { state,totalAmount } = useContext(Context)!;

  return (
    <article className="w-[350px] bg-rose-50 flex flex-col gap-4 p-4 rounded-md">
      <h1 className="text-xl text-red font-extrabold">Your Cart ({state.length})</h1>
      <div className="w-full flex flex-col">
        {state.map((item) => {
          return <ProductOnCart
            key={item.productID}
            productName={item.productName}
            productPrice={item.productPrice}
            productQuantity={item.productQuantity}
            productTotal={item.productPrice * item.productQuantity}
          />;
        })}
      </div>
      <div
        className="w-full flex items-center justify-between">
        <span
          className="capitalize text-base text-rose-500 font-bold">order total</span>
        <span className="text-2xl text-rose-900 font-extrabold">
          {totalAmount.toLocaleString('en',{ style: 'currency',currency: 'USD' })}
        </span>
      </div>
      <div className="w-full flex items-center justify-center gap-3">
        <img src="./assets/images/icon-carbon-neutral.svg" alt="" />
        <p className="text-sm text-rose-500">This is a <span className="text-rose-900 font-semibold">carbon-neutral</span> delivery</p>
      </div>
      <button className="w-full h-10 p-2 flex items-center justify-center text-rose-100 text-base font-semibold capitalize bg-red rounded-2xl cursor-pointer">confirm order</button>
    </article>
  );
}