import "dotenv/config";
import {
	AttachmentBuilder,
	Channel,
	ChannelType,
	Client,
	FileComponent,
	Guild,
	Message,
	TextChannel,
} from "discord.js";

const client = new Client({
	intents: ["Guilds", "GuildMessages", "GuildMembers", "MessageContent"],
});

client.login(process.env.TOKEN);

// ======================================================================================================
export const pingTest = () => {
	const channel = client.channels.cache.get(process.env.TEST_CHANNEL_ID as string);
	return (channel as TextChannel).send({
		content: "Pong!",
	});
};

const getChannel = (fileName: string) => {
	const guild = client.guilds.cache.get(process.env.GUILD_ID as string) as Guild;
	const channel = guild.channels.cache.find((ch) => ch.name === fileName);

	return channel;
};

export const textChannelIsExist = (fileName: string) => {
	const channel = getChannel(fileName);
	return channel == undefined ? false : true;
};

export const createTextChannel = (fileName: string) => {
	const guild = client.guilds.cache.get(process.env.GUILD_ID as string) as Guild;
	const category = process.env.CATEGORY_ID as string;

	return guild.channels.create({
		name: fileName,
		type: ChannelType.GuildText,
		parent: category,
	});
};

export const uploadFile = (discordFileName: string, buffer: Buffer<ArrayBuffer>) => {
	const channel = getChannel(discordFileName);
	const attachment = new AttachmentBuilder(buffer, {name: discordFileName});
	console.log(`Uploaded ${buffer.length} bytes!`);

	return (channel as TextChannel).send({files: [attachment]});
};
