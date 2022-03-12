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

const helloResponses = [`( ⓛ ω ⓛ✧)>~ Heya!~`, `nice to finally meowchya, GET IT?`, `hi, I'm ${process.env.BOT_USERNAME} and I like to eat carpet sometimes.`, `hiya, do you like the taste of ankles? I love the taste of ankles ( ⓛ ω ⓛ✧)>~`, ]

const commands = {
  donate: {
    response: `https://www.paypal.com/paypalme/sgtxenas any and all donations go to further the stream or support paying the bills. My roommate appreciates any support immensely! ( ⓛ ω ⓛ✧)>~`
  },
  dice: {
    response: (user) => `${user} rolled ${value = rollDice()}`
  },
  clancy: {
    response: (user) => `Hello! I am ${process.env.BOT_USERNAME}, the chatbot inspired by Collin's cat. I like to byte ankles and help out the stream! ( ⓛ ω ⓛ✧)>~.`
  },
  hello: {
    response: (user) => {
      let i = (Math.floor(Math.random() * helloResponses.length));
      return `@${user}, ${helloResponses[i]}`
    }
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
      try{
        const [raw, command, argument] = message.match(regexpCommand)
  
        const { response } = commands[command] || {}
      
        if( typeof response === 'function') {
          client.say(channel, response(tags.username))
        } else if (typeof response === 'string') {
          client.say(channel, response);
        }
      } catch {
        client.say(channel, `What the heck? Oh..You tried an invalid command! ( ⓛ ω ⓛ✧)>~`)
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