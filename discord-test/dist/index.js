"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const split_combine_1 = require("./split-combine");
require("dotenv/config");
const discord_js_1 = require("discord.js");
const client = new discord_js_1.Client({
    intents: ["Guilds", "GuildMessages", "GuildMembers", "MessageContent"],
});
client.on("ready", async (c) => {
    console.log(`${c.user.username} is online`);
    // const channel= (client.channels.cache.get("1014069259955085353"));
    // (channel as TextChannel).send({
    //     content: "text",
    //     files: [ "Counter-strike  Global Offensive 2023.03.15 - 10.09.54.01-0" ]})
});
client.on("interactionCreate", async (interaction) => {
    if (!interaction.isChatInputCommand()) {
        return;
    }
    if (interaction.commandName === 'ping') {
        interaction.reply("pong!");
    }
    if (interaction.commandName === "hey") {
        interaction.reply("hey!");
    }
    if (interaction.commandName === "split") {
        console.log('splitting file...');
        const split_num = await (0, split_combine_1.splitFile)("./testvideo.mp4");
        console.log(`${(split_num !== -1) ? "split file sucessfully" : "split file unsucessfully"}`);
        var promises = [];
        for (let i = 0; i < split_num; i++) {
            const promise = interaction.channel?.send({
                content: "testvideo-" + i.toString(),
                files: ["./testvideo-" + i.toString()]
            });
            promises.push(promise);
        }
        await Promise.all(promises);
        const remove_res = await (0, split_combine_1.removeSplitFiles)("./testvideo.mp4");
        console.log(`${remove_res ? "All files uploaded" : "An error has occured"}`);
    }
    if (interaction.commandName == "combine") {
        var filtered_messages = [];
        await interaction.channel?.messages.fetch()
            .then(async (messages) => {
            messages.filter(message => {
                if (message.content.includes("testvideo-")) {
                    filtered_messages.push(message);
                }
            });
            filtered_messages.sort((m1, m2) => {
                if (m1.content < m2.content) {
                    return -1;
                }
                else if (m1.content > m2.content) {
                    return 1;
                }
                return 0;
            });
            var url_list = [];
            for (var message of filtered_messages) {
                url_list.push(message.attachments.first()?.url);
            }
            const res = await (0, split_combine_1.combineFiles)(url_list, "./OUT_FILE.mp4");
            console.log(`${res ? "combined file sucessfully" : "combined file unsucessfully"}`);
        });
    }
    if (interaction.commandName === 'delete') {
        var filtered_messages = [];
        await interaction.channel?.messages.fetch()
            .then((messages) => {
            messages.filter(message => {
                if (message.content.includes("testvideo-")) {
                    message.delete();
                }
            });
            console.log("all related files deleted in discord");
        });
    }
});
client.login(process.env.TOKEN);
