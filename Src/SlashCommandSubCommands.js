const { SlashCommandBuilder } = require("@discordjs/builders");
const Discord = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("")
    .setDescription("")
    .addSubcommand(subcommand =>
        subcommand
            .setName("")
            .setDescription("")),

    async run(client, interaction){
        if (interaction.options.getSubcommand() === "") {
            await interaction.reply("")
        }
    }
}