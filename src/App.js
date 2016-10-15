import React, { Component } from 'react';
import './App.css';
import Transaction from './Transaction';

class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      transactions: [
        {
          amount: 111,
          type: 'deposit',
          date: 'Sat Oct 11 2016 15:11:37 GMT+0300 (EEST)'
        },
        {
          amount: 222,
          type: 'withdraw',
          date: 'Sat Oct 15 2016 23:11:37 GMT+0300 (EEST)',
        }
      ],
    }
  }

  transactions(transactions) {
    return transactions.map(transaction => <Transaction transaction={transaction} />)
  }

  render() {
    return (
      <div className="App">

        <div className="App-header">
          <img className="logo" src="/wallet-logo.png"></img>
          <nav>
            <a href="/">HOME</a>
            <a href="/">RESET WALLET</a>
            <a href="https://github.com/RaduCl/react-wallet-app" target="blank">SOURCE</a>
          </nav>
        </div>

        <div className="app-container" >

          <div className="app-body" >
            <div className="wallet-controls" >
              <button>Add</button>
              <input
                type="text"
                placeholder="Enter amount here"
              ></input>
              <button>Retrieve</button>
            </div>

            <div className="wallet-entries" >
              {this.transactions(this.state.transactions)}
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default App;
