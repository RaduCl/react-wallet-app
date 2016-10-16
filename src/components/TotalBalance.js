import React, { PropTypes } from 'react';

const TotalBalance = ({balance}) => (
  <div className="balance-header" ><h2>Balance: $ {balance}</h2></div>
)

export default TotalBalance;