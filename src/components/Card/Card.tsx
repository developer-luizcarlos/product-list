/* eslint-disable prefer-const */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useRef,useReducer,useContext } from "react";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { Context } from "@/context/Context";

interface Props {
  id: number;
  image: string;
  name: string;
  category: string;
  price: number;
}

type QuantityType = {
  count: number;
};

type Action = | { type: "INCREMENT"; } | { type: "DECREMENT"; } | { type: "RESET"; };

let initialQuantity: QuantityType = { count: 1 };

const setQuantity = (state: QuantityType,action: Action): QuantityType => {
  switch(action.type) {
    case "INCREMENT":
      return { ...state,count: state.count + 1 };
    case "DECREMENT":
      return state.count > 0 ? { ...state,count: state.count - 1 } : state;
    case "RESET":
      return { ...state,count: 1 };
    default:
      return state;
  }
};


export default function Card({ image,name,category,price }: Props) {
  const { state,dispatch } = useContext(Context)!;

  const [quantity,handleQuantity] = useReducer(setQuantity,initialQuantity);

  const addCartRef = useRef<HTMLButtonElement | null>(null);
  const selectProductQuantityRef = useRef<HTMLDivElement | null>(null);

  const addProtductsToCart = (productName: string,productPrice: number) => {
    addCartRef.current!.style.display = "none";
    selectProductQuantityRef.current!.style.display = "flex";

    const existingProduct = state.find(item => item.productName === productName);

    if(!existingProduct) {
      dispatch({ type: "ADD",productID: state.length + 1,productName: productName,productPrice: productPrice,productQuantity: quantity.count,productTotal: (productPrice * quantity.count) });
    }
    handleQuantity({ type: "RESET" });
  };

  const incrementProductsQuantity = (productName: string) => {
    handleQuantity({ type: "INCREMENT" });
    dispatch({ type: "EDIT",name: productName,newQuantity: quantity.count + 1,price: price });
  };

  const decrementProductsQuantity = (productName: string) => {
    handleQuantity({ type: "DECREMENT" });
    if(quantity.count > 1) {
      dispatch({ type: "EDIT",name: productName,newQuantity: quantity.count - 1,price: price });
      addCartRef.current!.style.display = "none";
      selectProductQuantityRef.current!.style.display = "flex";
    } else {
      dispatch({ type: "DELETE",payload: name });
      addCartRef.current!.style.display = "flex";
      selectProductQuantityRef.current!.style.display = "none";
      handleQuantity({ type: "RESET" });
    }
  };


  return (
    <article className="flex flex-col gap-7 w-[200px] h-80 mb-11">
      <div className="w-full h-60 rounded-lg relative">
        <img src={image} alt="" className="w-full h-full object-cover rounded-lg" />
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-44 h-9">
          <button
            ref={addCartRef}
            onClick={() => {
              addProtductsToCart(name,price);
            }}
            className="bg-rose-100 h-full w-full rounded-xl flex items-center justify-center gap-1 border-rose-300 border-[1px] text-rose-900 font-medium cursor-pointer"
          >
            <span className="text-red">
              <MdOutlineAddShoppingCart />
            </span> Add to cart</button>
          <div
            ref={selectProductQuantityRef}
            className="bg-red h-full hidden w-full rounded-xl items-center justify-between gap-1 text-rose-900 font-medium px-4">
            <button
              onClick={() => { decrementProductsQuantity(name); }}
              className="w-5 h-5 flex items-center justify-center rounded-full border-rose-100 border-[1px] cursor-pointer">
              <img src="./assets/images/icon-decrement-quantity.svg" alt="" />
            </button>
            <span className="text-rose-100">
              {quantity.count}
            </span>
            <button
              onClick={() => { incrementProductsQuantity(name); }}
              className="w-5 h-5 flex items-center justify-center rounded-full border-rose-100 border-[1px] cursor-pointer">
              <img src="./assets/images/icon-increment-quantity.svg" alt="" />
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-sm text-rose-500">{category}</span>
        <h2 className="text-lg capitalize font-bold">{name}</h2>
        <span className="text-base text-red font-semibold">
          {price.toLocaleString('pt-BR',{ style: 'currency',currency: 'USD' })}
        </span>
      </div>
    </article >
  );
}
