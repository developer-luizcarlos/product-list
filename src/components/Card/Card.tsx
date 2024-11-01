/* eslint-disable prefer-const */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useRef,useReducer } from "react";
import { MdOutlineAddShoppingCart } from "react-icons/md";

interface Props {
  image: string;
  name: string;
  category: string;
  price: number;
}

type QuantityType = {
  count: number;
};

type Action = | { type: "INCREMENT"; } | { type: "DECREMENT"; };

let initialQuantity: QuantityType = { count: 0 };

const setQuantity = (state: QuantityType,action: Action): QuantityType => {
  switch(action.type) {
    case "INCREMENT":
      return { ...state,count: state.count + 1 };
    case "DECREMENT":
      return state.count > 0 ? { ...state,count: state.count - 1 } : state;
    default:
      return state;
  }
};

export default function Card({ image,name,category,price }: Props) {
  const [quantity,dispatch] = useReducer(setQuantity,initialQuantity);


  return (
    <article className="flex flex-col gap-5 w-72 max-h-80 mb-11">
      <div className="w-full h-52 rounded-lg relative">
        <img src={image} alt="" className="w-full h-full object-cover rounded-lg" />
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-44 h-9">
          <button
            className="bg-rose-100 h-full w-full rounded-xl flex items-center justify-center gap-1 border-rose-300 border-[1px] text-rose-900 font-medium"
          >
            <span className="text-red">
              <MdOutlineAddShoppingCart />
            </span> Add to cart</button>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-sm text-rose-500">{category}</span>
        <h2 className="text-lg capitalize font-bold">{name}</h2>
        <span className="text-base text-red font-semibold">
          {price.toLocaleString('pt-BR',{ style: 'currency',currency: 'USD' })}
        </span>
      </div>
    </article>
  );
}
