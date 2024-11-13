export type ModalState = { isShow: boolean; };
export type ModalAction = | { type: "SHOW"; } | { type: "HIDE"; };

class ModalClass {
  static initialModalState: ModalState = { isShow: false };

  static setModalShow(state: ModalState,action: ModalAction) {
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
}

export default ModalClass;