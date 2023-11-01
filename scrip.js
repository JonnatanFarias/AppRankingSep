let scores = [0, 0, 0];
const scoreLimit = 100;
const progressBars = document.querySelectorAll('.progress-value');
const separatorNames = document.querySelectorAll('.separator-name');
const congratulationsDiv = document.getElementById('congratulations');
const winnerSpan = document.getElementById('winner');

function updateProgress() {
    for (let i = 0; i < scores.length; i++) {
        const percentage = (scores[i] / scoreLimit) * 100;
        progressBars[i].style.width = percentage + '%';

        if (scores[i] >= scoreLimit) {
            showCongratulations(separatorNames[i].textContent);
            return;
        }
    }
}

function increaseScore(index) {
    if (scores[index] < scoreLimit) {
        scores[index] += 10;
        updateProgress();
    }
}

function showCongratulations(winner) {
    winnerSpan.textContent = "parabéns, "+winner+"!";
    congratulationsDiv.style.display = 'block';
}
function createConfetti() {
    const container = document.getElementById('confetti-container');
    const confettiCount = 100; // Número de confetes iniciais
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        container.appendChild(confetti);
        confetti.style.setProperty('--random-x', Math.random()); // Define uma posição horizontal aleatória
        confetti.style.animationDuration = Math.random() * 2 + 1 + 's';
        confetti.style.animationDelay = Math.random() * 2 + 's';
    }
}

function updateRanking() {
    const rankingContainer = document.getElementById('ranking');
    const ranking = [];

    for (let i = 0; i < scores.length; i++) {
        ranking.push({
            separator: separatorNames[i].textContent,
            score: scores[i],
        });
    }

    ranking.sort((a, b) => b.score - a.score); // Classifica o ranking por pontuação decrescente

    let rankingHTML = 'Ranking:<br>';

    for (let i = 0; i < ranking.length; i++) {
        rankingHTML += `${i + 1}. ${ranking[i].separator} - ${ranking[i].score} pedidos<br>`;
    }

    rankingContainer.innerHTML = rankingHTML;
}

function updatePodium() {
    const podiumContainer = document.getElementById('podium');
    const ranking = [];

    for (let i = 0; i < scores.length; i++) {
        ranking.push({
            separator: separatorNames[i].textContent,
            score: scores[i],
        });
    }

    ranking.sort((a, b) => b.score - a.score);

    const top3 = ranking.slice(0, 3); // Pega os três primeiros colocados

    podiumContainer.style.display = 'block';

    for (let i = 0; i < top3.length; i++) {
        const podiumItem = podiumContainer.querySelectorAll('.podium-item')[i];
        podiumItem.textContent = `${i + 1}º - ${top3[i].separator}`;
    }
}

function increaseScore(index) {
    if (scores[index] < scoreLimit) {
        scores[index] += 10;
        updateProgress();
        updateRanking();
        updatePodium();
        if (scores[index] >= scoreLimit) {
            showCongratulations(separatorNames[index].textContent);
            createConfetti(); // Crie mais confetes quando atingir 100 pontos
        }
    }
}


// Remova o código anterior de criar confetes no intervalo

document.getElementById('increaseButton0').addEventListener('click', () => increaseScore(0));
//document.getElementById('decreaseButton0').addEventListener('click', () => decreaseScore(0));
document.getElementById('increaseButton1').addEventListener('click', () => increaseScore(1));
//document.getElementById('decreaseButton1').addEventListener('click', () => decreaseScore(1));
document.getElementById('increaseButton2').addEventListener('click', () => increaseScore(2));
//document.getElementById('decreaseButton2').addEventListener('click', () => decreaseScore(2));