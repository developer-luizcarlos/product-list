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
  | {
    type: "ADD",
    productID: number;
    productName: string,
    productQuantity: number,
    productPrice: number,
    productTotal: number,
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
  }
};
type ContextType = {
  state: State[],
  dispatch: React.Dispatch<Action>;
};

export const Context = createContext<ContextType | null>(null);

export default function ContextComponent({ children }: { children: ReactNode; }) {
  const [state,dispatch] = useReducer(reducer,initialProductsInCart);

  return (
    <Context.Provider value={{ state,dispatch }}>
      {children}
    </Context.Provider>
  );
}