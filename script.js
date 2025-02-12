document.addEventListener("DOMContentLoaded", () => {
    const wasteContainer = document.getElementById("waste-container");
    const scoreDisplay = document.getElementById("score");
    const levelDisplay = document.getElementById("level");
    const timerDisplay = document.getElementById("timer");
    const prevLevelBtn = document.querySelector(".level-button-container:nth-child(1) img");
    const nextLevelBtn = document.querySelector(".level-button-container:nth-child(2) img");

    const homeButton = document.querySelector(".menu[alt='Home']");
    const restartButton = document.querySelector(".menu[alt='Restart']");
    const volumeOnButton = document.querySelector(".menu[alt='Volume-on']");
    const volumeOffButton = document.querySelector(".menu[alt='Volume-off']");

    const backgroundMusic = new Audio("audio/bgm.mp3");
    backgroundMusic.loop = true;
    backgroundMusic.volume = 0.5; // Volume awal

    let score = 0;
    let level = 1;
    let dropSpeed = 2000;
    let gameTime = 60; // 1 menit per level
    let requiredScore = 100;
    let gameInterval, timerInterval;

    const wasteImages = [
        "img/organik.png", // Organik
        "img/anorganik.png", // Anorganik
        "img/logam.png" // Logam
    ];

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

    function checkWaste(type) {
        const wastes = document.querySelectorAll(".waste");
        wastes.forEach((waste) => {
            const wasteBottom = waste.offsetTop + waste.offsetHeight;
            if (wasteBottom >= wasteContainer.clientHeight - 50 && waste.dataset.type == type) {
                let points = Math.floor(Math.random() * 6) + 5; // 5-10 poin
                score += points;
                scoreDisplay.textContent = score;
                waste.remove();
                if (score >= requiredScore) {
                    nextLevelBtn.style.opacity = "1"; // Aktifkan tombol
                }
            }
        });
    }

    function startGame() {
        score = 0;
        gameTime = 60;
        scoreDisplay.textContent = score;
        levelDisplay.textContent = level;
        timerDisplay.textContent = gameTime;
        nextLevelBtn.style.opacity = "0.5"; // Matikan tombol awalnya
        prevLevelBtn.style.opacity = level === 1 ? "0.5" : "1"; // Matikan tombol jika level 1

        clearInterval(gameInterval);
        clearInterval(timerInterval);
        
        gameInterval = setInterval(spawnWaste, dropSpeed);
        timerInterval = setInterval(() => {
            gameTime--;
            timerDisplay.textContent = gameTime;
            if (gameTime <= 0) {
                clearInterval(gameInterval);
                clearInterval(timerInterval);
            }
        }, 1000);
    }

    function nextLevel() {
        if (score >= requiredScore) {
            level++;
            dropSpeed = Math.max(500, dropSpeed - 200);
            requiredScore += 50;
            startGame();
        }
    }

    function prevLevel() {
        if (level > 1) {
            level--;
            dropSpeed += 200;
            requiredScore -= 50;
            startGame();
        }
    }

    document.addEventListener("keydown", (event) => {
        if (event.key === "a") checkWaste(0); // Organik
        if (event.key === "s") checkWaste(1); // Anorganik
        if (event.key === "d") checkWaste(2); // Logam
    });

    document.getElementById("organic").addEventListener("click", () => checkWaste(0));
    document.getElementById("anorganic").addEventListener("click", () => checkWaste(1));
    document.getElementById("metal").addEventListener("click", () => checkWaste(2));

    document.querySelector(".level-button-container:nth-child(2)").addEventListener("click", nextLevel);
    document.querySelector(".level-button-container:nth-child(1)").addEventListener("click", prevLevel);

    // --- Tambahan Fungsi Baru ---
    
    // Fungsi kembali ke halaman menu utama
    homeButton.addEventListener("click", () => {
        window.location.href = "menu.html"; // Ganti dengan file menu yang sesuai
    });

    // Fungsi restart game
    restartButton.addEventListener("click", () => {
        startGame(); // Memanggil ulang fungsi untuk memulai game dari awal
    });

    // Fungsi menyalakan suara
    volumeOnButton.addEventListener("click", () => {
        backgroundMusic.play();
    });

    // Fungsi mematikan suara
    volumeOffButton.addEventListener("click", () => {
        backgroundMusic.pause();
    });

    startGame();
});
