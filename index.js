const Discord = require("discord.js");
const config = require("./config/config.json");
const fs = require("fs");
const path = require("path");
const os = require("os");
require('colors')

const client = new Discord.Client({
    intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MEMBERS,
        Discord.Intents.FLAGS.GUILD_MESSAGES,
    ],
})

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

function requerirhandlers(){
    ["command", "events"].forEach(handler => {
        try {
            require(`./handlers/${handler}`)(client, Discord)
        } catch(e){
        console.log(e)
        }
    })
}
requerirhandlers();


client.on('ready', async() => {
  console.log(`Logged as ${client.user.tag}`.green)
  function presence(){
    client.user.setPresence({
        status: '',
        activities: [
          {
            name: '',
            type: "",
          }
      ]
    }
  )
}
presence();


})
  client.setMaxListeners (200)


//Commands and Messages
let prefix = config.prefix;
client.on("messageCreate", (message) => {

//evit bucle
if(message.author.bot) return;
if(!message.content.startsWith(prefix)) return;

//commands and mentions
const args = message.content.slice(prefix.length).trim().split(/ +/g);
const command = args.shift().toLowerCase();

let cmd = client.commands.get(command) || client.commands.find((c) => c.alias.includes(command))
if(cmd) {
  return cmd.execute(client, message, args)
 }
 if(!cmd){
   if(message.content === prefix) return;

   message.channel.send({ content: `The command you specified did not exist!` })
  } 
});

  client.slashcommands = new Discord.Collection();
  const slashcommandsFiles = fs.readdirSync("./slashcmd").filter(file => file.endsWith(".js"))
  
  for(const file of slashcommandsFiles){
    const slash = require(`./slashcmd/${file}`)
    console.log(`Slash commands - ${file} loaded.`)
    client.slashcommands.set(slash.data.name, slash)
  }
  client.on("interactionCreate", async(interaction) => {
    if(interaction.isCommand()) {
      const slashcmds = client.slashcommands.get(interaction.commandName)
  
    if(!slashcmds) return;
  
    try {
      await slashcmds.run(client, interaction)
    } catch(e) {
      console.error(e)
    }
  }
  })

client.login(config.token)