"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const discord_js_1 = require("discord.js");
const commands = [
    {
        name: "hey",
        description: "returns a hey back"
    },
    {
        name: "split",
        description: "tests the splitting of data"
    },
    {
        name: "combine",
        description: "tests the combining of data"
    },
    {
        name: "delete",
        description: "tests the deleting of split files in discord"
    }
];
const rest = new discord_js_1.REST({ version: '10' }).setToken(process.env.TOKEN);
async function createCommands() {
    try {
        console.log("Registering slash commands...");
        await rest.put(discord_js_1.Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), { body: commands });
        console.log("Slash Commands Registered Sucessfully");
    }
    catch (error) {
        console.log(error);
    }
}
createCommands();
