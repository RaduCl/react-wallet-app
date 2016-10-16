import React, { Component } from 'react';
import './App.css';
import Transaction from './components/Transaction';
import ErrorMessage from './components/ErrorMessage';
import TotalBalance from './components/TotalBalance'

class App extends Component {

  constructor(props){
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);
    this.makeTransaction = this.makeTransaction.bind(this);
    this.makeTotalBalance = this.makeTotalBalance.bind(this);

    this.state = {

      inputAmount: '',

      transactions: [
        {
          amount: 222,
          type: 'deposit',
          date: 'Sat Oct 11 2016 15:11:37 GMT+0300 (EEST)'
        },
        {
          amount: 111,
          type: 'withdraw',
          date: 'Sat Oct 15 2016 23:11:37 GMT+0300 (EEST)',
        }
      ],

      validationsErrors: '',

    }
  }

  transactions(transactions) {
    return transactions.map(transaction => <Transaction transaction={transaction} />)
  }

  handleInputChange(e) {
    console.log('amount', e.target.value);
    this.setState({inputAmount: e.target.value});
  }

  makeTransaction(e) {
    e.preventDefault();

    // console.log('this.state.inputAmount', this.state.inputAmount)

    const newTransaction = {
      amount: parseFloat(this.state.inputAmount),
      type: e.target.value,
      date: String(new Date()),
    };

    console.log("newTransaction", newTransaction);

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

  isValidInput(input) {
    const regex = /^[+]?[1-9]\d*$/;
    return regex.test(input);
  }

  makeTotalBalance() {
    return this.state.transactions
      // .map(x => x.amount)
      .reduce((acc, x) =>
        x.type === 'deposit'
        ? acc + x.amount
        : acc - x.amount, 0)
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
