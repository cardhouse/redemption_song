const tmi = require('tmi.js');
const client = new tmi.Client({
	options: { debug: true, messagesLogLevel: "info" },
	connection: {
		reconnect: true,
		secure: true
	},
	identity: {
		username: 'Joker',
		password: 'oauth:p6n6jzndbi690d8yvtofostxt7qdb3'
	},
	channels: [ 'cardhouse_' ]
});
client.connect().catch(console.error);
client.on('message', (channel, tags, message, self) => {
	if(self) return;
	if(message.toLowerCase() === '!hello') {
		client.say(channel, `@${tags.username}, heya!`);
	}
});