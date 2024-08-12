import "dotenv/config";
import {REST, Routes} from "discord.js"

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

const rest = new REST({version: '10'}).setToken((process.env.TOKEN as string));

async function createCommands()
{
    try
    {
        console.log("Registering slash commands...");

        await rest.put(
            Routes.applicationGuildCommands(
                process.env.CLIENT_ID as string,
                process.env.GUILD_ID as string
            ),
            {body : commands}
        );

        console.log("Slash Commands Registered Sucessfully");
    }
    catch (error)
    {
        console.log(error)
    }
}

createCommands();