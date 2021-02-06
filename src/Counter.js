import React from 'react'
import queryString from 'query-string'

export default class Counter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            redemption: queryString.parse(window.location.search).r,
            name: '',
            image: '',
            color: '',
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
                color: data.color,
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
            <div className="flex h-screen items-center justify-around py-3 px-5 rounded-full shadow-md" style={{ backgroundColor: this.state.color }}>
                <img className="max-w-12 mr-3" src={this.state.image} alt="" />
                <div className={'sm:flex flex-col hidden text-center'}>
                    <span className="text-sm">How many</span>
                    <span className="text-xl font-bold">{ this.state.name}</span>
                </div>
                <span className="text-4xl">{this.state.count}</span>
            </div>
        )
    }
}