// Banco de questões
const questions = [
    {
        question: "Qual tag HTML é usada para criar um link para outra página?",
        options: [
            "<link>",
            "<a>",
            "<href>",
            "<navigate>"
        ],
        correct: 1,
        explanation: "A tag <a> (âncora) é usada para criar hiperlinks em HTML, permitindo a navegação entre páginas através do atributo href."
    },
    {
        question: "Qual seletor CSS é usado para selecionar um elemento pelo seu ID?",
        options: [
            ". (ponto)",
            "# (cerquilha)",
            "* (asterisco)",
            ": (dois pontos)"
        ],
        correct: 1,
        explanation: "A cerquilha (#) é usada para selecionar um elemento com um id específico, por exemplo: #meu-id."
    },
    {
        question: "Em JavaScript, qual é o método para adicionar um novo elemento ao final de um array?",
        options: [
            "pop()",
            "shift()",
            "push()",
            "splice()"
        ],
        correct: 2,
        explanation: "O método push() adiciona um ou mais elementos ao final de um array e retorna o novo comprimento do array."
    },
    {
        question: "O que o termo \"responsivo\" significa no desenvolvimento web?",
        options: [
            "Usar apenas CSS para estilizar a página",
            "Ter um design que se adapta a diferentes tamanhos de tela e dispositivos",
            "Criar uma versão separada do site para dispositivos móveis",
            "Usar apenas JavaScript para o design"
        ],
        correct: 1,
        explanation: "Um design responsivo garante que a experiência do usuário seja consistente e agradável, independentemente do dispositivo usado para acessar o site (computador, tablet, celular, etc.)."
    },
    {
        question: "Qual é o propósito do flexbox no CSS?",
        options: [
            "Criar animações complexas",
            "Gerenciar o layout de elementos em uma única direção (linha ou coluna)",
            "Definir a tipografia da página",
            "Mudar a cor do plano de fundo"
        ],
        correct: 1,
        explanation: "O flexbox é uma ferramenta poderosa para criar layouts flexíveis e alinhamentos de elementos de forma eficiente."
    },
    {
        question: "Para que serve o operador === em JavaScript?",
        options: [
            "Para atribuição de valor",
            "Para comparação de valor, ignorando o tipo",
            "Para comparação estrita (valor e tipo)",
            "Para verificar se um valor é nulo"
        ],
        correct: 2,
        explanation: "O operador === (igualdade estrita) verifica se os dois operandos são iguais em valor e tipo de dados, evitando conversões de tipo indesejadas."
    },
    {
        question: "O que a tag <script> faz em uma página HTML?",
        options: [
            "Estiliza o conteúdo da página",
            "Insere um arquivo de vídeo",
            "Define metadados da página",
            "Inclui código JavaScript"
        ],
        correct: 3,
        explanation: "A tag <script> é usada para incorporar ou referenciar scripts executáveis, geralmente em JavaScript."
    },
    {
        question: "O que é um \"framework\" de desenvolvimento web?",
        options: [
            "Um sistema operacional",
            "Uma ferramenta de design gráfico",
            "Um conjunto de bibliotecas e convenções que facilitam o desenvolvimento de aplicações",
            "Um tipo de servidor de internet"
        ],
        correct: 2,
        explanation: "Frameworks como React, Vue e Angular fornecem uma estrutura base, agilizando o desenvolvimento ao resolver problemas comuns e promover a reutilização de código."
    },
    {
        question: "Qual o melhor local para colocar a tag <script> para melhorar o desempenho de carregamento de uma página?",
        options: [
            "No <head>",
            "No final do <body>, antes do fechamento",
            "No meio do <body>",
            "Em um arquivo CSS separado"
        ],
        correct: 1,
        explanation: "Colocar o <script> no final do <body> permite que o navegador renderize o conteúdo HTML e CSS antes de carregar o JavaScript, o que melhora a percepção de velocidade da página."
    },
    {
        question: "O que significa \"HTTP\" em uma URL?",
        options: [
            "Linguagem de Marcação de Hipertexto",
            "Protocolo de Transferência de Hipertexto",
            "Transferência de Dados da Web",
            "Protocolo de Segurança da Web"
        ],
        correct: 1,
        explanation: "O HTTP (Hypertext Transfer Protocol) é o protocolo usado para a comunicação entre o navegador do usuário e o servidor web."
    }
];

