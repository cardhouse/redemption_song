import React from 'react';
import Redemption from './Redemption'
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redemptions: [],
      newRedemption: {
        name: '',
        timer: null
      },
    };
  }

  removeRedemption(id) {
    var redemptions = this.state.redemptions;
    delete redemptions[id];
    this.setState({
      redemptions: redemptions
    });
  }

  addRedemption() {
    const nameInput = document.getElementById('redemption_name');
    const timerInput = document.getElementById('redemption_timer');
    this.setState({
      redemptions: this.state.redemptions.concat([{
        title: nameInput.value,
        timer: (timerInput.value === "") ? 0 : timerInput.value
      }]),
    });
    nameInput.value = '';
    timerInput.value = 0;
  }

  renderRedemption(redemption, index) {
    return (
        <Redemption 
          title={redemption.title} 
          id={index} handleRemove={(index) => this.removeRedemption(index)} 
          timer={redemption.timer}
        />
      ) 
  }

  render() {
    const redemptions = this.state.redemptions.slice();
    const redemptionList = redemptions.map((redem, index) => <li key={index}>{this.renderRedemption(redem, index)}</li>);
    return(
      <div>
        <h1>Redemptions</h1>
        <ol>{redemptionList}</ol>
        <div>
        <label htmlFor="redemption_name">Name:</label>
          <input 
            id="redemption_name"
            type="text" 
            defaultValue=""
            placeholder="Name of redemption" />
            <br />
          <label htmlFor="redemption_timer">Timer:</label>
          <input 
            id="redemption_timer"
            type="number" 
            defaultValue="0"
            placeholder="Number of minutes" />
            <br />
          <button onClick={() => this.addRedemption()}>Add redemption</button>
        </div>
      </div>
    );
  }
}

export default App;
