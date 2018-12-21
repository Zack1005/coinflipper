import React from 'react'
import ReactDOM from 'react-dom'
import Web3 from 'web3'
import TruffleContract from 'truffle-contract'
import CoinFlipper from '../../build/contracts/CoinFlipper.json'
import Content from './Content'
import 'bootstrap/dist/css/bootstrap.css'

class App extends React.Component {
  constructor(props) {
    super(props)
 
    this.state = {
      gambler:'0xd9C72935A9baDF366f4866B052be2D1959a28B28',
      house:'0x346b4950810B8df3f92ad7d120E4e42f8A0d004B',
      betting:false,
      loading:true,
      housebetted:false,
      gamblerbetted:false,
      tips:"",
    }
    if (typeof web3 != 'undefined') {
      this.web3Provider = web3.currentProvider
    } else {
      this.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545')
    }

    this.web3 = new Web3(this.web3Provider)

    this.coinFlipper = TruffleContract(CoinFlipper)
    this.coinFlipper.setProvider(this.web3Provider)

    this.castHouseBetting=this.castHouseBetting.bind(this)
    this.castGamblerBetting=this.castGamblerBetting.bind(this)

    // this.castVote = this.castVote.bind(this)
    // this.watchEvents = this.watchEvents.bind(this)
  }

  componentDidMount() {
    // TODO: Refactor with promise chain
    // this.web3.eth.getCoinbase((err, account) => {
    //   this.setState({ account })
    //   this.coinFlipper.deployed().then((electionInstance) => {
    //     this.electionInstance = electionInstance
    //     this.watchEvents()
    //     this.electionInstance.candidatesCount().then((candidatesCount) => {
    //       for (var i = 1; i <= candidatesCount; i++) {
    //         this.electionInstance.candidates(i).then((candidate) => {
    //           const candidates = [...this.state.candidates]
    //           candidates.push({
    //             id: candidate[0],
    //             name: candidate[1],
    //             voteCount: candidate[2]
    //           });
    //           this.setState({ candidates: candidates })
    //         });
    //       }
    //     })
    //     this.electionInstance.voters(this.state.account).then((hasVoted) => {
    //       console.log("false")
    //       this.setState({ hasVoted, loading: false })
    //     })
    //   })
    // })
    this.coinFlipper.deployed().then((instance) => {
      console.log(instance)
      this.coinFlipperInstance=instance
      this.setState({loading:false})
    })
  }

  // watchEvents() {
  //   // TODO: trigger event when vote is counted, not when component renders
  //   this.electionInstance.votedEvent({}, {
  //     fromBlock: 0,
  //     toBlock: 'latest'
  //   }).watch((error, event) => {
  //     this.setState({ voting: false })
  //   })
  // }

  // castVote(candidateId) {
  //   this.setState({ voting: true })
  //   this.electionInstance.vote(candidateId, { from: this.state.account }).then((result) =>
  //     this.setState({ hasVoted: true })
  //   )
  // }
  castHouseBetting(money){
    this.setState({betting:true})
    this.coinFlipperInstance.HouseBetting({from: this.state.house,value:this.web3.toWei(parseInt(money), "ether"),gas:420000})
  }

  castGamblerBetting(money,guess){
    this.setState({betting:true})
    this.coinFlipperInstance.betAndFlip(guess,{from:this.state.gambler,value:this.web3.toWei(parseInt(money), "ether"),gas:420000})
  }

  render() {
    //TODO: 
    return (
      <div class='row'>
        <div class='col-lg-12 text-center' >
          <h1>CoinFlipper Results</h1>
          <Content gambler={this.state.gambler}
                   house={this.state.house}
                   loading={this.state.loading}
                   betting={this.state.betting}
                   gamblerbetted={this.state.gamblerbetted}
                   housebetted={this.state.housebetted}
                   castGamblerBetting={this.castGamblerBetting}
                   castHouseBetting={this.castHouseBetting}/>
         
        </div>
      </div>
    )
  }
}

ReactDOM.render(
   <App />,
   document.querySelector('#root')
)
