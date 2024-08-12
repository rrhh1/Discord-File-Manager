"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.splitFile = splitFile;
exports.combineFiles = combineFiles;
exports.removeSplitFiles = removeSplitFiles;
const fs = __importStar(require("fs"));
const stream_1 = require("stream");
const promises_1 = require("stream/promises");
async function splitFile(fileName) {
    var index = fileName.lastIndexOf(".");
    var name = fileName.substring(0, index);
    var extension = fileName.substring(index + 1, fileName.length);
    const CHUNK_SIZE = 24 * 1024 * 1024; // 24 MB
    return new Promise((resolve, reject) => {
        var readStream = fs.createReadStream("./" + fileName, {
            highWaterMark: CHUNK_SIZE,
        });
        let i = 0;
        readStream
            .on("data", (chunk) => {
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
async function combineFiles(url_list, destination) {
    return new Promise(async (resolve, reject) => {
        for (var url of url_list) {
            const resp = await fetch(new URL(url));
            if (resp.ok && resp.body) {
                const writer = fs.createWriteStream(destination, { flags: 'a' });
                await (0, promises_1.finished)(stream_1.Readable.fromWeb(resp.body).pipe(writer))
                    .catch((err) => {
                    reject(err);
                });
            }
            else {
                reject(resp.status);
            }
        }
        resolve(true);
    });
}
async function removeSplitFiles(fileName) {
    var index = fileName.lastIndexOf(".");
    var name = fileName.substring(0, index);
    var extension = fileName.substring(index + 1, fileName.length);
    function loopRemove(resolve, reject, i) {
        fs.unlink(name + "-" + i.toString(), (err) => {
            if (err) {
                resolve(true);
            }
            else {
                loopRemove(resolve, reject, i + 1);
            }
        });
    }
    return new Promise((resolve, reject) => {
        loopRemove(resolve, reject, 0);
    });
}
// ===================== TEST FUNCTIONS USED DURING DEVELOPMENT ===============================
async function combineFiles_test(fileName) {
    var index = fileName.lastIndexOf(".");
    var name = fileName.substring(0, index);
    var extension = fileName.substring(index + 1, fileName.length);
    return new Promise((resolve) => {
        let i = 0;
        while (true) {
            try {
                var bytes = fs.readFileSync(name + "-" + i.toString());
                fs.appendFileSync("OUT_FILE." + extension, bytes);
            }
            catch {
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
