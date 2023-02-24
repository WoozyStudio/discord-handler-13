const { SlashCommandBuilder } = require("@discordjs/builders");
const Discord = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("test")
    .setDescription("Replay with the test."),

    async run(client, interaction){
        interaction.reply({ content: "This is the Test Message" })
    }
}