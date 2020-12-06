import React from 'react';
import RedemptionList from './RedemptionList'
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redemptions: [],
    };
  }

  handleRemoveRedemption(id) {
    var redemptions = this.state.redemptions;
    delete redemptions[id];
    this.setState({
      redemptions: redemptions
    });
  }

  handleAddRedemption(name, timer) {
    this.setState({
      redemptions: this.state.redemptions.concat([{
        title: name,
        timer: (timer === "") ? 0 : timer
      }]),
    });
  }

  render() {
    return(
      <div>
        <RedemptionList 
          redemptions={this.state.redemptions} 
          add={(name, timer) => this.handleAddRedemption(name, timer)} 
          remove={(id) => this.handleRemoveRedemption(id)} 
        />
      </div>
    );
  }
}

export default App;
