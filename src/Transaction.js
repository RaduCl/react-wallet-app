import React, { PropTypes } from 'react';

const Transaction = ({transaction}) => (
  <div className="transaction-entry" >
    <div className={"transaction-icon-" + transaction.type} ></div>
    <span>$ {transaction.amount}</span>
    <span>{transaction.date.slice(0, -19)}</span>
  </div>
)

export default Transaction;