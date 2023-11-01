
// Global variables
let currentQuestionIndex = 0;
let score = 0;
let questions = [];

// Function to load quiz data
function loadQuizData() {
    fetch('quiz_data.json')
        .then(response => response.json())
        .then(data => {
            questions = data; // Corrected the assignment here
            // Ensure questions are loaded before displaying
            if (questions.length > 0) {
                showQuestion(currentQuestionIndex);
            } else {
                console.error('No questions found in the quiz data.');
            }
        })
        .catch(error => {
            console.error('Error loading quiz data:', error);
        });
}

// Function to show a question
function showQuestion(index) {
    const questionText = document.getElementById('question');
    const optionsContainer = document.getElementById('options');
    const explanationText = document.getElementById('explanation');

    // Hide the explanation initially
    if (explanationText) {
        explanationText.style.display = 'none';
    }

    // Clear previous options
    if (optionsContainer) {
        optionsContainer.innerHTML = '';
    }

    // Set the question text and options
    if (index < questions.length) {
        const currentQuestion = questions[index];
        if (questionText) {
            questionText.innerText = currentQuestion.question;
        }

        currentQuestion.options.forEach((option, idx) => {
            const button = document.createElement('button');
            button.innerText = option;
            button.className = 'answer-button';
            button.onclick = () => selectAnswer(idx, currentQuestion.answer, explanationText, currentQuestion.explanation);
            if (optionsContainer) {
                optionsContainer.appendChild(button);
            }
        });
    }
}

// Function to select an answer
function selectAnswer(selectedIndex, correctAnswer, explanationText, explanation) {
    const optionButtons = document.querySelectorAll('.answer-button');
    let isCorrect = optionButtons[selectedIndex].innerText === correctAnswer;
    if (isCorrect) {
        score++;
        optionButtons[selectedIndex].classList.add('correct');
    } else {
        optionButtons[selectedIndex].classList.add('incorrect');
    }

    // Show the explanation
    if (explanationText) {
        explanationText.innerText = explanation;
        explanationText.style.display = 'block';
    }

    // Disable all options after selection
    optionButtons.forEach(button => {
        button.disabled = true;
    });
}

// Function to move to the next question
function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion(currentQuestionIndex);
    } else {
        showResults();
    }
}

// Function to show the results
function showResults() {
    const quizContainer = document.getElementById('quiz-container');
    if (quizContainer) {
        quizContainer.innerHTML = `<h2>Your score: ${score} out of ${questions.length}</h2><button onclick="restartQuiz()">Restart Quiz</button>`;
    }
}

// Function to restart the quiz
function restartQuiz() {
    score = 0;
    currentQuestionIndex = 0;
    loadQuizData(); // Reload quiz data
}

// Load the quiz data when the page is ready
document.addEventListener('DOMContentLoaded', loadQuizData);
