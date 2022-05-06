import React, { Component } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./getWeb3";
import "./App.css";
import tweet from './tweet'

class App extends Component {
  state = { web3: null, accounts: null, contract: null, tweets:[], text:"",username: "user420" };
  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SimpleStorageContract.networks[networkId];
      const instance = new web3.eth.Contract(
        SimpleStorageContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  runExample = async () => {
    /* const { accounts, contract } = this.state;

    // Stores a given value, 5 by default.
    await contract.methods.set(5).send({ from: accounts[0] });

    // Get the value from the contract to prove it worked.
    const response = await contract.methods.get().call();

    // Update state with the result.
    this.setState({ storageValue: response }); */
    /* const response = await contract.methods.GetTweets().call();
    this.setState({ tweets: response }); */
  };

  TweetSubmitter = async (e) => {
    e.preventDefault()
    // await contract.methods.Tweet(this.state.text,this.state.username).send({ from: accounts[0] })
  }

  TweetGen = async (e) => {
    e.preventDefault()
    this.setState({text:e.target.value})
  }

  render() {
    /* if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    } */
    return (
    <div className="App">
      <div className="header">
        <form onsubmit={this.TweetSubmitter}>
          <input type="text" name="post" id="post" placeholder="What's on your mind?" onChange={this.TweetGen} />
        </form>
      </div>
        {this.state.tweets.map((tweet) => {
          <Tweet post={tweet} contract={this.state.contract} account={this.state.accounts[0]} />
        })}
    </div>
    );
  }
}

export default App;
