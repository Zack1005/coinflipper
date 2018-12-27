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
    //  gambler:'0xd9C72935A9baDF366f4866B052be2D1959a28B28',
    //  house:'0x346b4950810B8df3f92ad7d120E4e42f8A0d004B',
      gambler:'',
      house:'',
      betting:false,
      loading:true,
      housebetted:false,
      gamblerbetted:false,
      tips:"",
      contractBalance:0,
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
    this.getResult=this.getResult.bind(this)
    this.handleAccountInput=this.handleAccountInput.bind(this)

  }

  componentDidMount() {

    this.coinFlipper.deployed().then((instance) => {
      console.log(instance)
      this.coinFlipperInstance=instance
      this.setState({loading:false})
    })
  }


  castHouseBetting(money){
    this.setState({betting:true})
    this.coinFlipperInstance.HouseBetting({from: this.state.house,value:this.web3.toWei(parseInt(money), "ether"),gas:420000})
  //  this.coinFlipperInstance.getEndowmentBalance().then(c=>{var n=c.toNumber();his.setState(contractBalance:n)})
  //  this.coinFlipperInstance.getEndowmentBalance().then(console.log)
  }

  castGamblerBetting(money,guess){
    this.setState({betting:true})
    this.coinFlipperInstance.betAndFlip(guess,{from:this.state.gambler,value:this.web3.toWei(parseInt(money), "ether"),gas:420000})
  //  
    
  }
  getResult(){
    this.coinFlipperInstance.getResultOfLastFlip().then(tip => {this.setState({tips:tip})})
  }

  handleAccountInput(type,e){
    var account=e.target.value
    console.log(account)
    if (type==='gambler'){
      this.setState({gambler:account})
    }else{
      this.setState({house:account})
    }
  }

  render() {

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
                   castHouseBetting={this.castHouseBetting}
                   tips={this.state.tips}
                   contractBalance={this.state.contractBalance}
                   getResult={this.getResult}
                   handleAccountInput={this.handleAccountInput}/>
         
        </div>
      </div>
    )
  }
}

ReactDOM.render(
   <App />,
   document.querySelector('#root')
)
