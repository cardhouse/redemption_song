import './App.css';
import React from 'react';
import RedemptionList from './RedemptionList'
import { redemptions } from './data/redemptions';
import Echo from 'laravel-echo';

window.Pusher = require('pusher-js');

window.Echo = new Echo({
    broadcaster: 'pusher',
    key: '4ccf3005de75c66366d9',
    cluster: 'us2',
    forceTLS: true
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redemptions: [],
    };
  }

  componentDidMount() {
    this.listen();
  }

  listen() {
    window.Echo.channel('redemptions.548965051').listen('RedemptionReceived', (e) => {
      const title = e.redemption.reward.title;
      const selected = redemptions.find(e => e.title === title);
  
      if (typeof selected === "undefined") {
        this.handleAddRedemption(e);
      } else {
        this.handleAddRedemption(e, selected.timer);
      }
    });
    window.Echo.channel('redemptions.548965051').listen('RedemptionRemoved', (e) => {
        this.handleRemoveRedemption(e);
    });
  }

  handleRemoveRedemption(e) {
    console.log(e);

    var redemptions = this.state.redemptions;
    console.log(redemptions);
    const id = this.findIndex(redemptions, 'id', e.redemption.event_id);
    console.log(id);
    // Remove the redemption with the id of {blah}
    delete redemptions[id];
    this.setState({
      redemptions: redemptions
    });
  }

  findIndex(array, key, value) {
    for (let index = 0; index < array.length; index++) {
      if (array[index][key] === value) {
        return index;
      }
    }
    return -1;
  }

  handleAddRedemption(event, timer) {
    console.log(event);
    this.setState({
      redemptions: this.state.redemptions.concat([{
        id: event.redemption.event_id,
        title: event.redemption.reward.title,
        redeemer: event.redemption.user_name,
        cost: event.redemption.reward.cost,
        timer: (timer === "") ? 0 : timer
      }]),
    });
  }
  
  componentWillUnmount() {
    window.Echo.leaveChannel('redemptions-548965051');
  }

  render() {
    return(
      <div>
        <RedemptionList 
          redemptions={this.state.redemptions}
          remove={(id) => this.handleRemoveRedemption(id)} 
        />
      </div>
    );
  }
}

export default App;
