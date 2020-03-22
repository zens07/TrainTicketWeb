const initialState = {
  loadIndex: false,
  loadShow: false,
  loadEdit: false,

  orderIndex: [],
  orderShow: [],
  orderEdit: {},

  errorIndex: [],
  errorShow: [],
  errorEdit: []
};

const admins = (state = initialState, action) => {
  // console.log("ini reducers", action);
  switch (action.type) {
    case "GET_ORDERS_PENDING":
      return {
        ...state,
        loadIndex: true
      };
    case "GET_ORDER_PENDING":
      return {
        ...state,
        loadShow: true
      };
    case "EDIT_ORDER_PENDING":
      return {
        ...state,
        loadEdit: true
      };
    case "GET_ORDERS_FULFILLED":
      return {
        ...state,
        loadIndex: false,
        orderIndex: action.payload.data.data
      };

    case "GET_ORDER_FULFILLED":
      return {
        ...state,
        loadShow: false,
        orderShow: action.payload.data.data
      };
    case "EDIT_ORDER_FULFILLED":
      return {
        ...state,
        loadEdit: false,
        orderEdit: action.payload.data.data
      };

    case "GET_ORDERS_REJECTED":
      return {
        ...state,
        loadIndex: false,
        errorIndex: action.payload.response
      };
    case "GET_ORDER_REJECTED":
      return {
        ...state,
        loadOrder: false,
        errorShow: action.payload.response
      };

    case "EDIT_ORDER_REJECTED":
      return {
        ...state,
        loadEdit: false,
        errorEdit: action.payload.response
      };
    default:
      return state;
  }
};
export default admins;

// export const orderShow = (state = initialState, action) => {
//   switch (action.type) {
//     case "EDIT_ORDER_PENDING":
//       return {
//         ...state,
//         loadEdit: true
//       };
//     case "EDIT_ORDER_FULFILLED":
//       return {
//         ...state,
//         loadEdit: false,
//         orderEdit: action.payload.data.data
//       };
//     case "EDIT_ORDER_REJECTED":
//       return {
//         ...state,
//         loadEdit: false,
//         errorEdit: action.payload.response
//       };
//     default:
//       return state;
//   }
// };
