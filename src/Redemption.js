import React from 'react'

export default class Redemption extends React.Component {
	constructor(props) {
		super(props);
		this.interval = null;
		this.state = {
			timeRemaining: null
		}
	}

	componentDidMount() {
		const timer = (this.props.timer === 0) ? 0 : this.props.timer;
		if(timer > 0) {
			this.addTimer(timer);
		}
	}

	addTimer(minutes) {
		const timeToSet = minutes * 60;
		this.setState({
			timeRemaining: timeToSet,
			timerRunning: false
		});
	}

	handleClick() {
		if (this.state.timerRunning || ! this.state.timeRemaining) {
			this.props.handleRemove(this.props.id);
		} else {
			this.interval = setInterval(() => this.countDown(), 1000);
			this.setState({
				timerRunning: true
			});
		}
	}

	countDown() {
		this.setState({
			timeRemaining: this.state.timeRemaining - 1
		});
	}

	displayTimer() {
		const timeRemaining = this.getTimeRemaining();
		if(timeRemaining.total === null) {
			return null;
		} else if (! timeRemaining.total) {
			clearInterval(this.interval);
			return "Done!";
		}

  		return timeRemaining.minutes + 'm, ' + timeRemaining.seconds + 's';
	}

	getTimeRemaining() {
		const total = this.state.timeRemaining;
		const seconds = Math.floor( (total) % 60 );
		const minutes = Math.floor( (total/60) % 60 );
		const hours = Math.floor( (total/(60*60)) % 24 );
		const days = Math.floor( total/(60*60*24) );

		return {
			total,
			days,
			hours,
			minutes,
			seconds
		};
	}

	offerTimer() {
		return (
			(this.state.timeRemaining === null) ?
			<button onClick={() => this.addTimer(1)}>Add Timer</button>
			: null
		);
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	render() {
		return (
			<div className="bg-blue-700 rounded flex px-3 py-4 my-2 shadow-lg" onClick={() => this.handleClick()}>
				<p className="w-2/3">{this.props.title}</p>
				<p>{this.displayTimer()}</p>
				{this.offerTimer()}
			</div>
		)
	}
}