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
        <p>House account: {this.props.house}</p>
        <hr/>
        { !this.props.gamblerbetter ?
          <GamblerForm castGamblerBetting={this.props.castGamblerBetting} />
          : <label>Gambler Betted</label>
        }
        <p>Gambler account: {this.props.gambler}</p>
        <label>Result:</label>
        <p>{this.props.tips}</p>
      </div>
    )
  }
}

export default Content
