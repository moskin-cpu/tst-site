
const questionElement = document.getElementById('question-text');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-button');
const feedbackElement = document.getElementById('feedback');

let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let missedQuestions = [];
let originalQuestions = []; // To store the full list of questions for initial play

// Function to fetch questions from JSON
async function fetchQuestions() {
    try {
        const response = await fetch('questions.json');
        originalQuestions = await response.json();
        startGame(originalQuestions);
    } catch (error) {
        console.error('Error fetching questions:', error);
        questionElement.innerText = 'Error loading quiz. Please try again later.';
    }
}

function startGame(qList) {
    questions = [...qList]; // Copy questions for current game session
    currentQuestionIndex = 0;
    score = 0;
    missedQuestions = [];
    nextButton.classList.add('hide');
    feedbackElement.classList.add('hide');
    nextButton.removeEventListener('click', reviewNextQuestionHandler); // Ensure only one handler is active
    nextButton.addEventListener('click', nextQuestionHandler); // Add original handler
    showQuestion();
}

function showQuestion() {
    resetState();
    if (currentQuestionIndex < questions.length) {
        let currentQuestion = questions[currentQuestionIndex];
        questionElement.innerText = currentQuestion.question;
        currentQuestion.options.forEach(option => {
            const button = document.createElement('button');
            button.innerText = option;
            button.classList.add('btn');
            if (option === currentQuestion.correct_answer) {
                button.dataset.correct = true;
            }
            button.addEventListener('click', selectAnswer);
            answerButtonsElement.appendChild(button);
        });
    } else {
        endGame();
    }
}

function resetState() {
    clearFeedback();
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === 'true';
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct === 'true');
        button.removeEventListener('click', selectAnswer); // Disable further clicks
    });

    if (correct) {
        // Score is only incremented on initial attempt. No score for review.
        if (questions === originalQuestions) { // Check if we are in the initial game run
            score++;
        }
        showFeedback('Correct!', 'correct');
    } else {
        showFeedback('Wrong! The correct answer was: ' + questions[currentQuestionIndex].correct_answer, 'wrong');
        missedQuestions.push(questions[currentQuestionIndex]);
    }

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

function showFeedback(message, type) {
    feedbackElement.innerText = message;
    feedbackElement.classList.remove('hide');
    feedbackElement.classList.remove('correct', 'wrong');
    feedbackElement.classList.add(type);
}

function nextQuestionHandler() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else if (missedQuestions.length > 0) {
        startReviewMissedQuestions();
    } else {
        endGame();
    }
}

function startReviewMissedQuestions() {
    alert('Time to review your missed questions!');
    questions = [...missedQuestions]; // Now "questions" array holds only missed questions
    currentQuestionIndex = 0;
    missedQuestions = []; // Reset for potential new misses during review
    
    nextButton.removeEventListener('click', nextQuestionHandler); // Remove original handler
    nextButton.addEventListener('click', reviewNextQuestionHandler); // Add review handler
    showQuestion(); // Start showing missed questions
}

function reviewNextQuestionHandler() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        // If all "missed questions" (now in 'questions' array) are answered, check if any were missed again.
        if (missedQuestions.length > 0) {
            startReviewMissedQuestions(); // Re-review newly missed questions
        } else {
            endGame(); // All questions answered correctly
        }
    }
}

function endGame() {
    resetState();
    questionElement.innerText = `Quiz Finished! You got ${score} out of ${originalQuestions.length} questions correct in your initial attempt.`;
    nextButton.classList.add('hide');
    feedbackElement.classList.add('hide');
    
    const restartButton = document.createElement('button');
    restartButton.innerText = 'Restart Quiz';
    restartButton.classList.add('btn');
    restartButton.addEventListener('click', () => startGame(originalQuestions)); // Restart from original questions
    answerButtonsElement.appendChild(restartButton);
}

// Initial fetch to start the game
fetchQuestions();
