import {
  GET_CUSTOMER_REQUEST,
  GET_CUSTOMER_SUCCESS,
  GET_CUSTOMER_FAIL,
  ADD_CUSTOMER_SUCCESS,
  ADD_CUSTOMER_REQUEST,
  ADD_CUSTOMER_FAIL,
  DELETE_CUSTOMER_SUCCESS,
  DELETE_CUSTOMER_REQUEST,
  DELETE_CUSTOMER_FAIL,
  UPDATE_CUSTOMER_SUCCESS,
  UPDATE_CUSTOMER_REQUEST,
  UPDATE_CUSTOMER_FAIL,
  UPDATE_CUSTOMER_SET,
  UPDATE_CUSTOMER_RESET,
} from '../constants/customerConstant';

export const getCustomerReducer = (state = { customers: [] }, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_CUSTOMER_REQUEST:
      return { loading: true, customers: [] };
    case GET_CUSTOMER_SUCCESS:
      return { loading: false, customers: payload };
    case GET_CUSTOMER_FAIL:
      return { loading: false, error: payload };
    default:
      return state;
  }
};

export const addCustomerReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_CUSTOMER_REQUEST:
      return { loading: true };
    case ADD_CUSTOMER_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case ADD_CUSTOMER_FAIL:
      return { loading: false, error: payload };
    default:
      return state;
  }
};

export const deleteCustomerReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case DELETE_CUSTOMER_REQUEST:
      return { loading: true };
    case DELETE_CUSTOMER_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case DELETE_CUSTOMER_FAIL:
      return { loading: false, error: payload };
    default:
      return state;
  }
};

export const updateCustomerReducer = (
  state = { setCustomer: false, data: {} },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_CUSTOMER_SET:
      return { setCustomer: true, data: payload };
    case UPDATE_CUSTOMER_REQUEST:
      return { setCustomer: false, loading: true };
    case UPDATE_CUSTOMER_SUCCESS:
      return {
        setCustomer: false,
        loading: false,
        success: true,
      };
    case UPDATE_CUSTOMER_FAIL:
      return { loading: false, error: payload };
    case UPDATE_CUSTOMER_RESET:
      return { setCustomer: false };
    default:
      return state;
  }
};
