"use client";

import { createContext,ReactNode,useReducer } from "react";

type State = {
  productName: string;
  productQuantity: number;
  productPrice: number;
  productTotal: number;
};

type Action =
  |
  {
    type: "ADD",
    productName: string,
    productQuantity: number,
    productPrice: number,
    productTotal: number,
  }
  |
  {
    type: "EDIT",
    name: string,
    newQuantity: number,
    price: number;
  }
  | {
    type: "DELETE",
    payload: string;
  };

const initialProductsInCart: State[] = [];

function reducer(state: State[],action: Action): State[] {
  switch(action.type) {
    case "ADD":
      return [
        ...state,
        {
          productName: action.productName,
          productQuantity: action.productQuantity,
          productPrice: action.productPrice,
          productTotal: action.productTotal,
        }
      ];
    case "EDIT":
      return state.map((item) => {
        if(item.productName === action.name) {
          return { ...item,productQuantity: action.newQuantity,productTotal: (action.price * action.newQuantity) };
        } else {
          return item;
        }
      });
    case "DELETE":
      return state.filter(item => item.productName != action.payload);
    default:
      return state;
  }
};

type ContextType = {
  state: State[],
  dispatch: React.Dispatch<Action>;
  totalAmount: number;
};

export const Context = createContext<ContextType | null>(null);

export default function ContextComponent({ children }: { children: ReactNode; }) {
  const [state,dispatch] = useReducer(reducer,initialProductsInCart);

  const totalAmountToBePaid = state.reduce((previous: number,item: { productTotal: number; }) => {
    return previous + item.productTotal;
  },0);

  return (
    <Context.Provider value={{ state,dispatch,totalAmount: totalAmountToBePaid }}>
      {children}
    </Context.Provider>
  );
}