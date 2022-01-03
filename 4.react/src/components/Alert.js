import React, { useEffect } from 'react';

const Alert = ({ msg, setMsg, alert, setAlert }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setAlert('');
      setMsg('');
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line
  }, [alert, msg]);
  return <div className={`u-full-width ${alert}`}>{msg} </div>;
};

export default Alert;
