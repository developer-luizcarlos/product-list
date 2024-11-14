/* eslint-disable @next/next/no-img-element */
"use client";
import { useContext } from "react";
import { Context } from "@/context/Context";
import ProductOnCart from "../Cart/ProductOnCart/ProductOnCart";
import EmptyCart from "../Cart/EmptyCart/EmptyCart";

export default function ConfirmOrder() {
  const { state,dispatch,totalAmount,showModal,setShowModal,setItemExcluded } = useContext(Context)!;

  function confirmOrder(): void {
    dispatch({ type: "CLEAR" });
    setShowModal({ type: "HIDE" });
    setItemExcluded({ type: "ERASEALL",payload: "ERASED" });
  }

  return (
    <article className={`${ (showModal.isShow) ? "w-screen h-screen block absolute top-0 left-0" : "hidden" }`}>
      <div
        onClick={() => setShowModal({ type: "HIDE" })}
        className="w-full h-full bg-opacity-30 relative bg-neutral-600 block">
        <div
          onClick={(event) => event.stopPropagation()}
          className="w-full md:w-[500px] h-[90%] md:h-max bg-rose-50 p-6 rounded-lg flex flex-col gap-7 absolute bottom-0 md:top-1/2 left-1/2 -translate-x-1/2 -translate-y-0 md:-translate-y-1/2">
          <img
            src="./assets/images/icon-order-confirmed.svg"
            alt="confirm icon"
            className="w-8 object-cover"
          />
          <div className="flex flex-col gap-1">
            <h1 className="text-3xl text-rose-900 font-extrabold">Order Confirmed</h1>
            <small className="text-rose-400 font-medium">We hope you enjoy your food</small>
          </div>
          <div className="bg-pink-50 rounded-md p-2 flex flex-col gap-2">
            <div className="overflow-hidden max-h-80 overflow-y-scroll scrollbar-custom w-full p-4">
              {state.length > 0 ? <div className="w-full flex flex-col gap-1">
                {state.map((item) => {
                  return <ProductOnCart
                    key={item.productName}
                    productImage={item.productImage}
                    productName={item.productName}
                    productPrice={item.productPrice}
                    productQuantity={item.productQuantity}
                    productTotal={item.productPrice * item.productQuantity}
                  />;
                })}
              </div> : <EmptyCart />}
            </div>
            <div className="w-full flex items-center justify-between">
              <small className="text-rose-900 text-base font-medium capitalize">order total</small>
              <span className="text-2xl text-rose-900 font-extrabold">
                {totalAmount.toLocaleString('en',{ style: 'currency',currency: 'USD' })}
              </span>
            </div>
          </div>
          <button
            onClick={() => confirmOrder()}
            className="w-full h-10 p-2 flex items-center justify-center text-rose-100 text-base font-semibold capitalize bg-red rounded-2xl cursor-pointer">Start new order</button>
        </div>
      </div>
    </article>
  );
}
