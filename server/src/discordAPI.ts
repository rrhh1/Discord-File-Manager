import "dotenv/config";
import {Attachment, AttachmentBuilder, ChannelType, Client, Guild, TextChannel} from "discord.js";

// Discord.js client
const client = new Client({
	intents: ["Guilds", "GuildMessages", "GuildMembers", "MessageContent"],
});

client.login(process.env.BOT_TOKEN);

// ======================================================================================================

// Gets channel by name
const getFileChannel = (discordFileName: string) => {
	const guild = client.guilds.cache.get(process.env.GUILD_ID as string) as Guild;
	const channel = guild.channels.cache.find(
		(ch) => ch.name === discordFileName && ch.parent?.name === "file_storage"
	);

	return channel;
};

// Ping Test
export const pingTest = () => {
	const channel = client.channels.cache.get(process.env.TEST_CHANNEL_ID as string);
	return (channel as TextChannel).send({
		content: "Pong!",
	});
};

// Get all file names from file name channel
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

export const getFileSize = async (discordFileName: string) => {
	const channel = getFileChannel(discordFileName);
	let fileSize = 0;

	// Fetch all messages in the channel
	let afterId: string | null = "0";
	do {
		await (channel as TextChannel).messages
			.fetch({limit: 100, after: afterId})
			.then((messagePage) => {
				messagePage.forEach((message) => {
					fileSize += (message.attachments.first() as Attachment).size;
				});

				afterId = messagePage.size < 100 ? null : (messagePage.at(0)?.id as string);
			});
	} while (afterId);

	return fileSize;
};

// Check if text channel exists
export const textChannelIsExist = (discordFileName: string) => {
	const channel = getFileChannel(discordFileName);
	return channel == undefined ? false : true;
};

// Create a text channel
export const createTextChannel = async (discordFileName: string, originalFileName: string) => {
	const guild = client.guilds.cache.get(process.env.GUILD_ID as string) as Guild;
	const category = process.env.CATEGORY_ID as string;

	const channel = await guild.channels.create({
		name: discordFileName,
		type: ChannelType.GuildText,
		parent: category,
	});

	// Upload the file name to the file name channel
	const fileNameChannel = guild.channels.cache.get(process.env.FILE_NAME_CHANNEL_ID as string);
	(fileNameChannel as TextChannel).send({content: originalFileName});
};

// Delete a text channel and remove the file name from the file name channel
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

// Download a file by combining all attachments
export const downloadFile = async (discordFileName: string) => {
	const channel = getFileChannel(discordFileName);
	let attachments: Attachment[] = [];

	// Fetch all messages in the channel
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

	// Sort attachments by name
	attachments.sort((a, b) => {
		return a.name < b.name ? -1 : 1;
	});

	// Download all attachments as buffers
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

	// Return buffers
	return fileDataBuffers;
};

// Upload a subfile to the channel
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
