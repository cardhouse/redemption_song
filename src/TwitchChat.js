import React from 'react'

export default class TwitchChat extends React.Component {
	constructor(props) {
		super(props);
		this.tmi = require('tmi.js');
	}

	componentDidMount() {
		const client = new this.tmi.Client({
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
		client.connect().catch(console.error);
		client.on('message', (channel, tags, message, self) => {
			if(self) return;
			if(message.toLowerCase() === '!hello') {
				client.say(channel, `@${tags.username}, heya!`);
				console.log(tags);
			}
		});
	}

	render() {
		return null;
	}
}