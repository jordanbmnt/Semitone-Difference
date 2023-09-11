const image1 = document.getElementById("image1");
const image2 = document.getElementById("image2");
const explanation = document.getElementById("explanation");
const streakP = document.getElementById("streak");
const diffDiv = document.getElementById("diff");
const correctStatement = document.getElementById("correctOrIncorrect");
const inputElement = document.getElementById("inp");
const buddy = new JamBuddy();
let streak = 0;

function notePusher(note, arr) {
    if (/b$/g.test(note)) {
        arr.push(`${note[0]}flat.png`);
    } else if (/#/g.test(note)) {
        arr.push(`${note[0]}sharp.png`);
    } else {
        arr.push(`${note}.png`);
    }
}

function imgSelector() {
    const returnNotes = [];
    const notes = buddy.selectNotes();
    const note1 = notes[0].toString();
    const note2 = notes[1].toString();
    notePusher(note1, returnNotes);
    notePusher(note2, returnNotes);
    image1.src = `./src/images/${returnNotes[0]}`;
    image2.src = `./src/images/${returnNotes[1]}`;
    image1.style.animation = "none";
    image2.style.animation = "none";
    document.getElementById("answer").style.display =
        "block";
    return notes;
}

function answerRevealer() {
    const noteDifferenceArr = [buddy.firstRandomNotePosition, buddy.secondRandomNotePosition].sort((a,b)=>{return b-a});
    const normalDiff = `Difference:  ${noteDifferenceArr[0]-noteDifferenceArr[1]}`;
    const extremeDiff = `Extreme Difference: ${12 -(noteDifferenceArr[0]-noteDifferenceArr[1])}`;
    const note01 = buddy.currentSelectedNotes[0];
    const note02 = buddy.currentSelectedNotes[1];
    if(explanation.textContent.length === 32){
        explanation.textContent = '';
        diffDiv.textContent = '';
    }
    for(const note of buddy.notes){
        if(note === note01 || note === note02 || note.includes(note01) || note.includes(note02)){
            const highlightedNote = document.createElement("p");
            const highlightedNoteNode = document.createTextNode(note);
            highlightedNote.appendChild(highlightedNoteNode);
            highlightedNote.setAttribute("class", "selectedNote");
            explanation.appendChild(highlightedNote);
        }else{
            const normalNote = document.createElement("p");
            const normalNoteNode = document.createTextNode(note);
            normalNote.appendChild(normalNoteNode);
            explanation.appendChild(normalNote);
        }
    }
    const firstDifferenceElement = document.createElement("p");
    const secondDifferenceElement = document.createElement("p");
    const firstDifferenceTextNode = document.createTextNode(normalDiff);
    const secondDifferenceTextNode = document.createTextNode(extremeDiff);
    firstDifferenceElement.appendChild(firstDifferenceTextNode);
    secondDifferenceElement.appendChild(secondDifferenceTextNode);
    diffDiv.appendChild(firstDifferenceElement);
    diffDiv.appendChild(secondDifferenceElement);
}

window.onload = function randomNotesOnload() {
    imgSelector();
    streakP.textContent = `Your streak is: ${streak}`;
}

document.getElementById("btn").onclick = function checkAnswerBtn() {
        explanation.textContent = '';
        diffDiv.textContent = '';
        imgSelector();
        inputElement.value = '';
        setTimeout(() => {
            correctStatement.innerHTML = "";
        }, 10);
    };

document.getElementById("answer").onclick = function () {
    const ans = document.getElementById("inp").value;
    if (buddy.checkAnswer(parseInt(ans))) {
        answerRevealer();
        streakP.textContent = `Your streak is: ${streak+=1}`;
        correctStatement.style.color = "rgb(24, 189, 24)";
        correctStatement.innerHTML = "You got it right .Well Done!";
        document.getElementById("answer").style.display =
            "none";
            correctStatement.style.display = "block";
        image1.style.animation = "correct 2s";
        image2.style.animation = "correct 2s";
        setTimeout(() => {
            correctStatement.style.display = "none"
            correctStatement.innerHTML = "";
            inputElement.value = '';
        }, 2000);
        return;
    } else {
        streak = 0;
        streakP.textContent = `Your streak is: ${streak}`;
        correctStatement.style.display = "block";
        image1.style.animation = "incorrect 0.3s";
        image2.style.animation = "incorrect 0.3s";
        correctStatement.style.color = "red";
        correctStatement.innerHTML = "Wrong answer! Try again";
        setTimeout(() => {
            if (image1.style.animation !== null) {
                image1.style.animation = null;
                image2.style.animation = null;
            }
            inputElement.value = '';
            correctStatement.style.display = "none"
        }, 2600);
        return;
    }
};

document.getElementById("revealAns").onclick = function () {
    document.getElementById("answer").style.display = 'none';
    answerRevealer();

}