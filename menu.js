document.addEventListener("DOMContentLoaded", function () {
    // Ambil elemen tombol dan popup
    const playButton = document.getElementById("play");
    const aboutButton = document.getElementById("about");
    const optionButton = document.getElementById("option");
    const infoButton = document.getElementById("info"); // Tambahan tombol Info
    const popupOverlay = document.getElementById("popup-overlay");
    const popupContent = document.getElementById("popup-content");
    const closePopup = document.getElementById("close-popup");

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
        window.location.href = "index.html";
    });

    // Event listener tombol "About" -> Menampilkan informasi tentang game
    aboutButton.addEventListener("click", function () {
        showPopup(`
            <h2>Tentang Sort It! Green</h2>
            <p>Sort It! Green adalah permainan edukasi di mana pemain memilah sampah 
            ke dalam kategori yang benar untuk membantu menjaga lingkungan.</p>
        `);
    });

    // Event listener tombol "Option" -> Menampilkan pengaturan game
    optionButton.addEventListener("click", function () {
        showPopup(`
            <h2>Pengaturan</h2>
            <label><input type="checkbox" id="sound"> Aktifkan Suara</label><br>
            <label><input type="checkbox" id="vibration"> Aktifkan Getaran</label>
        `);
    });

    // Event listener tombol "Info" -> Menampilkan panduan cara bermain
    infoButton.addEventListener("click", function () {
        showPopup(`
            <h2>Cara Bermain</h2>
            <div>
                <p style="text-align:start;" >Sampah organik : Organik merupakan sampah sisa makanan dan daun dapat terurai alami dan cocok untuk dijadikan kompos. <br>
                <p>Sampah anorganik : Anorganik merupakan samapah yang tidak mudah terurai tetapi bisa didaur ulang untuk mengurangi limbah. Contohnya : plastik dan kaca <br>
                <p>Sampah logam : Logam merupakan sampah yang dapat dilebur dan digunakan kembali dalam berbagai industri. Contohnya : kaleng dan besi <br>
                </p>
            </div>
        `);
    });

    // Event listener untuk tombol close popup
    closePopup.addEventListener("click", closePopupHandler);
});
