import './App.css';
import React from 'react';
import RedemptionList from './RedemptionList'
import { redemptions } from './data/redemptions';
import queryString from 'query-string'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redemptions: [],
    };
    this.broadcasterId = queryString.parse(window.location.search).b;
  }
  
  componentDidMount() {
    this.listen();
  }

  listen() {
    window.Echo.channel('redemptions.'+ this.broadcasterId).listen('RedemptionReceived', (e) => {
      const title = e.redemption.reward.title;
      const selected = redemptions.find(e => e.title === title);
  
      if (typeof selected === "undefined") {
        this.handleAddRedemption(e);
      } else {
        this.handleAddRedemption(e, selected.timer);
      }
    });
    
    window.Echo.private('redemptions.'+ this.broadcasterId).listenForWhisper('removed', (e) => {
      this.handleRemoveRedemption(e.event_id);
    });
  }

  handleRemoveRedemption(eventId) {
    let redemptions = this.state.redemptions;
    redemptions = redemptions.map((val, i) => {
      if(val.id === eventId) {
        val.visible = false;
      }
      return val;
    });

    this.setState({ redemptions: redemptions});
  }

  handleAddRedemption(event, timer) {
    console.log(event);
    this.setState({
      redemptions: this.state.redemptions.concat([{
        id: event.redemption.event_id,
        title: event.redemption.reward.title,
        redeemer: event.redemption.user_name,
        cost: event.redemption.reward.cost,
        timer: (timer === "") ? 0 : timer,
        message: event.user_input,
        image: event.redemption.image,
        visible: true
      }]),
    });
  }
  
  componentWillUnmount() {
    window.Echo.leaveChannel('redemptions.'+ this.broadcasterId);
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
