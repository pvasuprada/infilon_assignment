import { ActionTypes } from "../constants/action-types";
const intialState = {
  apidata: [],
};

export const Reducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.FETCH_DETAILS:
      return { ...state, apidata: payload };
    default:
      return state;
  }
};

// export const selectedProductsReducer = (state = {}, { type, payload }) => {
//   console.log(type);
//   switch (type) {
//     case ActionTypes.SELECTED_PRODUCT:
//       return { ...state, ...payload };
//     case ActionTypes.REMOVE_SELECTED_PRODUCT:
//       return {};
//     default:
//       return state;
//   }
// };