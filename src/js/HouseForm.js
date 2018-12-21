import React from 'react'

class HouseForm extends React.Component {

  render() {
    console.log(this.props.house)
    console.log(this.props.castHouseBetting)
    return (
      <form onSubmit={(event) => {
        event.preventDefault()
      //  this.props.castVote(this.candidateId.value)
        this.props.castHouseBetting(this.bettingnumber.value)
      }}>
        <div class='form-group'>
          <label>Put the money you wanna bet here in eth</label>
          <select ref={(input) => this.bettingnumber = input} class='form-control'>
           <option value="1">1 eth</option>
           <option value="2">2 eth</option>
           <option value="3">3 eth</option>
          </select>

          
        </div>
        <button type='submit' class='btn btn-primary'>House Bets here</button>
        <hr />
      </form>
    )
  }
}

export default HouseForm
