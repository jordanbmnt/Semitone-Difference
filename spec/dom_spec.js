const { domProperties } = require("./dom_obj");

describe("Btn", function () {
    it("should be clickable", function () {
        let clicked = spyOn(domProperties.btn, "click");
        domProperties.btn.click();
        expect(clicked).toHaveBeenCalled();
    });
    it("should change the images' sources when clicked", function () {
        const initialImage1 = domProperties.image1.src;
        const initialImage2 = domProperties.image2.src;
        domProperties.btn.click();
        const afterClickImage1 = domProperties.image1.src;
        const afterClickImage2 = domProperties.image2.src;
        initialImage1 === afterClickImage1
            ? domProperties.btn.click()
            : initialImage2 === afterClickImage2
            ? domProperties.btn.click()
            : expect(initialImage1).not.toBe(afterClickImage1) &&
              expect(initialImage2).not.toBe(afterClickImage2);
    });
    it("should clear the explanation div", function () {
        domProperties.explanation.textContent = "hello World";
        expect(domProperties.explanation.textContent).toBe("hello World");
        domProperties.btn.click();
        expect(domProperties.explanation.textContent).toBe("");
    });
    it("should clear the diff div", function () {
        domProperties.diffDiv.textContent = "hello World";
        expect(domProperties.diffDiv.textContent).toBe("hello World");
        domProperties.btn.click();
        expect(domProperties.diffDiv.textContent).toBe("");
    });
});

describe("Check Answer", function () {
    it("should check if the user input is correct/incorrect and change the correctIndicator accordingly", function () {
        expect(domProperties.correctIndicator.innerHTML).toBe("");
        domProperties.btn.click();
        domProperties.inp.value = 0;
        domProperties.submitAnswer.click();
        expect(domProperties.correctIndicator.innerHTML).toEqual(
            "Wrong answer! Try again" || "You got it right .Well Done!"
        );
    });
    it("should keep track of how many correct answers the user gets in a row and display this answer on the screen", function () {
        domProperties.revealAns.click();
        const notesDiff = domProperties.diffDiv.textContent.split('').filter(char =>{
            return /[0-9]/.test(char);
        })[0];
        domProperties.inp.value = notesDiff;
        domProperties.submitAnswer.click();
        expect(domProperties.streakP.textContent).toBe('Your streak is: 1');
    });
    it("should reset streak if the wrong answer is submitted", function () {
        domProperties.inp.value = -1;
        domProperties.submitAnswer.click();
        expect(domProperties.streakP.textContent).toBe('Your streak is: 0');
    });
});

describe("Reveal Answer Button", function(){
    it("should populate the div with notes and the currently selected notes highlighted", function () {
        domProperties.revealAns.click();
        expect(domProperties.explanation.childNodes.length).toBe(12);
        let highlightedNotes = 0;
        domProperties.explanation.childNodes.forEach(char=>{
            if(char.classList.toString() === "selectedNote"){
                highlightedNotes += 1;
            }
        });
        expect(highlightedNotes >= 1).toBe(true);
    });
    it("should reveal the difference between the selected notes", function(){
        domProperties.revealAns.click();
        expect(/Difference/g.test(domProperties.diffDiv.textContent)).toBe(true);
        expect(/Extreme Difference/g.test(domProperties.diffDiv.textContent)).toBe(true);
    });
    it("should hide submit answer", function(){
        domProperties.revealAns.click();
        expect(domProperties.submitAnswer.style.display).toBe('none')
    });
});