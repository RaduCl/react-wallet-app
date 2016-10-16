import React, { Component } from 'react';
import './App.css';

import Transaction from './components/Transaction';
import ErrorMessage from './components/ErrorMessage';
import TotalBalance from './components/TotalBalance'

const LOCAL_STORAGE_KEY = 'walletAppState';

class App extends Component {

  constructor(props){
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);
    this.makeTransaction = this.makeTransaction.bind(this);
    this.makeTotalBalance = this.makeTotalBalance.bind(this);

    this.state = {

      inputAmount: '',

      transactions: [
      ],

      validationsErrors: '',

    }

  }

  componentDidMount() {
    // load state from local storage if available
    if(this.state.transactions.length === 0
      && localStorage[LOCAL_STORAGE_KEY] !== undefined) {
      this.setState( JSON.parse(localStorage[LOCAL_STORAGE_KEY]) );
    }
  }

  componentDidUpdate() {
    // save state to local storage
    localStorage[LOCAL_STORAGE_KEY] = JSON.stringify(this.state);
  }

  /**
   * generates transaction nodes
   */
  transactions(transactions) {
    return transactions.map((transaction, index) => <Transaction key={index} transaction={transaction} />)
  }

  /**
   * bind amount from input field to state object
   */
  handleInputChange(e) {
    this.setState({inputAmount: parseFloat(e.target.value)});
  }

  /**
   * create new item in the transactions array
   */
  makeTransaction(e) {
    e.preventDefault();

    const newTransaction = {
      amount: parseFloat(this.state.inputAmount),
      type: e.target.value,
      date: String(new Date()),
    };

    // console.log("newTransaction", newTransaction);

    if(!this.isValidInput(this.state.inputAmount)) {
      this.setState({ validationsErrors: "Only positive numbers are alowed."})
      return;
    }

    if( newTransaction.type === 'withdraw' && this.makeTotalBalance() - newTransaction.amount < 0) {
      this.setState({ validationsErrors: "Insuficient funds."})
      return;
    }

    this.setState({ 
      transactions: this.state.transactions.concat(newTransaction),
      inputAmount: '',
      validationsErrors: '',
    })

  }

  /**
   * regex test for valid integer positive numbers
   */
  isValidInput(input) {
    const regex = /^[+]?[1-9]\d*$/;
    return regex.test(input);
  }

  /**
   * Summs amounts of all transaction entries
   */
  makeTotalBalance() {
    return this.state.transactions
      .reduce((acc, x) =>
        x.type === 'deposit'
        ? acc + x.amount
        : acc - x.amount, 0)
  }

  /**
   * remove app state key from localStorage
   */
  resetWallet(e) {
    e.preventDefault();
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  }

  render() {
    return (
      <div className="App">

        <div className="App-header">
          <img className="logo" src="/wallet-logo.png"></img>
          <nav>
            <a href="/">HOME</a>
            <a
              href="/"
              onClick={this.resetWallet}
            >RESET WALLET</a>
            <a href="https://github.com/RaduCl/react-wallet-app" target="blank">SOURCE</a>
          </nav>
        </div>

        <div className="app-container" >

          <div className="app-body" >

            <TotalBalance balance={this.makeTotalBalance()} />

            <form className="wallet-controls">
              <button
                type="submit"
                onClick={this.makeTransaction}
                value="deposit"
              >Deposit</button>

              <input
                value={this.state.inputAmount}
                onChange={this.handleInputChange}
                type="text"
                placeholder="Enter amount here"
              ></input>

              <button
                type="submit"
                value="withdraw"
                onClick={this.makeTransaction}
              >Withdraw</button>
            </form>

            <ErrorMessage message={this.state.validationsErrors} />

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
