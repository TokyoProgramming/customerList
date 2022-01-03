import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCustomerToList } from '../actions/customerAction';

const CustomerList = () => {
  const dispatch = useDispatch();

  const customer = useSelector((state) => state.customer);
  const { loading, success, customer: customers } = customer;

  useEffect(() => {}, [loading, success, customers, dispatch]);

  const deleteHandler = (id) => {
    dispatch(deleteCustomerToList(id));
  };

  return (
    <table className="u-full-width">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Age</th>
          <th>Location</th>
          <th></th>
        </tr>
      </thead>
      {customers.map((customer) => (
        <tbody key={customer.id}>
          <tr>
            <td>{customer.name} </td>
            <td>{customer.email} </td>
            <td>{customer.age} </td>
            <td>{customer.location} </td>
            <td
              className="delete-button"
              onClick={() => deleteHandler(customer.id)}
            >
              X
            </td>
          </tr>
        </tbody>
      ))}
    </table>
  );
};

export default CustomerList;
