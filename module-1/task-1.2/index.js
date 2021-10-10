import csv from "csvtojson"
import path from 'path'
import fs from 'fs'

const csvFilePath = path.resolve('./csv/nodejs-hw1-ex1.csv');
const textFileName = "file.txt"

async function convertToJsonArray() {

    try {
        return await csv().fromFile(csvFilePath);
    } catch (error) {
        throw new Error("Error converting CSV");
    }
}

async function writeJsonArrayToFile(jsonArray) {
    const writable = fs.createWriteStream(textFileName, "utf8")
    let iterations = 0;
    let ok = true;

    function write() {
        while (iterations !== jsonArray.length) {
            ok = writable.write(JSON.stringify(jsonArray[iterations]) + "\r\n")

            if (ok) {
                iterations++;
            } else {
                writable.once('drain', write)
            }
        }
    }

    write()
}



(async function main() {
    try {
        const jsonArray = await convertToJsonArray();
        await writeJsonArrayToFile(jsonArray);
    } catch (error) {
        console.error(error.message);
    }
})();