import { GET_CITY, DISPLAY_CITY, GET_CITY_DETAILS } from "../actions/types.js";

const initialState = {
  city: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_CITY:
      return {
        ...state,
        city: action.payload,
      };
    case DISPLAY_CITY:
      return {
        ...state,
        city: action.payload,
      };
    case GET_CITY_DETAILS:
      return {
        ...state,
        cityDetails: action.payload,
      };
    default:
      return state;
  }
}
