import {
  ALERT_REQUEST,
  ALERT_SUCCESS,
  ALERT_DELETE,
  ALERT_FAIL,
} from '../constants/alertConstant';

export const alertControl = (alertType, msg) => (dispatch) => {
  try {
    dispatch({
      type: ALERT_REQUEST,
    });
    dispatch({
      type: ALERT_SUCCESS,
      payload: { alertType, msg },
    });

    setTimeout(() => {
      dispatch({ type: ALERT_DELETE });
    }, 3000);
  } catch (error) {
    dispatch({
      type: ALERT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
