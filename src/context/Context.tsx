"use client";

import { createContext,ReactNode,useReducer } from "react";

type State = {
  productName: string;
  productQuantity: number;
  productPrice: number;
  productTotal: number;
};

type ModalState = { isShow: boolean; };

type ProductAction =
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
  }
  | {
    type: "CLEAR";
  };

type ModalAction = | { type: "SHOW"; } | { type: "HIDE"; };

const initialProductsInCart: State[] = [];

const initialModalState: ModalState = { isShow: false };

function setModalShow(state: ModalState,action: ModalAction) {
  switch(action.type) {
    case "SHOW":
      return {
        ...state,
        isShow: true
      };
    case "HIDE":
      return {
        ...state,
        isShow: false
      };
  }
}

function reducer(state: State[],action: ProductAction): State[] {
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
    case "CLEAR":
      return [];
    default:
      return state;
  }
};

type ContextType = {
  state: State[],
  dispatch: React.Dispatch<ProductAction>;
  totalAmount: number;
  showModal: ModalState;
  setShowModal: React.Dispatch<ModalAction>;
};

export const Context = createContext<ContextType | null>(null);

export default function ContextComponent({ children }: { children: ReactNode; }) {
  const [state,dispatch] = useReducer(reducer,initialProductsInCart);
  const [showModal,setShowModal] = useReducer(setModalShow,initialModalState);

  const totalAmountToBePaid = state.reduce((previous: number,item: { productTotal: number; }) => {
    return previous + item.productTotal;
  },0);

  return (
    <Context.Provider value={{ state,dispatch,totalAmount: totalAmountToBePaid,showModal,setShowModal }}>
      {children}
    </Context.Provider>
  );
}