export type ProductState = {
  productName: string;
  productQuantity: number;
  productPrice: number;
  productTotal: number;
};


export type ProductAction =
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

class ProductClass {
  static initialProductsInCart: ProductState[] = [];

  static reducer(state: ProductState[],action: ProductAction): ProductState[] {
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
}


export default ProductClass;