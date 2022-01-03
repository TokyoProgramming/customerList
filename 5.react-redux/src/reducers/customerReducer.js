import {
  CUSTOMER_ADD_REQUEST,
  CUSTOMER_ADD_SUCCESS,
  CUSTOMER_ADD_FAIL,
  CUSTOMER_DELETE_REQUEST,
  CUSTOMER_DELETE_SUCCESS,
  CUSTOMER_DELETE_FAIL,
} from '../constants/customerConstant';

export const customerReducer = (state = { customer: [] }, action) => {
  const { type, payload } = action;
  switch (type) {
    case CUSTOMER_DELETE_REQUEST:
    case CUSTOMER_ADD_REQUEST:
      return { loading: true, ...state };
    case CUSTOMER_ADD_SUCCESS:
      return {
        loading: false,
        success: true,
        customer: [...state.customer, payload],
      };
    case CUSTOMER_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
        customer: state.customer.filter((x) => x.id !== payload),
      };
    case CUSTOMER_DELETE_FAIL:
    case CUSTOMER_ADD_FAIL:
      return { loading: false, error: payload };
    default:
      return state;
  }
};
