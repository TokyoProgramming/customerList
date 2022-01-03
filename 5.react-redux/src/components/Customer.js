import React, { useState, useEffect } from 'react';

import { useDispatch } from 'react-redux';

import { addCustomerToList } from '../actions/customerAction';
import { alertControl } from '../actions/alertAction';

const Customer = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [age, setAge] = useState('');

  const dispatch = useDispatch();
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
      dispatch(alertControl('error', 'complete information'));
    } else if (emailChecker === false) {
      setEmail('');
      dispatch(alertControl('error', 'inValid Email'));
    } else {
      const newCustomerList = {
        id: Math.random() * 1000,
        name,
        email,
        location,
        age,
      };

      dispatch(addCustomerToList(newCustomerList));
      dispatch(alertControl('success', 'customer created'));
      initState();
    }
  };

  useEffect(() => {}, [dispatch]);

  return (
    <>
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
    </>
  );
};

export default Customer;
