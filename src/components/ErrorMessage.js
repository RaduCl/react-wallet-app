import React  from 'react';

const ErrorMessage = ({message}) =>
    message !== ''
    ? <div className="alert">{message}</div>
    : null

export default ErrorMessage;