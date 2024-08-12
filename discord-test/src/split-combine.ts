import * as fs from "fs";
import { Readable } from "stream";
import { finished } from "stream/promises";


export async function splitFile(fileName: string)
{
    var index : number = fileName.lastIndexOf(".");
    var name : String = fileName.substring(0, index);
    var extension : String = fileName.substring(index + 1,fileName.length);

    const CHUNK_SIZE = 24 * 1024 * 1024; // 24 MB

	return new Promise<number>((resolve, reject) => {

		var readStream = fs.createReadStream("./" + fileName, {
			highWaterMark: CHUNK_SIZE,
		});

		let i : number = 0;
		
		readStream
		.on("data", (chunk: any) => {
			fs.writeFileSync(name + "-" + i.toString(), chunk);
			i = i + 1;
		})
		.on("error", () => {
			console.log("An error as occured");
			reject(-1);
		})
		.on("end", () => {
			readStream.close();
			resolve(i);
		});
	});
}


export async function combineFiles(
	url_list : URL[] | string[],
	destination : string )
{
	return new Promise(async (resolve, reject) => {
		for(var url of url_list)
		{
			const resp = await fetch(new URL(url))
			if(resp.ok && resp.body)
			{
				const writer = fs.createWriteStream(destination, {flags: 'a'});
				await finished(Readable.fromWeb(resp.body as any).pipe(writer as any))
				.catch((err) => {
					reject(err);
				});
			}
			else
			{
				reject(resp.status);
			}
		}

		resolve(true);
	});

}

export async function removeSplitFiles(fileName : String)
{
    var index : number = fileName.lastIndexOf(".");
    var name : String = fileName.substring(0, index);
    var extension : String = fileName.substring(index + 1, fileName.length);

    function loopRemove(resolve: any, reject: any, i: number)
    {
        fs.unlink(name + "-" + i.toString(), (err) => {
            if(err)
            {
                resolve(true);
            }
            else
            {
                loopRemove(resolve, reject, i + 1);
            }
        });
    }

    return new Promise((resolve, reject) => {
        loopRemove(resolve, reject, 0);
    });
}

// ===================== TEST FUNCTIONS USED DURING DEVELOPMENT ===============================
async function combineFiles_test(fileName : string)
{
    var index : number = fileName.lastIndexOf(".");
    var name : String = fileName.substring(0, index);
    var extension : String = fileName.substring(index + 1, fileName.length);

	return new Promise((resolve) => {
		let i : number = 0;
		while (true)
        {
			try
            {
				var bytes = fs.readFileSync(name + "-" + i.toString());
				fs.appendFileSync("OUT_FILE." + extension, bytes);
			}
            catch
            {
				break;
			}

			i += 1;
		}

		resolve(true);
	});
}



// async function run()
// {
//     await splitFile("Counter-strike  Global Offensive 2023.03.15 - 10.09.54.01.mp4");
//     const res = await removeSplitFiles("Counter-strike  Global Offensive 2023.03.15 - 10.09.54.01.mp4")
//     .catch((res) => {
//         console.log(res);
//     });
//     console.log(res);
// }

// run();
