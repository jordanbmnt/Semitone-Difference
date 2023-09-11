const {JamBuddy} = require('../src/semitone');
const fs = require("fs");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const indexHtml = fs.readFileSync("index.html", "utf8", function (err, data) {
    return data;
});

const dom = new JSDOM(indexHtml).window;
const page = dom.document;
global.document = page;
global.window = dom;
global.JamBuddy = JamBuddy;

module.exports = { page };