"use client";

import { createContext,ReactNode,useReducer } from "react";

// defines the structure that the state may have
type State = {
  productID: number;
  productName: string;
  productQuantity: number;
  productPrice: number;
  productTotal: number;
};

// defines the different actions that the reducer function will have
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

// the initial and temporary first product avaliable just for tests. It should be exclude before the deploy
const initialProductsInCart: State[] = [];

/** This function is a member of the useReducer management. Here are avaliables all the possibilities to handle the state
 * We can add new products to the cart, edit their quantity in the cart and the amount to be paid and, also, delete it
 */
function reducer(state: State[],action: Action) {
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

  // this is the feature implemented to get the amount to be paid for all the products in the cart
  const totalAmount = state.reduce((previous: number,item: { productTotal: number; }) => {
    return previous + item.productTotal;
  },0);

  return (
    <Context.Provider value={{ state,dispatch,totalAmount }}>
      {children}
    </Context.Provider>
  );
}