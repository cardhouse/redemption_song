import React from 'react'
import queryString from 'query-string'

export default class Counter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            redemption: queryString.parse(window.location.search).r,
            name: '',
            image: '',
            count: 0
        };
        this.broadcasterId = queryString.parse(window.location.search).b;
    }

    componentDidMount() {
        this.listen()
        this.init()
    }

    async init() {
        fetch(`https://cardhouse.online/api/start/${this.broadcasterId}/counter?reward_id=${this.state.redemption}`)
        .then(response => response.json())
        .then(data => {
            this.setState({
                name: data.name,
                image: data.image,
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
                <div className="card-icon">
					<img className="w-12 h-12" src={this.state.image} alt="" />
				</div>
                <div className="card-info">
                    <span className="username">
                        Current stream count
                    </span>
                    <h2>{ this.state.name}</h2>
                </div>
                <div className="card-time">
                    <p>{this.state.count}</p>
                </div>
            </div>
        )
    }
}