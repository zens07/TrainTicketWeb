const initialState = {
  postOrder: [],
  userShow: [],
  orderIndex: [],
  orderShow: [],

  loadPost: false,
  loadIndex: false,
  loadUser: false,
  loadOrder: false,

  errorIndex: {},
  errorPost: {},
  errorUser: {},
  errorOrder: {},
  errorStatus: false
};

const users = (state = initialState, action) => {
  switch (action.type) {
    case "POST_ORDER_PENDING":
      return {
        ...state,
        loadPost: true
      };
    case "POST_ORDER_FULFILLED":
      return {
        ...state,
        loadPost: false,
        postOrder: action.payload.data
      };
    case "POST_ORDER_REJECTED":
      return {
        ...state,
        loadPost: false,
        errorPost: action.payload.response
      };
    case "GET_ORDERS_PENDING":
      return {
        ...state,
        loadIndex: true
      };
    case "GET_ORDERS_FULFILLED":
      return {
        ...state,
        loadIndex: false,
        orderIndex: action.payload.data
      };
    case "GET_ORDERS_REJECTED":
      return {
        ...state,
        loadIndex: false,
        errorIndex: action.payload.response
      };

    case "GET_ORDER_PENDING":
      return {
        ...state,
        loadOrder: true,
        errorStatus: false
      };
    case "GET_ORDER_FULFILLED":
      return {
        ...state,
        loadOrder: false,
        errorStatus: false,
        orderShow: action.payload.data.data
      };
    case "GET_ORDER_REJECTED":
      return {
        ...state,
        loadOrder: false,
        errorStatus: true,
        errorOrder: action.payload.response.data
      };

    case "GET_USER_PENDING":
      return {
        ...state,
        loadUser: true
      };
    case "GET_USER_FULFILLED":
      return {
        ...state,
        loadUser: false,
        userShow: action.payload.data
      };
    case "GET_USER_REJECTED":
      return {
        ...state,
        loadUser: false,
        errorStatus: true,
        errorShow: action.payload.response
      };
    default:
      return state;
  }
};
export default users;
