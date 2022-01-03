import React, { useState, useEffect } from 'react';
import Alert from './Alert';
import CustomerList from './CustomerList';

const Customer = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [age, setAge] = useState('');

  const [customers, setCustomers] = useState([]);

  const [msg, setMsg] = useState('');
  const [alert, setAlert] = useState('');

  const validateEmail = (mail) => {
    var re = /\S+@\S+\.\S+/;
    return re.test(mail);
  };

  const initState = () => {
    setName('');
    setEmail('');
    setLocation('');
    setAge('');
  };

  const createCustomerList = (e) => {
    e.preventDefault();
    const emailChecker = validateEmail(email);
    if (name === '' || email === '' || location === '' || age === '') {
      setMsg('complete information');
      setAlert('error');
    } else if (emailChecker === false) {
      setEmail('');
      setMsg('invalid Email');
      setAlert('error');
    } else {
      const newCustomerList = {
        id: Math.random() * 1000,
        name,
        email,
        location,
        age,
      };

      setCustomers([...customers, newCustomerList]);
      setMsg('customer created');
      setAlert('success');
      initState();
    }
  };

  useEffect(() => {}, [customers, alert]);

  // Delete
  const deleteHandler = (id) => {
    setCustomers(customers.filter((customer) => customer.id !== id));
    setMsg('customer deleted');
    setAlert('delete');
  };

  return (
    <div className="container">
      <h1>Customer List</h1>
      {alert !== '' && (
        <Alert msg={msg} setMsg={setMsg} alert={alert} setAlert={setAlert} />
      )}
      <form>
        <div className="row">
          <div className="six columns">
            <label>Name</label>
            <input
              className="u-full-width"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="six columns">
            <label>Email</label>
            <input
              className="u-full-width"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className="row">
          <div className="eight columns">
            <label>Location</label>
            <input
              className="u-full-width"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div className="four columns">
            <label>Age</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
        </div>
        <div className="">
          <input
            className="u-full-width"
            type="submit"
            value="Submit"
            onClick={createCustomerList}
          />
        </div>
      </form>
      <CustomerList customers={customers} deleteHandler={deleteHandler} />
    </div>
  );
};

export default Customer;
