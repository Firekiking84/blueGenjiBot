const { REST, Routes } = require('discord.js');
require('dotenv').config();
const commands = require('./commands.js');

const updateCommands = async(guildId) => {
    const { TOKEN, CLIENT_ID } = process.env;
    const rest = new REST({ version: "10" }).setToken(TOKEN);

    try {
        await rest.put(
            Routes.applicationGuildCommands(CLIENT_ID, guildId),
            {
                body: Object.keys(commands).map((command) => {
                    return {
                        name: command,
                        ...commands[command].parameters,
                    };
                }),
            }
        );
    } catch (error) {
        console.error(error);
    }
}

module.exports = {updateCommands};