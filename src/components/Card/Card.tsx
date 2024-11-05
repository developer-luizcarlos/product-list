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

const initialQuantity: QuantityType = { count: 1 };

function setQuantity(state: QuantityType,action: Action): QuantityType {
  switch(action.type) {
    case "INCREMENT":
      return { ...state,count: state.count + 1 };
    case "DECREMENT":
      return state.count > 1 ? { ...state,count: state.count - 1 } : state;
    case "RESET":
      return { count: 1 };
    default:
      return state;
  }
};


export default function Card({ image,name,category,price }: Props) {
  const { state,dispatch } = useContext(Context)!;

  const [quantity,handleQuantity] = useReducer(setQuantity,initialQuantity);

  const addCartRef = useRef<HTMLButtonElement | null>(null);
  const selectProductQuantityRef = useRef<HTMLDivElement | null>(null);
  const cardImageRef = useRef<HTMLImageElement | null>(null);

  function createNewItemOnCart(productName: string,productPrice: number) {
    dispatch({ type: "ADD",productName: productName,productPrice: productPrice,productQuantity: quantity.count,productTotal: (productPrice * quantity.count) });
  }

  function addProductsToCart(productName: string,productPrice: number) {
    const productAlreadyExistOnCart = state.find(item => item.productName === productName);
    if(!productAlreadyExistOnCart) {
      createNewItemOnCart(productName,productPrice);
    }
    // hide the add button and show the component to select how many items will be insert in the cart
    addCartRef.current!.style.display = "none";
    selectProductQuantityRef.current!.style.display = "flex";
    cardImageRef.current!.classList.add("item-selected-border");
    handleQuantity({ type: "RESET" });
  };

  function changeProductsQuantity(actionType: Action['type'],productName: string,productPrice: number) {
    const productAlreadyExistOnCart = state.find(item => item.productName === productName);
    if(!productAlreadyExistOnCart) {
      createNewItemOnCart(productName,productPrice);
    } else {
      handleQuantity({ type: actionType });
      dispatch({ type: "EDIT",name: productName,newQuantity: quantity.count + 1,price: price });
    }
  }

  function incrementProductsQuantity(productName: string,productPrice: number) {
    changeProductsQuantity("INCREMENT",productName,productPrice);
  };

  function decrementProductsQuantity(productName: string,productPrice: number) {
    changeProductsQuantity("DECREMENT",productName,productPrice);
    if(quantity.count > 1) {
      dispatch({ type: "EDIT",name: productName,newQuantity: quantity.count - 1,price: price });
    } else {
      /* 
      if the quantity items value selected is equals to zero and the product exists in the cart, it will be hide and the original button to add in the cart will be visible again
      */
      dispatch({ type: "DELETE",payload: name });
      handleQuantity({ type: "RESET" }); // reset the quantity items value to one
      addCartRef.current!.style.display = "flex";
      selectProductQuantityRef.current!.style.display = "none";
      cardImageRef.current!.classList.remove("item-selected-border");
    }
  };


  return (
    <article className="flex flex-col gap-7 w-[200px] h-80 mb-11">
      <div className="w-full h-60 rounded-lg relative">
        <img ref={cardImageRef} src={image} alt="" className="w-full h-full object-cover rounded-lg" />
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-44 h-9">
          <button
            ref={addCartRef}
            onClick={() => {
              addProductsToCart(name,price);
            }}
            className="bg-rose-100 h-full w-full rounded-xl flex items-center justify-center gap-1 border-rose-300 border-[1px] text-rose-900 font-medium cursor-pointer"
          >
            <span className="text-red">
              <MdOutlineAddShoppingCart />
            </span>
            <p>Add to cart</p>
          </button>
          <div
            ref={selectProductQuantityRef}
            className="bg-red h-full hidden w-full rounded-xl items-center justify-between gap-1 text-rose-900 font-medium px-4">
            <button
              onClick={() => { decrementProductsQuantity(name,price); }}
              className="w-5 h-5 flex items-center justify-center rounded-full border-rose-100 border-[1px] cursor-pointer">
              <img src="./assets/images/icon-decrement-quantity.svg" alt="" />
            </button>
            <span className="text-rose-100">
              {quantity.count}
            </span>
            <button
              onClick={() => { incrementProductsQuantity(name,price); }}
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
