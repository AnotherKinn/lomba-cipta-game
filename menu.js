document.addEventListener("DOMContentLoaded", function () {
    // Ambil elemen tombol dan popup
    const playButton = document.getElementById("play");
    const aboutButton = document.getElementById("about");
    const optionButton = document.getElementById("option");
    const infoButton = document.getElementById("info"); // Tambahan tombol Info
    const popupOverlay = document.getElementById("popup-overlay");
    const popupContent = document.getElementById("popup-content");
    const closePopup = document.getElementById("close-popup");

    // Tambahkan efek suara klik
    const clickSound = new Audio("/assets/sound/click.mp3");

    function playClickSound() {
        clickSound.currentTime = 0;
        clickSound.play();
    }

    // Tambahkan background music
    const menuMusic = new Audio("/assets/sound/menu.mp3");
    menuMusic.loop = true;
    menuMusic.volume = 0.5;
    menuMusic.play();

    // Fungsi untuk menampilkan popup dengan konten dinamis
    function showPopup(content) {
        popupContent.innerHTML = content;
        popupOverlay.style.display = "flex";
    }

    // Fungsi untuk menutup popup
    function closePopupHandler() {
        popupOverlay.style.display = "none";
    }

    // Event listener tombol "Play" -> Menuju ke gameplay.html
    playButton.addEventListener("click", function () {
        playClickSound();
        menuMusic.pause(); // Hentikan musik saat masuk ke permainan
        window.location.href = "gameplay.html";
    });

    // Event listener tombol "About" -> Menampilkan informasi tentang game
    aboutButton.addEventListener("click", function () {
        playClickSound();
        showPopup(`
            <h2>Tentang Sort It! Green</h2>
            <p>Sort It! Green adalah permainan edukasi di mana pemain memilah sampah 
            ke dalam kategori yang benar untuk membantu menjaga lingkungan.</p>
        `);
    });

    // Event listener tombol "Option" -> Menampilkan pengaturan game
    optionButton.addEventListener("click", function () {
        playClickSound();
        showPopup(`
            <h2>Tips</h2>
            <p><b>Sampah organik</b> : Merupakan sampah yang mudah terurai dan dapat dijadikan kompos</p>
            <p></b>Sampah anorganik</b> : Merupakan sampah yang susah diurai dan dapat didaur ulang</p>
            <p><b>Sampah logam</b> : Merupakan sampah yang biasanya berasal dari aktivitas industri logam</p>
        `);
    });

    // Event listener tombol "Info" -> Menampilkan panduan cara bermain
    infoButton.addEventListener("click", function () {
        playClickSound();
        showPopup(`
            <h2>Cara Bermain</h2>
            <div style="display: flex; justify-content: center; gap: 15px; text-align: center;">
                <div>
                    <img src="/assets/img/organik.png" alt="Sampah Organik" width="80">
                    <p><strong>Tombol A</strong><br>Sampah Organik</p>
                </div>
                <div>
                    <img src="/assets/img/anorganik.png" alt="Sampah Anorganik" width="80">
                    <p><strong>Tombol S</strong><br>Sampah Anorganik</p>
                </div>
                <div>
                    <img src="/assets/img/logam.png" alt="Sampah Logam" width="80">
                    <p><strong>Tombol D</strong><br>Sampah Logam</p>
                </div>
            </div>
        `);
    });

    // Event listener untuk tombol close popup
    closePopup.addEventListener("click", function () {
        playClickSound();
        closePopupHandler();
    });
});
