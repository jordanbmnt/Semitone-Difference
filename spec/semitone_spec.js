const { JamBuddy } = require("../src/semitone");
const buddy = new JamBuddy();

describe("JamBuddy", function () {
    const notes = buddy.selectNotes();
    describe("selectNotes", function () {
        it("should return an array of two notes", function () {
            expect(typeof notes).toBe("object");
            expect(notes.length).toBe(2);
        });
    });
    describe("checkAnswer", function () {
        beforeEach(()=>{
            buddy.selectNotes()
        })
        it("should return true if answer is correct", function () {
            buddy.currentSelectedNotes = ['A', 'B'];
            expect(buddy.checkAnswer(2)).toBe(true);
        });
        it("should have a circular array", function () {
            buddy.currentSelectedNotes = ['G', 'B'];
            expect(buddy.checkAnswer(4)).toBe(true);
        });
        it("should be able to handle both normal and extreme difference between the notes that are the same", function () {
            buddy.currentSelectedNotes = ['A', 'A'];
            expect(buddy.checkAnswer(0)).toBe(true);
            expect(buddy.checkAnswer(12)).toBe(true);
        });
        it("should return false if answer is incorrect", function () {
            buddy.currentSelectedNotes = ['A', 'A'];
            expect(buddy.checkAnswer(2)).toBe(false);
        });
    });
    describe("currentSelectedNotes", function () {
        buddy.selectNotes();
        it("should equal selectNotes", function () {
            buddy.currentSelectedNotes = ['A', 'D'];
            expect(buddy.checkAnswer(5)).toBe(true);
        });
    });
});