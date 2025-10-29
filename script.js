
const questionElement = document.getElementById('question-text');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-button');
const feedbackElement = document.getElementById('feedback');

let currentQuestionIndex = 0;
let score = 0;
let questions = []; // This will be populated from the document later
let missedQuestions = [];

// Placeholder for questions for now
// In a real scenario, this would be fetched from a document or API
const dummyQuestions = [
    {
        question: 'What is the capital of France?',
        answers: [
            { text: 'Berlin', correct: false },
            { text: 'Madrid', correct: false },
            { text: 'Paris', correct: true },
            { text: 'Rome', correct: false }
        ]
    },
    {
        question: 'What is 2 + 2?',
        answers: [
            { text: '3', correct: false },
            { text: '4', correct: true },
            { text: '5', correct: false },
            { text: '6', correct: false }
        ]
    },
    {
        question: 'Which planet is known as the Red Planet?',
        answers: [
            { text: 'Earth', correct: false },
            { text: 'Mars', correct: true },
            { text: 'Jupiter', correct: false },
            { text: 'Venus', correct: false }
        ]
    }
];

function startQuiz() {
    questions = [...dummyQuestions]; // Use dummy questions for now
    currentQuestionIndex = 0;
    score = 0;
    missedQuestions = [];
    nextButton.classList.add('hide');
    feedbackElement.classList.add('hide');
    showQuestion();
}

function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add('hide');
    feedbackElement.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === 'true';

    if (correct) {
        score++;
        feedbackElement.innerText = 'Correct!';
        feedbackElement.style.color = 'green';
    } else {
        feedbackElement.innerText = 'Wrong!';
        feedbackElement.style.color = 'red';
        missedQuestions.push(questions[currentQuestionIndex]);
    }
    feedbackElement.classList.remove('hide');

    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct === 'true');
        button.removeEventListener('click', selectAnswer); // Disable further clicks
    });

    nextButton.classList.remove('hide');
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        // All initial questions answered, now tackle missed questions
        if (missedQuestions.length > 0) {
            questions = [...missedQuestions];
            missedQuestions = []; // Clear for the next round of missed questions
            currentQuestionIndex = 0;
            alert('Time to review missed questions!');
            showQuestion();
        } else {
            endQuiz();
        }
    }
});

function endQuiz() {
    questionElement.innerText = `Quiz Finished! You scored ${score} out of ${dummyQuestions.length + (missedQuestions.length > 0 ? missedQuestions.length : 0)}!`;
    answerButtonsElement.classList.add('hide');
    nextButton.classList.add('hide');
    feedbackElement.classList.add('hide');
    alert(`Quiz Finished! Your final score is ${score}!`);
}

startQuiz();
