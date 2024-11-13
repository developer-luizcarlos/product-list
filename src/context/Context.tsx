"use client";

import { createContext,ReactNode,useReducer } from "react";
import ProductClass from "./Classes/ProductClass/ProductClass";
import { ProductState,ProductAction } from "./Classes/ProductClass/ProductClass";
import { ExcludedType,ExcludedAction } from "./Classes/ExcludedItemClass/ExcludedItemClass";
import ExcludedClass from "./Classes/ExcludedItemClass/ExcludedItemClass";
import { ModalState,ModalAction } from "./Classes/ModalClass/ModalClass";
import ModalClass from "./Classes/ModalClass/ModalClass";


type ContextType = {
  state: ProductState[],
  dispatch: React.Dispatch<ProductAction>;
  totalAmount: number;
  showModal: ModalState;
  setShowModal: React.Dispatch<ModalAction>;
  itemExcluded: ExcludedType;
  setItemExcluded: React.Dispatch<ExcludedAction>;
};

export const Context = createContext<ContextType | null>(null);

export default function ContextComponent({ children }: { children: ReactNode; }) {
  const [state,dispatch] = useReducer(ProductClass.reducer,ProductClass.initialProductsInCart);
  const [showModal,setShowModal] = useReducer(ModalClass.setModalShow,ModalClass.initialModalState);
  const [itemExcluded,setItemExcluded] = useReducer(ExcludedClass.excludedReducer,ExcludedClass.excludedElement);

  const totalAmountToBePaid = state.reduce((previous: number,item: { productTotal: number; }) => {
    return previous + item.productTotal;
  },0);

  return (
    <Context.Provider value={{ state,dispatch,totalAmount: totalAmountToBePaid,showModal,setShowModal,itemExcluded,setItemExcluded }}>
      {children}
    </Context.Provider>
  );
}