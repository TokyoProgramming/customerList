import React from 'react';

const CustomerList = ({ customers, deleteHandler }) => {
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
