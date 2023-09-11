const { page } = require("./test_helper");
require('../src/script');

const domProperties = {
    btn: page.getElementById("btn"),
    image1: page.getElementById("image1"),
    image2: page.getElementById("image2"),
    submitAnswer: page.getElementById("answer"),
    inp: page.getElementById("inp"),
    correctIndicator: page.getElementById("correctOrIncorrect"),
    streakP : page.getElementById("streak"),
    explanation : page.getElementById("explanation"),
    diffDiv : page.getElementById("diff"),
    revealAns: page.getElementById("revealAns"),
    page : page,
};

module.exports = { domProperties };