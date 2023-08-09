const { MarkovMachine } = require("./markov.js");
const fsP = require("fs/promises");
const axios = require("axios");

async function readFile(path) {
  let content;
  try {
    content = await fsP.readFile(`${path}`, "utf8");
  } catch (err) {
    console.log(`Can't read ${path}: ${err.response.statusCode} ${err.response.statusMessage}`);
    process.exit(1);
  }
  return content;
}

async function readUrl(url) {
  let resp;
  try {
    resp = await axios({ url });
  } catch (err) {
    console.error(`Can't read ${url}: ${err.response.statusCode} ${err.response.statusMessage}`);
    process.exit(1);
  }
  return resp;
}

async function makeText() {

  let path = process.argv[3];

  if (process.argv[2] !== "file" && process.argv[2] !== "url") {
    console.log(`Unknown method: ${process.argv[2]}`);
    process.exit(1);
  }

  let resultPromise = process.argv[2] === "file" ?
    await readFile(path) : await readUrl(path);

  const newStory = new MarkovMachine(resultPromise);

  return newStory.getText();
}

makeText();

module.exports = { readFile, readUrl, makeText };