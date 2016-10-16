import React, { PropTypes } from 'react';

const ErrorMessage = ({message}) => {
    console.log('message', message);
  return message !== '' ? <div className="alert">{message}</div> : null
}

export default ErrorMessage;