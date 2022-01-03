import { ALERT_SUCCESS, ALERT_DELETE } from '../constants/alertConstant';
import {
  CUSTOMER_ADD_SUCCESS,
  CUSTOMER_ADD_REQUEST,
  CUSTOMER_ADD_FAIL,
  CUSTOMER_DELETE_SUCCESS,
  CUSTOMER_DELETE_REQUEST,
  CUSTOMER_DELETE_FAIL,
} from '../constants/customerConstant';

export const addCustomerToList = (data) => (dispatch) => {
  const { email } = data;
  try {
    dispatch({
      type: CUSTOMER_ADD_REQUEST,
    });

    const validateEmail = (mail) => {
      var re = /\S+@\S+\.\S+/;
      return re.test(mail);
    };

    const validate = validateEmail(email);
    if (validate) {
      dispatch({
        type: CUSTOMER_ADD_SUCCESS,
        payload: data,
      });
    }
  } catch (error) {
    dispatch({
      type: CUSTOMER_ADD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteCustomerToList = (id) => (dispatch) => {
  try {
    dispatch({
      type: CUSTOMER_DELETE_REQUEST,
    });

    dispatch({
      type: CUSTOMER_DELETE_SUCCESS,
      payload: id,
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
      type: CUSTOMER_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
