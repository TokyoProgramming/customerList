import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

const Alert = () => {
  const alert = useSelector((state) => state.alert);
  const { alertType, message } = alert;

  useEffect(() => {}, [alertType, message]);

  return <div className={`u-full-width ${alertType}`}>{message} </div>;
};

export default Alert;
