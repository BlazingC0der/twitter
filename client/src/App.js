import React, { Component } from "react";
import TwitterContract from "./contracts/Tweets.json";
import getWeb3 from "./getWeb3";
import "./App.css";
import Tweet from './tweet'
import keccak256 from "keccak256";

class App extends Component {
  constructor(props){
    super(props)
    this.state={
      web3: null,
      accounts: null,
      contract: null,
      tweets: [{ text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatum vero ducimus molestias", user: "user420", replies: [], likes: 0 }],
      text: "",
      username: "user420"
    }
  }
  //state = { web3: null, accounts: null, contract: null, tweets:[], text:"",username: "user420" };
  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();

      const deployedNetwork = TwitterContract.networks[networkId];
      const instance = new web3.eth.Contract(
        TwitterContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  HandleSubmit = async (e) => {
    e.preventDefault()
    document.querySelector("#post").value=""
    let hash = keccak256(this.state.text+0)
    this.setState({tweets:[...this.state.tweets, { text: this.state.text, user: this.state.username, replies: [], likes: 0 }]},()=>console.log(this.state.tweets));
    await this.state.contract.methods.TweetVerify(this.state.text, 0, hash).send({ from: this.state.accounts[0] })
    // await contract.methods.Tweet(this.state.text,this.state.username).send({ from: accounts[0] })
  }

  TweetGen = async (e) => {
    this.setState({text:e.target.value})
  }

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    } 
    return (
    <div className="App">
      <div className="header">
        <form onSubmit={this.HandleSubmit}>
          <input type="text" name="post" id="post" placeholder="What's on your mind?" onChange={this.TweetGen} />
        </form>
      </div>
        {this.state.tweets.map((tweet, index) => (
          <div key={index}><Tweet post={tweet} contract={this.state.contract} account={this.state.accounts[0]} encrypt={keccak256} /></div>
        ))}
    </div>
    );
  }
}

export default App;
