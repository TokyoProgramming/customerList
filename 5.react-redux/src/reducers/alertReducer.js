import {
  ALERT_REQUEST,
  ALERT_SUCCESS,
  ALERT_DELETE,
  ALERT_FAIL,
} from '../constants/alertConstant';

export const alertReducer = (
  state = { alertType: '', message: '' },
  action
) => {
  const { type, payload } = action;

  switch (type) {
    case ALERT_REQUEST:
      return { loading: true, ...state };
    case ALERT_SUCCESS:
      return {
        loading: false,
        success: true,
        alertType: payload.alertType,
        message: payload.msg,
      };
    case ALERT_DELETE:
      return {
        loading: false,
        success: true,
        alertType: '',
        message: '',
      };
    case ALERT_FAIL:
      return { loading: false, error: payload };
    default:
      return state;
  }
};
