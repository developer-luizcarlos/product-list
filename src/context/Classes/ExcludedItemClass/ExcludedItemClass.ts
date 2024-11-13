export type ExcludedAction = | { type: "EXCLUDE",payload: string; } | { type: "ERASEALL",payload: string; };

export type ExcludedType = { item: string; };


class ExcludedClass {
  static excludedElement: ExcludedType = { item: "" };

  static excludedReducer(state: ExcludedType,action: ExcludedAction) {
    switch(action.type) {
      case "EXCLUDE":
        return {
          item: action.payload,
        };
      case "ERASEALL":
        return {
          item: action.payload,
        };
      default:
        return state;
    }
  }
}

export default ExcludedClass;