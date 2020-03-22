const initialState = {
  findStation: [],
  statusData: false,
  isLoading: false,
  dataErr: [],
  error: false
};

const trains = (state = initialState, action) => {
  //   console.log("inreducer", action, state);
  switch (action.type) {
    case "GET_STATION_PENDING":
      return {
        ...state,
        isLoading: true,
        error: false,
        statusData: false
      };
    case "GET_STATION_FULFILLED":
      // console.log("heyeyyeyy", action.payload.data);
      return {
        ...state,
        isLoading: false,
        statusData: true,
        findStation: action.payload.data.data
      };
    case "GET_STATION_REJECTED":
      return {
        ...state,
        isLoading: false,
        statusData: false,
        error: true,
        dataErr: action.payload.response
      };
    default:
      return state;
  }
};

export default trains;
