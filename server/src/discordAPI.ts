import "dotenv/config";
import {
	Attachment,
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
const getFileChannel = (discordFileName: string) => {
	const guild = client.guilds.cache.get(process.env.GUILD_ID as string) as Guild;
	const channel = guild.channels.cache.find(
		(ch) => ch.name === discordFileName && ch.parent?.name === "file_storage"
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

export const textChannelIsExist = (discordFileName: string) => {
	const channel = getFileChannel(discordFileName);
	return channel == undefined ? false : true;
};

export const createTextChannel = async (discordFileName: string, originalFileName: string) => {
	const guild = client.guilds.cache.get(process.env.GUILD_ID as string) as Guild;
	const category = process.env.CATEGORY_ID as string;

	const channel = await guild.channels.create({
		name: discordFileName,
		type: ChannelType.GuildText,
		parent: category,
	});

	const fileNameChannel = guild.channels.cache.get(process.env.FILE_NAME_CHANNEL_ID as string);
	(fileNameChannel as TextChannel).send({content: originalFileName});
};

export const deleteTextChannel = async (discordFileName: string, originalFileName: string) => {
	var promises = [];

	const channel = getFileChannel(discordFileName);
	promises.push(channel?.delete());

	const guild = client.guilds.cache.get(process.env.GUILD_ID as string) as Guild;
	const fileNameChannel = guild.channels.cache.get(process.env.FILE_NAME_CHANNEL_ID as string);

	const messages = await (fileNameChannel as TextChannel).messages.fetch({limit: 100});
	const message = messages.find((message) => message.content === originalFileName);

	promises.push(message?.delete());
	await Promise.all(promises);
};

export const downloadFile = async (discordFileName: string) => {
	const channel = getFileChannel(discordFileName);
	let attachments: Attachment[] = [];

	let afterId: string | null = "0";
	do {
		await (channel as TextChannel).messages
			.fetch({limit: 100, after: afterId})
			.then((messagePage) => {
				messagePage.forEach((message) => {
					attachments.push(message.attachments.first() as Attachment);
				});

				afterId = messagePage.size < 100 ? null : (messagePage.at(0)?.id as string);
			});
	} while (afterId);

	attachments.sort((a, b) => {
		return a.name < b.name ? -1 : 1;
	});

	const fileDataBuffer_promises = attachments.map(async (attachment) => {
		try {
			const response = await fetch(attachment.url);
			if (response.ok) {
				const arrayBuffer = await response.arrayBuffer();
				return Buffer.from(arrayBuffer);
			}
		} catch (error) {
			console.error("Failed to fetch attachment");
		}
	});

	const fileDataBuffers = await Promise.all(fileDataBuffer_promises);
	return fileDataBuffers;
};

export const uploadFile = (
	discordFolderName: string,
	discordFileName: string,
	buffer: Buffer<ArrayBuffer>
) => {
	const channel = getFileChannel(discordFolderName);
	const attachment = new AttachmentBuilder(buffer, {name: discordFileName});
	console.log(`Uploaded ${buffer.length} bytes!`);

	return (channel as TextChannel).send({files: [attachment]});
};
