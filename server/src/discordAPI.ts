import "dotenv/config";
import {
	AttachmentBuilder,
	ChannelType,
	Client,
	Collection,
	Guild,
	Message,
	MessageFlags,
	TextChannel,
} from "discord.js";

const client = new Client({
	intents: ["Guilds", "GuildMessages", "GuildMembers", "MessageContent"],
});

client.login(process.env.TOKEN);

// ======================================================================================================
const getFolderChannel = (discordFolderName: string) => {
	const guild = client.guilds.cache.get(process.env.GUILD_ID as string) as Guild;
	const channel = guild.channels.cache.find(
		(ch) => ch.name === discordFolderName && ch.parent?.name === "file_storage"
	);

	return channel;
};

export const pingTest = () => {
	const channel = client.channels.cache.get(process.env.TEST_CHANNEL_ID as string);
	return (channel as TextChannel).send({
		content: "Pong!",
	});
};

export const getAllFileNames = async () => {
	const guild = client.guilds.cache.get(process.env.GUILD_ID as string) as Guild;
	const fileNameChannel = guild.channels.cache.get(process.env.FILE_NAME_CHANNEL_ID as string);

	// LIMIT OF 100 FOR NOW
	const messages = await (fileNameChannel as TextChannel).messages.fetch({limit: 100});
	const fileNames = messages.map((message) => {
		return message.content;
	});

	return fileNames;
};

export const textChannelIsExist = (discordFolderName: string) => {
	const channel = getFolderChannel(discordFolderName);
	return channel == undefined ? false : true;
};

export const createTextChannel = async (discordFolderName: string, originalFileName: string) => {
	const guild = client.guilds.cache.get(process.env.GUILD_ID as string) as Guild;
	const category = process.env.CATEGORY_ID as string;

	const channel = await guild.channels.create({
		name: discordFolderName,
		type: ChannelType.GuildText,
		parent: category,
	});

	const fileNameChannel = guild.channels.cache.get(process.env.FILE_NAME_CHANNEL_ID as string);
	(fileNameChannel as TextChannel).send({content: originalFileName});
};

export const uploadFile = (
	discordFolderName: string,
	discordFileName: string,
	buffer: Buffer<ArrayBuffer>
) => {
	const channel = getFolderChannel(discordFolderName);
	const attachment = new AttachmentBuilder(buffer, {name: discordFileName});
	console.log(`Uploaded ${buffer.length} bytes!`);

	return (channel as TextChannel).send({files: [attachment]});
};
