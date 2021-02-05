import React from 'react'
import queryString from 'query-string'

export default class Counter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            redemption: queryString.parse(window.location.search).r,
            name: '',
            count: 0
        };
        this.broadcasterId = queryString.parse(window.location.search).b;
    }

    componentDidMount() {
        this.listen()
        this.init()
    }

    async init() {
        fetch(`http://cardhouse.online/api/start/${this.broadcasterId}/counter?reward_id=${this.state.redemption}`)
        .then(response => response.json())
        .then(data => {
            this.setState({
                name: data.name,
                count: data.count
            })
        })
        .catch(e => {
            console.log(e);
        });
    }

    listen() {
        window.Echo.channel('redemptions.' + this.broadcasterId).listen('CountUpdated', (e) => {
            console.log(e.redemption.reward.id, this.state.redemption);
            if (e.redemption.reward.id === this.state.redemption) {
                this.setState({ count: e.count });
            }
        });
    }

    componentWillUnmount() {
        window.Echo.leaveChannel('redemptions.' + this.broadcasterId);
    }

    render() {
        return (
            <div className="card">
                <ul>
                    <li>{ this.state.name}</li>
                    <li>{this.state.count}</li>
                </ul>
            </div>
        )
    }
}