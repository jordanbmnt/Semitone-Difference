class JamBuddy {
    constructor() {
        this.notes = [
            "A",
            ["A#", "Bb"],
            "B",
            "C",
            ["C#", "Db"],
            "D",
            ["D#", "Eb"],
            "E",
            "F",
            ["F#", "Gb"],
            "G",
            ["G#", "Ab"],
        ];
        this.currentSelectedNotes = ["null", "null"];
        this.firstRandomNotePosition;
        this.secondRandomNotePosition;
    }
    selectNotes() {
        this.firstRandomNotePosition = this.randomNum(12);
        this.secondRandomNotePosition = this.randomNum(12);

        if (this.notes[this.firstRandomNotePosition].length > 1) {
            this.currentSelectedNotes[0] = this.randomNum(2) === 0 ?
                this.notes[this.firstRandomNotePosition][0] :
                this.notes[this.firstRandomNotePosition][1];
        } else if (this.notes[this.firstRandomNotePosition].length === 1) {
            this.currentSelectedNotes[0] = this.notes[this.firstRandomNotePosition];
        }
        if (this.notes[this.secondRandomNotePosition].length > 1) {
            this.currentSelectedNotes[1] = this.randomNum(2) === 0 ?
                this.notes[this.secondRandomNotePosition][0] :
                this.notes[this.secondRandomNotePosition][1];
        } else if (this.notes[this.secondRandomNotePosition].length === 1) {
            this.currentSelectedNotes[1] = this.notes[this.secondRandomNotePosition];
        }
        return this.currentSelectedNotes;
    }
    checkAnswer(answer) {
        let noteDifference = 0;
        let extremeCircularDifference = 0;
        this.firstRandomNotePosition = this.noteIndex(this.currentSelectedNotes[0]);
        this.secondRandomNotePosition = this.noteIndex(this.currentSelectedNotes[1]);
        if (this.firstRandomNotePosition < this.secondRandomNotePosition) {
            noteDifference =
                (this.secondRandomNotePosition + 1) - (this.firstRandomNotePosition + 1);
            noteDifference > 12 ?
                extremeCircularDifference = noteDifference - 12 :
                extremeCircularDifference = 12 - noteDifference
        } else if (this.firstRandomNotePosition === this.secondRandomNotePosition) {
            noteDifference = 0;
            extremeCircularDifference = 12;
        } else {
            noteDifference = ((this.firstRandomNotePosition + 1) - (this.secondRandomNotePosition + 1));
            noteDifference > 12 ?
                extremeCircularDifference = noteDifference - 12 :
                extremeCircularDifference = 12 - noteDifference
        }
        return (answer === noteDifference) || (answer === extremeCircularDifference);
    }

    randomNum(num) {
        return Math.floor(Math.random() * num);
    }

    noteChecker(currentNote, searchNote) {
        if (currentNote === searchNote) {
            return true;
        }
        return false;
    }

    noteIndex(noteChar) {
        for (let i = 0; i < this.notes.length; i++) {
            if (this.notes[i].length === 1) {
                if (this.noteChecker(this.notes[i], noteChar)) {
                    return i;
                }
            } else {
                for (let n = 0; n < this.notes[i].length; n++) {
                    if (this.noteChecker(this.notes[i][n], noteChar)) {
                        return i;
                    }
                }
            }
        }
    }
}

module.exports = { JamBuddy };