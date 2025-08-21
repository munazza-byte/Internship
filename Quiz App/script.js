const questions = [
    {
        question : "Which of the following is NOT a JavaScript data type?",
        answers : [
            {text: "Number", correct : false},
            {text: "Boolean", correct : false},
            {text: "Float", correct : true},
            {text: "String", correct : false},

        ]
    },
    {
        question : "What is the result of the expression typeof null in JavaScript?",
        answers : [
            {text: "null", correct : false},
            {text: "object", correct : true},
            {text: "undefined", correct : false},
            {text: "boolean", correct : false},
        ]
    },
    {
       question : "Which method is used to add one or more elements to the end of an array?",
        answers : [
            {text: "push()", correct : true},
            {text: "pop()", correct : false},
            {text: "shift()", correct : false},
            {text: "unshift()", correct : false},
        ] 
    },
    {
        question : "What will console.log(2 + \"2\")output?",
        answers : [
            {text:"4", correct : false},
            {text: "22", correct : true},
            {text: "NaN", correct : false},
            {text: "undefined", correct : false},
        ]
    },
    {
        question : "Which of the following is the correct way to declare a variable in JavaScript?",
        answers : [
            {text: "var myVar;", correct : false},
            {text: "let myVar;", correct : false},
            {text: "const myVar = value;", correct : false},
            {text: "All of the above", correct : true},
        ]
    }
];

const questionElement = document.querySelectorAll(".question");
const answerElement = document.querySelectorAll(".answer");
const submitBtn = document.querySelector("#submit");

let answerSelected = Array(questions.length).fill(null);

questions.forEach((q, i) =>{
    questionElement[i].textContent = `${i + 1}. ${q.question}`;
    const btns = answerElement[i].querySelectorAll(".btn") ;
    
q.answers.forEach((ans ,index) =>{
    btns[index].textContent =ans.text;
    btns[index].dataset.correct = ans.correct;
    btns[index].addEventListener("click", () => {
    // Reset all button colors for this question
    btns.forEach(b => { 
        b.style.backgroundColor = ""; 
        b.style.color = ""; 
    });

    answerSelected[i] = ans.correct;

    if (ans.correct) {
        btns[index].style.backgroundColor = "green";
        btns[index].style.color = "white";
    } else {
        btns[index].style.backgroundColor = "red";
        btns[index].style.color = "white";
        }
        });
    });
});
const para = document .querySelector("p")
submitBtn.addEventListener("click", ()=>{
    let score = answerSelected.filter(ans =>ans === true).length;
    para.textContent =`Here is the Result:
    You Scored ${score} Out Of ${questions.length}.`;
});
