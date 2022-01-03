import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import {
  deleteCustomerReducer,
  getCustomerReducer,
  addCustomerReducer,
  updateCustomerReducer,
} from './reducers/customerReducer';
import { alertReducer } from './reducers/alertReducer';

const reducer = combineReducers({
  getCustomer: getCustomerReducer,
  addCustomer: addCustomerReducer,
  deleteCustomer: deleteCustomerReducer,
  updateCustomer: updateCustomerReducer,
  alert: alertReducer,
});

const initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
