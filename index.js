const { Client, Intents } = require('discord.js');
const config = require('./config.json');
require('dotenv/config');

const axios = require('axios');

const client = new Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });

client.once('ready', () => {
	console.log('Ready!');
});

client.on('messageCreate', async (message) => {
	if(!message.content.startsWith(config.prefix)) return;

  const args = message.content.substring(config.prefix.length).split();
  
  switch  (args[0]){
    case "cat":
      const catData = await axios.get(config.catApi);
      const catImageUrl = catData.data[0].url
      

      const embedCat = {title: "<:gatinho:882373149939892275> | toma um gatinho para te deixar feliz", image: {url: catImageUrl}}
      message.channel.send({ embeds: [embedCat]});

      break;

    case "dog":
      const dogData = await axios.get(config.dogApi);
      const dogImageUrl = dogData.data.message

      const embedDog = {title: `<:doguinho:882373015713767465> | toma um cachorrinho para te deixar feliz`, image: {url: dogImageUrl}}
      message.channel.send({ embeds: [embedDog]});

      break;
  }

});


client.login(process.env.TOKEN);
