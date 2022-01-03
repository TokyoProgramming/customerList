import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCustomerCtr, getCustomersCtr } from '../actions/customerAction';
import { UPDATE_CUSTOMER_SET } from '../constants/customerConstant';

const CustomerList = () => {
  const dispatch = useDispatch();

  const getCustomer = useSelector((state) => state.getCustomer);
  const { loading: getCustomerLoading, customers } = getCustomer;

  const addCustomer = useSelector((state) => state.addCustomer);
  const { loading, success } = addCustomer;

  const deleteCustomer = useSelector((state) => state.deleteCustomer);
  const { loading: deleteLoading, success: deleteSuccess } = deleteCustomer;

  const updateCustomer = useSelector((state) => state.updateCustomer);
  const { loading: updateLoading, success: updateSuccess } = updateCustomer;

  const deleteHandler = (e, id) => {
    e.preventDefault();
    dispatch(deleteCustomerCtr(id));
  };

  const updateHandler = (e, customerInfo) => {
    e.preventDefault();
    dispatch({
      type: UPDATE_CUSTOMER_SET,
      payload: customerInfo,
    });
  };

  useEffect(() => {
    dispatch(getCustomersCtr());
  }, [
    loading,
    success,
    deleteLoading,
    deleteSuccess,
    updateLoading,
    updateSuccess,
    dispatch,
  ]);

  return getCustomerLoading || deleteLoading ? (
    <h1>loading ... </h1>
  ) : (
    <table className="u-full-width">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Age</th>
          <th>Location</th>
          <th>Update</th>
          <th>Delete</th>
        </tr>
      </thead>
      {customers.map((customer) => (
        <tbody key={customer._id}>
          <tr>
            <td>{customer.name} </td>
            <td>{customer.email} </td>
            <td>{customer.age} </td>
            <td>{customer.location} </td>
            <td>
              <button
                className="update-button"
                onClick={(e) => updateHandler(e, customer)}
              >
                Update
              </button>
            </td>
            <td>
              <button
                className="delete-button"
                onClick={(e) => deleteHandler(e, customer._id)}
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      ))}
    </table>
  );
};

export default CustomerList;
