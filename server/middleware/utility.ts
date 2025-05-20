// Reusable utility function to create a Discord file name
export const createDiscordFileName = (fileName: string) => {
	const fileName_split = fileName.replaceAll(" ", "-").replaceAll(".", "-").split("-");

	const extension = fileName_split.length > 1 ? fileName_split.pop() : "";
	const name = fileName_split.join("-");

	return {
		name: name,
		extension: extension as string,
		discordFileName: name + "_" + extension,
	};
};
