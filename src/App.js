import React from 'react';
import RedemptionList from './RedemptionList'
import Chatbot from './TwitchChat'
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
        <h1>Redemptions</h1>
        <RedemptionList 
          redemptions={this.state.redemptions} 
          add={(name, timer) => this.handleAddRedemption(name, timer)} 
          remove={(id) => this.handleRemoveRedemption(id)} 
        />
        <Chatbot addRedemption={(name, timer) => this.handleAddRedemption(name, timer)} />
      </div>
    );
  }
}

export default App;
