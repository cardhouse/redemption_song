import React from 'react'

export default class TwitchChat extends React.Component {
	constructor(props) {
		super(props);
		const tmi = require('tmi.js');
		this.client = new tmi.Client({
			options: { debug: true, messagesLogLevel: "info" },
			connection: {
				reconnect: true,
				secure: true
			},
			identity: {
				username: 'Joker',
				password: 'oauth:p6n6jzndbi690d8yvtofostxt7qdb3'
			},
			channels: [ 'cardhousemagic' ]
		});
	}

	answerMessage(channel, tags, message, self) {
		if(self) return;
		if(message.toLowerCase() === '!hello') {
			this.client.say(channel, `@${tags.username}, heya!`);
			this.props.addRedemption('Hello World', 1);
			console.log(tags);
		}
	}

	componentDidMount() {
		this.client.connect().catch(console.error);
		this.client.on('message', (channel, tags, message, self) => this.answerMessage(channel, tags, message, self));
	}

	render() {
		return null;
	}
}