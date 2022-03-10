const tmi = require('tmi.js');
require('dotenv').config();

const regexpCommand = new RegExp(/^!([a-zA-Z0-9]+)(?:\W+)?(.*)?/);

// Define configuration options
const tmiConfig = {
  identity: {
    username: process.env.BOT_USERNAME,
    password: process.env.OAUTH_TOKEN
  },
  channels: [
    'sgt_xenas'
  ],
  connection: {
    reconnect: true
  }
};

const commands = {
  donate: {
    response: `https://www.paypal.com/paypalme/sgtxenas any and all donations go to further the stream or support paying the bills`
  },
  dice: {
    response: (user) => `${user} rolled ${value = rollDice()}`
  },
  clancy: {
    response: `Hello! I am clancy_b0t, the chatbot inspired by sgt_xenas' cat. I like to chew ankles and help out the stream!`
  }
}

// Create a client with our options
const client = new tmi.client(tmiConfig);

// Register our event handlers (defined below)
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();

// Called every time a message comes in
client.on('message', (channel, tags, message, self) => {
  if ( self ) return;
  if(message.charAt(0) === '!') {
    const [raw, command, argument] = message.match(regexpCommand)
  
    const { response } = commands[command] || {}
  
    if( typeof response === 'function') {
      client.say(channel, response(tags.username))
    } else if (typeof response === 'string') {
      client.say(channel, response);
    }
  }
})

// Function called when the "dice" command is issued
function rollDice () {
  const sides = 6;
  value = Math.floor(Math.random() * sides) + 1;
  return value
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}