// Elementos do DOM
const introSection = document.getElementById('quiz-intro');
const questionsSection = document.getElementById('quiz-questions');
const resultsSection = document.getElementById('quiz-results');
const startButton = document.getElementById('start-quiz');
const prevButton = document.getElementById('prev-question');
const nextButton = document.getElementById('next-question');
const retryButton = document.getElementById('retry-quiz');
const progressBar = document.getElementById('progress-bar');
const currentQuestionSpan = document.getElementById('current-question');
const questionContainer = document.querySelector('.question-container');

// Estado do quiz
let currentQuestionIndex = 0;
let userAnswers = new Array(questions.length).fill(null);

// Event Listeners
startButton.addEventListener('click', startQuiz);
prevButton.addEventListener('click', showPreviousQuestion);
nextButton.addEventListener('click', handleNextQuestion);
retryButton.addEventListener('click', resetQuiz);

// Funções
function startQuiz() {
    introSection.classList.remove('active');
    questionsSection.classList.add('active');
    showQuestion(0);
}

// Tornar selectOption global
window.selectOption = function(optionIndex) {
    userAnswers[currentQuestionIndex] = optionIndex;
    showQuestion(currentQuestionIndex); // Atualizar a pergunta para mostrar a explicação
};

function showQuestion(index) {
    currentQuestionIndex = index;
    const question = questions[index];
    
    // Atualizar progresso
    progressBar.style.width = `${((index + 1) / questions.length) * 100}%`;
    currentQuestionSpan.textContent = index + 1;
    
    // Criar HTML da pergunta
    questionContainer.innerHTML = `
        <div class="question">
            <h3>${question.question}</h3>
        </div>
        <div class="options">
            ${question.options.map((option, i) => `
                <div class="option ${userAnswers[index] === i ? 'selected' : ''}" 
                     onclick="selectOption(${i})">
                    ${option}
                </div>
            `).join('')}
        </div>
        ${userAnswers[index] !== null ? `
            <div class="explanation ${userAnswers[index] === question.correct ? 'correct' : 'wrong'}">
                <p><strong>${userAnswers[index] === question.correct ? '✓ Correto!' : '✗ Incorreto!'}</strong></p>
                <p>${question.explanation}</p>
            </div>
        ` : ''}`;

    // Atualizar estado dos botões
    prevButton.disabled = index === 0;
    nextButton.textContent = index === questions.length - 1 ? 'Finalizar' : 'Próxima';
}

function selectOption(optionIndex) {
    userAnswers[currentQuestionIndex] = optionIndex;
    
    // Atualizar visual das opções
    const options = questionContainer.querySelectorAll('.option');
    options.forEach((option, i) => {
        option.classList.toggle('selected', i === optionIndex);
    });
}

function showPreviousQuestion() {
    if (currentQuestionIndex > 0) {
        showQuestion(currentQuestionIndex - 1);
    }
}

function handleNextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        showQuestion(currentQuestionIndex + 1);
    } else {
        showResults();
    }
}

function showResults() {
    questionsSection.classList.remove('active');
    resultsSection.classList.add('active');

    // Calcular pontuação
    const correctAnswers = userAnswers.reduce((total, answer, index) => 
        total + (answer === questions[index].correct ? 1 : 0), 0);
    const percentage = Math.round((correctAnswers / questions.length) * 100);

    // Atualizar elementos visuais
    document.getElementById('score-percentage').textContent = percentage;
    document.getElementById('correct-answers').textContent = correctAnswers;
    document.getElementById('wrong-answers').textContent = questions.length - correctAnswers;
    
    // Animar círculo de resultados
    const circle = document.getElementById('results-circle');
    const circumference = 2 * Math.PI * 15.9155;
    const offset = circumference - (percentage / 100 * circumference);
    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    circle.style.strokeDashoffset = offset;

    // Definir mensagem baseada na pontuação
    const message = document.getElementById('results-message');
    if (percentage >= 90) {
        message.textContent = "Excelente! Você é um expert em desenvolvimento web!";
    } else if (percentage >= 70) {
        message.textContent = "Muito bom! Você tem um bom conhecimento em desenvolvimento web!";
    } else if (percentage >= 50) {
        message.textContent = "Continue estudando! Você está no caminho certo.";
    } else {
        message.textContent = "Não desanime! Que tal revisar o material e tentar novamente?";
    }
}

function resetQuiz() {
    currentQuestionIndex = 0;
    userAnswers = new Array(questions.length).fill(null);
    resultsSection.classList.remove('active');
    questionsSection.classList.remove('active');
    introSection.classList.add('active');
}

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    // Garantir que apenas a introdução esteja visível inicialmente
    questionsSection.classList.remove('active');
    resultsSection.classList.remove('active');
    introSection.classList.add('active');
});
