const tmi = require('tmi.js');
require('dotenv').config();

// Define configuration options
// const opts = {
//   identity: {
//     username: BOT_USERNAME,
//     password: OAUTH_TOKEN
//   },
//   channels: [
//     CHANNEL_NAME
//   ]
// };

// Create a client with our options
const client = new tmi.client({
    channels:['clancy_b0t']
});

// Register our event handlers (defined below)
client.on('message', (channel, tags, message, self) => {
    console.log(tags);
    console.log(`${tags['display-name']}: ${message} `)
});
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();

// Called every time a message comes in
// function onMessageHandler (target, context, msg, self, tags) {
//   if (self) { return; } // Ignore messages from the bot

//   console.log(`${tags['display-name']}: ${message}`)

//   // Remove whitespace from chat message
//   const commandName = msg.trim();

//   // If the command is known, let's execute it
//   if (commandName === '!dice') {
//     const num = rollDice();
//     console.log(context);
//     client.say(target, `You rolled a ${num}`);
//     console.log(`* Executed ${commandName} command`);
//   } else {
//     console.log(`* Unknown command ${commandName}`);
//   }
// }

// Function called when the "dice" command is issued
function rollDice () {
  const sides = 6;
  return Math.floor(Math.random() * sides) + 1;
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}