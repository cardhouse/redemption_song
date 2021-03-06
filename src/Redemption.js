import React from 'react';

export default class Redemption extends React.Component {
	constructor(props) {
		super(props);
		this.interval = null;
		this.state = {
			timeRemaining: null,
			timerRunning: false,
			alerting: '',
			redeemed: ''
		}
	}

	componentDidMount() {
		if(this.props.timer > 0) {
			this.addTimer(this.props.timer);
		}
	}

	addTimer(minutes) {
		if (!process.env.REACT_APP_DISABLE_TIMERS) {
			this.setState({
				timeRemaining: minutes * 60,
				timerRunning: false
			});
		}
	}

	handleClick() {
		if (this.state.timerRunning || ! this.state.timeRemaining) {
			this.redeem();
			window.Echo.private('redemptions.548965051').whisper('removed', {
				event_id: this.props.id
			});
			this.props.handleRemove(this.props.id);
		} else {
			this.startTimer();
		}
	}
	
	startTimer() {
		this.interval = setInterval(() => this.countDown(), 1000);
		this.setState({
			timerRunning: true
		});
	}

	countDown() {
		let alerting = this.state.timeRemaining - 1 <= 0 ? 'alert' : '';
		this.setState({
			timeRemaining: this.state.timeRemaining - 1,
			alerting: alerting
		});
	}

	renderMessage()
	{
		return (this.props.message === 'undefined')
	}

	displayTimer(cost) {
		const timeRemaining = this.getTimeRemaining();
		if(timeRemaining.total === null) {
			return (
				<div className="card-cost">
					<p>{cost} braincells</p>
					<img src="https://static-cdn.jtvnw.net/channel-points-icons/548965051/2d4bf65f-fbc0-47f8-a8ca-079feef0b87b/icon-1.png" alt="" />
				</div>
			);
		} else if (timeRemaining.total <= 0) {
			clearInterval(this.interval);
			return "Done!";
		}

		return (
			<div className="card-time">
				<p>{String(timeRemaining.minutes).padStart(2,'0')}:{String(timeRemaining.seconds).padStart(2,'0')}</p>
			</div>
		);
	}

	getTimeRemaining() {
		const total = this.state.timeRemaining;
		const seconds = Math.floor( (total) % 60 );
		const minutes = Math.floor( (total/60) % 60 );
		const hours = Math.floor( (total/(60*60)) % 24 );
		const days = Math.floor( total/(60*60*24) );

		return { total, days, hours, minutes, seconds };
	}

	redeem() {
		this.setState({ redeemed: 'redeemed' });
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	render() {
		return (
			<div className={"card cursor-pointer " + this.state.alerting + ' ' + (this.props.visible ? '' : 'redeemed')} onClick={() => this.handleClick()}>
				<div className="card-icon">
					<img className="w-12 h-12" src={this.props.image} alt="" />
				</div>
				<div className="card-info">
					<span className="username">{this.props.redeemer}</span> redeemed
					<h2>{this.props.title}</h2>
				</div>
				{this.displayTimer(this.props.cost)}
			</div>
		)
	}
}