"use client";

import { createContext,ReactNode,useReducer } from "react";

type State = {
  productID: number;
  productName: string;
  productQuantity: number;
  productPrice: number;
  productTotal: number;
};

type Action =
  |
  {
    type: "ADD",
    productID: number;
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

const initialProductsInCart: State[] = [
  {
    productID: 1,
    productName: "Cake",
    productQuantity: 10,
    productPrice: 3,
    productTotal: 30,
  }
];

const reducer = (state: State[],action: Action) => {
  switch(action.type) {
    case "ADD":
      return [
        ...state,
        {
          productID: action.productID,
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

  const totalAmount = state.reduce((previous: number,item: { productTotal: number; }) => {
    return previous + item.productTotal;
  },0);

  return (
    <Context.Provider value={{ state,dispatch,totalAmount }}>
      {children}
    </Context.Provider>
  );
}