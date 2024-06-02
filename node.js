let boxes = document.querySelectorAll(".box");
let msg = document.querySelector("#msg");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let modeBtn = document.querySelector("#modes");
let body = document.querySelector("body");
let winnerMusic = document.querySelector("#winnerAudio");
let backgroundMusic = document.querySelector("#backAudio");
let playbutton = document.querySelector("#play-button");
let compScore = document.querySelector("#compScore");
let playerScore = document.querySelector("#playerScore");
let selectSound = document.querySelector("#select-sound");
let compScoreBox = document.querySelector("#compScoreBox");
let playerScoreBox = document.querySelector("#playerScoreBox");


playbutton.addEventListener("click", ()=>{
    if(backgroundMusic.innerText === "Play") {
        backgroundMusic.play();
        backgroundMusic.innerText = "Pause"
    }
    else {
        backgroundMusic.pause();
        backgroundMusic.innerText = "Play"
    }
});



let array2D = [0,1,2,3,4,5,6,7,8];


let turnO = false; 
let count = 0;
let scoreOfPlayer = 0;
let scoreOfComputer = 0;

function removeElement(array2D, element) {
    let index = array2D.indexOf(element);
    if (index !== -1) {
        array2D.splice(index, 1);
        return ;
    }
    return ;
}

// function playSelectSound() {
//     selectSound.currentTime = 0;
//     selectSound.play();
//     setTimeout(()=> {
//         selectSound.playbackRate = 2;
//         selectSound.pause()
//     }, 3000);
// };
     
const playSelectSound = async () => {
    try {
        selectSound.currentTime = 0;
        await selectSound.play();
    } catch (error) {
        console.error('Raghu we cannot able to play the sound:', error);
    }
}

boxes.forEach((box, index) =>{
    box.addEventListener("mouseenter", playSelectSound);
    box.addEventListener("click", () =>{
        if(turnO) {
            box.innerText = "O";
        }
        else {
            box.innerText = "X";
        }


        box.disabled = true;
        if(checkWinner() === true) {
            showWinner(turnO);
            return;
        }
        count++;
        removeElement(array2D, index);

        if(count == 9) {
            resetGame();
            return;
        }
        setTimeout(() => {
            
            let randomIndex = Math.floor(Math.random() * array2D.length);
            let randomElement = array2D[randomIndex];
            
            if(turnO == true)
                boxes[randomElement].innerText = "X";
            else  boxes[randomElement].innerText = "O";
            boxes[randomElement].disabled = true;
            if(checkWinner() === true) {
                showWinner(true);
                return;
            }
            count++;
            removeElement(array2D, randomElement)

            if(count == 9) {
                resetGame();
                return;
            }

        }, 0); 


    });
});

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

function playMusicForOneSecond() {
    winnerMusic.play();

    setTimeout(() => {
        winnerMusic.pause();
        winnerMusic.currentTime = 0;
    }, 1000);
}


const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val != "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                for(box of boxes) {
                    box.disabled = true;
                }
                boxes[pattern[0]].classList.add("win-animation");
                boxes[pattern[1]].classList.add("win-animation");
                boxes[pattern[2]].classList.add("win-animation");

                boxes[pattern[0]].addEventListener('animationstart', playMusicForOneSecond, { once: true });
                boxes[pattern[0]].addEventListener('animationstart', playMusicForOneSecond, { once: true });
                boxes[pattern[0]].addEventListener('animationstart', playMusicForOneSecond, { once: true });
                return true;
            }
        }
    }
    return false;
}

const showWinner = (winner) => {
    console.log(turnO);
    if(winner === true) {
        scoreOfComputer++;
        compScore.innerText = `${scoreOfComputer}`;
        console.log(scoreOfComputer);
    }
    else {
        scoreOfPlayer++;
        playerScore.innerText = `${scoreOfPlayer}`;
    }
    setTimeout(() => {
        resetGame()
    }, 1100);
   

  };



const disableBoxes = () => {
    for(box of boxes) {
        box.classList.remove("win-animation");
        box.classList.add("reset-animation");
        box.disabled = true;
    }
}

const enableBoxes = () => {
    array2D = [0,1,2,3,4,5,6,7,8];
    for(box of boxes) {
        box.classList.remove("reset-animation");
        box.disabled = false;
        box.innerText = "";
        box.style.background = " #ffffc7";
    }
}



const resetGame = () => {
    turnO = false;
    count = 0;
    disableBoxes();
    setTimeout(enableBoxes, 200);
};

let bodyColor = "white";

const changeMode = () => {
    if(bodyColor == "white") {
        bodyColor = "black";
        body.classList.remove("backGroundImag1")
        body.classList.add("backGroundImag2");
    }
    else {
        bodyColor = "white";
        body.classList.remove("backGroundImag2");
        body.classList.add("backGroundImag1")
    }

}


const stopSelectSound = () => {
    selectSound.pause();
    selectSound.currentTime = 0;
    console.log('Sound stopped successfully');
};

modeBtn.addEventListener('change', (event) => {
    const selectedValue = event.target.value;
    if (selectedValue === 'expert') {
        body.innerHTML = "<h1 style='color: white; font-size: 8rem; text-shadow: 5px 5px 8px rgb(0, 244, 252);'> Comming soon </h1>";

        body.style.height = "100vh";
        body.style.display = 'flex'; 
        body.style.justifyContent = 'center';
        body.style.alignItems = 'center'; 
    }
});



resetBtn.addEventListener("click", resetGame);
playbutton.addEventListener("mouseenter", playSelectSound);
resetBtn.addEventListener("mouseenter", playSelectSound);
modeBtn.addEventListener("mouseenter", playSelectSound);


// playbutton.addEventListener("mouseleave", stopSelectSound);
// resetBtn.addEventListener("mouseleave", stopSelectSound);
// modeBtn.addEventListener("mouseleave", stopSelectSound);