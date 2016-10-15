import React, { Component } from 'react';
import './App.css';
// import minusIcon from './minus.svg';

class App extends Component {
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
              <div className="transaction-entry" >
                <div className="transaction-icon-retrieve" ></div>
                <span>$ 250</span>
                <span>25 Sep 2016 15:04</span>
              </div>

              <div className="transaction-entry" >
                <div className="transaction-icon-add" ></div>
                <span>$ 500</span>
                <span>22 Sep 2016 17:54</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default App;
