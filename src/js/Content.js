import React from 'react'
import Table from './Table'
import GamblerForm from './GamblerForm'
import HouseForm from './HouseForm'
class Content extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <div>
        { !this.props.housebetted?
          <HouseForm castHouseBetting={this.props.castHouseBetting}
                     house={this.props.house}/>
          : <label>House Betted</label>
        }
        <input type='text' value={this.props.house} placeholder='house account' onChange={this.props.handleAccountInput.bind(this,'house')}/>
        <p>House account: {this.props.house}</p>
        <hr/>
        { !this.props.gamblerbetter ?
          <GamblerForm castGamblerBetting={this.props.castGamblerBetting} />
          : <label>Gambler Betted</label>
        }
        <input type='text' value={this.props.gambler} placeholder='gambler account' onChange={this.props.handleAccountInput.bind(this,'gambler')}/>
        <p>Gambler account: {this.props.gambler}</p>
        <hr/>
        <button type='submit' class='btn btn-primary' onClick={(event)=>{
          event.preventDefault()
          this.props.getResult()
        }}>get your result</button>
        <p>{this.props.tips}</p>
      </div>
    )
  }
}

export default Content
