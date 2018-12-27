import React from 'react'

class GamblerForm extends React.Component {
  constructor(props){
    super(props);
  }
  render() {

    return (
      <form onSubmit={(event) => {
        event.preventDefault()
      //  this.props.castVote(this.candidateId.value)
        this.props.castGamblerBetting(this.bettingnumber.value,this.guess.value)
      }}>
        <div class='form-group'>
          <label>Put the money you wanna bet here in eth</label>
          <select ref={(input) => this.bettingnumber = input} class='form-control'>
           <option value="0">0 eth</option>
           <option value="1">1 eth</option>
           <option value="2">2 eth</option>
           <option value="3">3 eth</option>
          </select>
          
          <label>Select your guess here</label>
          <select ref={(input) => this.guess = input} class='form-control'>
           <option value="0">Head</option>
           <option value="1">Tail</option>
          </select>
        </div>
        <button type='submit' class='btn btn-primary'>Gambler Bets here</button>
        <hr />
      </form>
    )
  }
}

export default GamblerForm
