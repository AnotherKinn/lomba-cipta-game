document.addEventListener("DOMContentLoaded", () => {
    const wasteContainer = document.getElementById("waste-container");
    const scoreDisplay = document.getElementById("score");
    const highScoreDisplay = document.getElementById("high-score");
    const levelDisplay = document.getElementById("level");
    const timerDisplay = document.getElementById("timer");
    const prevLevelBtn = document.querySelector(".level-button-container:nth-child(1) img");
    const nextLevelBtn = document.querySelector(".level-button-container:nth-child(2) img");
    const homeButton = document.querySelector(".menu[alt='Home']");
    const restartButton = document.querySelector(".menu[alt='Restart']");
    const volumeOnButton = document.querySelector(".menu[alt='Volume-on']");
    const volumeOffButton = document.querySelector(".menu[alt='Volume-off']");

    const backgroundMusic = new Audio("/assets/sound/game.mp3");
    backgroundMusic.loop = true;
    backgroundMusic.volume = 1;

    const buttonClickSound = new Audio("/assets/sound/click.mp3");
    const correctSound = new Audio("/assets/sound/correct.wav");
    const wrongSound = new Audio("/assets/sound/wrong.wav");
    const gameOverSound = new Audio("/assets/sound/game-over.mp3");

    let isSoundOn = true;

    function playSound(sound) {
        if (isSoundOn) {
            sound.currentTime = 0;
            sound.play();
        }
    }

    const gameOverPopup = document.getElementById("game-over-popup");
    const finalScoreDisplay = document.getElementById("final-score");
    const restartGameButton = document.getElementById("restart-game");
    const quitGameButton = document.getElementById("quit-game");
    const overlay = document.getElementById("overlay");

    let score = 0;
    let highScore = 0;
    let level = 1;
    let dropSpeed = 2000;
    let gameTime = 60;
    let requiredScore = 100;
    let gameInterval, timerInterval;

    const wasteImages = ["/assets/img/organik.png", "/assets/img/anorganik.png", "/assets/img/logam.png"];

    function spawnWaste() {
        const waste = document.createElement("img");
        waste.classList.add("waste");
        const wasteType = Math.floor(Math.random() * 3);
        waste.src = wasteImages[wasteType];
        waste.dataset.type = wasteType;
        waste.style.position = "absolute";
        waste.style.left = Math.random() * (wasteContainer.clientWidth - 50) + "px";
        waste.style.top = "0px";
        waste.style.width = "50px";
        waste.style.height = "50px";
        wasteContainer.appendChild(waste);
        animateWaste(waste);
    }

    function showGameOverPopup() {
        finalScoreDisplay.textContent = score;
        gameOverPopup.style.display = "flex";
        overlay.style.display = "block";
        playSound(gameOverSound);
    }

    function hideGameOverPopup() {
        gameOverPopup.style.display = "none";
        overlay.style.display = "none";
    }

    function animateWaste(waste) {
        let position = 0;
        const fallInterval = setInterval(() => {
            position += 2 + level;
            waste.style.top = position + "px";

            if (position >= wasteContainer.clientHeight - 50) {
                clearInterval(fallInterval);
                waste.remove();
                decreaseScore();
            }
        }, 20);
    }

    function decreaseScore() {
        score = Math.max(0, score);
        scoreDisplay.textContent = score;
    }

    function updateHighScore() {
        if (score > highScore) {
            highScore = score;
            highScoreDisplay.textContent = highScore;
        }
    }

    function checkWaste(type) {
        let correct = false;
        const wastes = document.querySelectorAll(".waste");
        wastes.forEach((waste) => {
            const wasteBottom = waste.offsetTop + waste.offsetHeight;
            if (wasteBottom >= wasteContainer.clientHeight - 50) {
                if (waste.dataset.type == type) {
                    correct = true;
                    let points = Math.floor(Math.random() * 6) + 5;
                    score += points;
                    scoreDisplay.textContent = score;
                    updateHighScore();
                    waste.remove();
                    playSound(correctSound);
                    if (score >= requiredScore) {
                        nextLevelBtn.style.opacity = "1";
                    }
                }
            }
        });
        if (!correct) playSound(wrongSound);
    }
    function nextLevel() {
        if (score >= requiredScore) {
            level++;
            dropSpeed = Math.max(500, dropSpeed - 200);
            requiredScore += 25;
            startGame();
        }
    }

    function prevLevel() {
        if (level > 1) {
            level--;
            dropSpeed += 200;
            requiredScore -= 25;
            startGame();
        }
    }

    // Tambahkan event listener untuk tombol next level dan previous level
    if (nextLevelBtn) {
        nextLevelBtn.addEventListener("click", () => {
            playSound(buttonClickSound);
            nextLevel();
        });
    } else {
        console.error("Next Level button tidak ditemukan di DOM!");
    }

    if (prevLevelBtn) {
        prevLevelBtn.addEventListener("click", () => {
            playSound(buttonClickSound);
            prevLevel();
        });
    } else {
        console.error("Previous Level button tidak ditemukan di DOM!");
    }


    function startGame() {
        hideGameOverPopup();
        score = 0;
        gameTime = 60;
        scoreDisplay.textContent = score;
        levelDisplay.textContent = level;
        timerDisplay.textContent = gameTime;
        nextLevelBtn.style.opacity = "0.5";
        prevLevelBtn.style.opacity = level === 1 ? "0.5" : "1";
        playSound(backgroundMusic);

        clearInterval(gameInterval);
        clearInterval(timerInterval);

        gameInterval = setInterval(spawnWaste, dropSpeed);
        timerInterval = setInterval(() => {
            gameTime--;
            timerDisplay.textContent = gameTime;
            if (gameTime <= 0) {
                clearInterval(gameInterval);
                clearInterval(timerInterval);
                showGameOverPopup();
            }
        }, 1000);
    }

    // 🔴 **Perbaikan Event Listener untuk Home dan Restart**
    if (homeButton) {
        homeButton.addEventListener("click", () => {
            playSound(buttonClickSound);
            window.location.href = "menu.html";
        });
    } else {
        console.error("Home button tidak ditemukan di DOM!");
    }

    if (restartButton) {
        restartButton.addEventListener("click", () => {
            playSound(buttonClickSound);
            window.location.reload(); // Memuat ulang halaman untuk restart
        });
    } else {
        console.error("Restart button tidak ditemukan di DOM!");
    }

    restartGameButton.addEventListener("click", startGame);
    quitGameButton.addEventListener("click", () => window.location.href = "menu.html");

    document.addEventListener("keydown", (event) => {
        if (event.key === "a") checkWaste(0);
        if (event.key === "s") checkWaste(1);
        if (event.key === "d") checkWaste(2);
    });

    document.getElementById("organic").addEventListener("click", () => checkWaste(0));
    document.getElementById("anorganic").addEventListener("click", () => checkWaste(1));
    document.getElementById("metal").addEventListener("click", () => checkWaste(2));

    volumeOnButton.addEventListener("click", () => {
        isSoundOn = true;
        playSound(backgroundMusic);
    });

    volumeOffButton.addEventListener("click", () => {
        isSoundOn = false;
        [backgroundMusic, correctSound, wrongSound, gameOverSound, buttonClickSound].forEach(sound => {
            sound.pause();
            sound.currentTime = 0;
        });
    });

    startGame();
});
