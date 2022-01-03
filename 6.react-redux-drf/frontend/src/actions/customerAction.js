import { ALERT_SUCCESS, ALERT_DELETE } from '../constants/alertConstant';
import {
  GET_CUSTOMER_REQUEST,
  GET_CUSTOMER_SUCCESS,
  GET_CUSTOMER_FAIL,
  DELETE_CUSTOMER_SUCCESS,
  DELETE_CUSTOMER_REQUEST,
  DELETE_CUSTOMER_FAIL,
  ADD_CUSTOMER_SUCCESS,
  ADD_CUSTOMER_REQUEST,
  ADD_CUSTOMER_FAIL,
  UPDATE_CUSTOMER_REQUEST,
  UPDATE_CUSTOMER_SUCCESS,
  UPDATE_CUSTOMER_FAIL,
  UPDATE_CUSTOMER_RESET,
} from '../constants/customerConstant';
import axios from 'axios';

export const getCustomersCtr = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_CUSTOMER_REQUEST,
    });
    const { data } = await axios.get('/api/customer/');

    dispatch({
      type: GET_CUSTOMER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_CUSTOMER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addCustomerCtr = (newCustomer) => async (dispatch) => {
  try {
    dispatch({
      type: ADD_CUSTOMER_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      '/api/customer/',
      {
        name: newCustomer.name,
        email: newCustomer.email,
        location: newCustomer.location,
        age: newCustomer.age,
      },
      config
    );

    dispatch({
      type: ADD_CUSTOMER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADD_CUSTOMER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteCustomerCtr = (id) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_CUSTOMER_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    console.log(id);

    await axios.delete(`/api/customer/${id}/`, config);

    dispatch({
      type: DELETE_CUSTOMER_SUCCESS,
    });

    dispatch({
      type: ALERT_SUCCESS,
      payload: { alertType: 'delete', msg: 'customer deleted' },
    });

    setTimeout(() => {
      dispatch({ type: ALERT_DELETE });
    }, 3000);
  } catch (error) {
    dispatch({
      type: DELETE_CUSTOMER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateCustomerCtr = (id, customer) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_CUSTOMER_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    await axios.put(
      `/api/customer/${id}/`,
      {
        name: customer.name,
        email: customer.email,
        location: customer.location,
        age: customer.age,
      },
      config
    );

    dispatch({
      type: UPDATE_CUSTOMER_SUCCESS,
    });

    dispatch({
      type: UPDATE_CUSTOMER_RESET,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_CUSTOMER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
