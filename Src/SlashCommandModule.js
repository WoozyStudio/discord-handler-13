const { SlashCommandBuilder } = require("@discordjs/builders");
const Discord = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("")
    .setDescription(""),

    async run(client, interaction){
        interaction.reply({})
    }
}