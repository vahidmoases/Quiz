const questions = [
    {
        question: "What is the capital city of Switzerland?",
        answers: [
            {text : 'Bern', correct: true},
            {text : 'Zurich', correct: false},
            {text : 'Geneva', correct: false},
            {text : 'Basel', correct: false}
        ]
    },
    {
        question: "What is the name of the largest bone in the human body?",
        answers: [
            {text : 'Humerus', correct: false},
            {text : 'Femur', correct: true},
            {text : 'Tibia', correct: false},
            {text : 'Pelvis', correct: false}
        ]
    },
    {
        question: "Which planet is the second smallest in the solar system?",
        answers: [
            {text : 'Mercury', correct: true},
            {text : 'Mars', correct: false},
            {text : 'Venus', correct: false},
            {text : 'Earth', correct: false}
        ]
    },
    {
        question: "Which animal has the longest lifespan?",
        answers: [
            {text : 'Elephant', correct: false},
            {text : 'Whale', correct: false},
            {text : 'tortoise', correct: true},
            {text : 'parrot', correct: false}
        ]
    }
];
const questionElement = document.getElementById("question");
const answerButttons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;


function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex +1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButttons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
    });
}
function resetState(){
    nextButton.style.display = 'none';
    while(answerButttons.firstChild){
        answerButttons.removeChild(answerButttons.firstChild);
    }
}
function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButttons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `you scored ${score} out of ${questions.length}`;
    nextButton.innerHTML = "play again";
    nextButton.style.display = "block"
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}


nextButton.addEventListener("click", ()=> {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else {
        startQuiz();
    }
})

startQuiz();