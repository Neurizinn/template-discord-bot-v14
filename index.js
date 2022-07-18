const config = require('./config');
const Client = require('./src/structures/Client');

const client = new Client({
	intents: [
		'Guilds',
		'GuildMessageReactions',
		'GuildMessages',
		'GuildInvites',
		'GuildVoiceStates',
		'GuildMembers',
		'GuildPresences',
	],
});

client.login(config.BOT_TOKEN);