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

// Create a client with our options
const client = new tmi.client(tmiConfig);

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();

// Called every time a message comes in
function onMessageHandler (target, context, msg, self) {
  if (self) return // Ignore messages from the bot

  const [raw, command, argument]
  console.log(`${context.username}: ${msg}`)
}

// Function called when the "dice" command is issued
function rollDice () {
  const sides = 6;
  return Math.floor(Math.random() * sides) + 1;
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}