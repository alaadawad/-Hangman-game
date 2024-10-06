// letters
const letters = "abcdefghijklmnopqrstuvwxyz";
// get array from letters
let lettersArray = Array.from(letters);
// select letters container
let lettersContainer = document.querySelector(".letters");
// generate letters
lettersArray.forEach(letter => {
    // create span 
    let span = document.createElement("span");
    // create letter text node
    let theLetter = document.createTextNode(letter);
    // Append the letter to span
    span.appendChild(theLetter);
    // add class on span
    span.className = 'letter-box';
    // Appand span tothe letter container
    lettersContainer.appendChild(span);
});

// object of words + Categories
const words = {
    programming: ["php", "javascript", "go", "scala", "fortran", "r", "mysql", "python"],
    movies: ["Prestige", "Inception", "Parasite", "Interstellar", "Whiplash","Memento", "Coco", "Up"],
    people: ["Albert Einstein", "Hitchcock","Alexander", "Cleopatra", "Mahatma Ghandi"],
    countries: ["Syria","Palestine", "Yemen", "Egypt", "Bahrain", "Qatar"]
}
// get random proprty
let allKeys = Object.keys(words);
// random namber depend on keys length
let randomPropNumber = Math.floor(Math.random() * allKeys.length);
// category
let randomPropName = allKeys[randomPropNumber];
// category words
let randomPropValue = words[randomPropName];
// random number depend on words
let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);
// the chosen words
let randomValueValue = randomPropValue[randomValueNumber];
// set category Info
document.querySelector(".game-info .category span").innerHTML = randomPropName;
// slect letters guess element
let lettersGuessContainer = document.querySelector(".letters-guess");
// convert chosen word to array
let letterAndSpace = Array.from(randomValueValue);
// creat spans depened on word
letterAndSpace.forEach(letter => {
    // create empty span
    let emptySpan =document.createElement("span");
    // if letter is space
    if(letter === ' '){
        // add class to the span
        emptySpan.className = 'with-space';
    }
    // Append span to the letters Guess container
    lettersGuessContainer.appendChild(emptySpan);
});

// selwct guess span
let guessSpans = document.querySelectorAll(".letters-guess span");
// set worng attempts
let worngAttempts = 0;
// select the draw element
let theDraw = document.querySelector(".hangman-draw");

// Handle clicking on letters
document.addEventListener("click",(e) => {

    // set the chose status
    let theStatus = false;

    if(e.target.className === 'letter-box'){

        e.target.classList.add("clicked");
        // get clicked letter
        let theClickedLetter = e.target.innerHTML.toLowerCase();
        // the chosen word
        let thechosenWord = Array.from(randomValueValue.toLowerCase());
        
        // the chosen word
        thechosenWord.forEach((wordLetter,WordIndex) => {
            // if the clicked letter equal to one of the chosen word letter
            if(theClickedLetter == wordLetter){
                // set status to correct
                theStatus = true;

                // loop on all guess span
                guessSpans.forEach((span,spanIndex) => {

                    if(WordIndex === spanIndex){
                        span.innerHTML = theClickedLetter;

                    }
                });


            }
        });
        // if letter is wrong
        if(theStatus !== true){
            // increase the wrong attemts
            worngAttempts++;
            // add class worng on the draw element
            theDraw.classList.add(`wrong-${worngAttempts}`);

            // play fail sound
            document.getElementById("fail").play();
            if(worngAttempts === 8){
                endGame();
                lettersContainer.classList.add("finished");
            }

        } else{
            // play success sound
            document.getElementById("success").play();
        }
    }
});

// End Game Function
function endGame() {

    // Create Popup Div
    let div = document.createElement("div");
  
    // Create Text
    let divText = document.createTextNode(`Game Over, The Word Is ${randomValueValue}`);
  
    // Append Text To Div
    div.appendChild(divText);
  
    // Add Class On Div
    div.className = 'popup';
  
    // Append To The Body
    document.body.appendChild(div);
  
  }