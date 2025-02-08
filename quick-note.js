// Firebase bağlantısını içe aktar
import { addDoc, collection, db } from "./firebase-config.js";
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("quick-note-form");
    const categories = document.querySelectorAll(".category");

    // ⭐ Yıldızları güncelleyen fonksiyon
    function updateStars(container, value) {
        const stars = container.querySelectorAll(".star");
        stars.forEach((star, index) => {
            if (index < value) {
                star.classList.add("selected");
            } else {
                star.classList.remove("selected");
            }
        });
        container.dataset.selectedValue = value; // Seçili değeri güncelle
    }

    // ⭐ Yıldızları oluşturma fonksiyonu (ilk kez sayfa açıldığında)
    function createStars() {
        categories.forEach(category => {
            const starsContainer = category.querySelector(".stars");

            // Eğer zaten yıldızlar varsa tekrar ekleme
            if (starsContainer.children.length === 10) return;

            for (let i = 1; i <= 10; i++) {
                const star = document.createElement("span");
                star.textContent = "★";
                star.classList.add("star");
                star.dataset.value = i;
                starsContainer.appendChild(star);
            }

            // Yıldızlara tıklama işlemi
            starsContainer.addEventListener("click", function (event) {
                if (event.target.classList.contains("star")) {
                    const selectedValue = event.target.dataset.value;
                    updateStars(starsContainer, selectedValue);
                }
            });

            // Fare yıldızların üzerinden geçtiğinde önizleme
            starsContainer.addEventListener("mouseover", function (event) {
                if (event.target.classList.contains("star")) {
                    const hoverValue = event.target.dataset.value;
                    updateStars(starsContainer, hoverValue);
                }
            });

            // Fare yıldızların üzerinden çıkınca seçili olanı göster
            starsContainer.addEventListener("mouseleave", function () {
                const selectedValue = starsContainer.dataset.selectedValue || 0;
                updateStars(starsContainer, selectedValue);
            });

            // Başlangıç değeri olarak sıfır ata
            starsContainer.dataset.selectedValue = 0;
            updateStars(starsContainer, 0); // Yıldızları başlangıçta gri yap
        });
    }

    // 📌 İlk açılışta yıldızları oluştur
    createStars();

    // 📌 Form gönderme işlemi (Firebase'e kayıt)
    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        const now = new Date();
        const formattedDate = now.toISOString().split("T")[0]; // YYYY-MM-DD formatı
        const formattedTime = now.toTimeString().split(" ")[0].substring(0, 5); // HH:MM formatı

        const evaluations = [];

        categories.forEach(category => {
            const categoryName = category.querySelector("label").textContent.trim();
            const starsContainer = category.querySelector(".stars");
            const score = parseInt(starsContainer.dataset.selectedValue, 10) || 0; // Seçili yıldız yoksa 0
            const note = category.querySelector("textarea").value.trim();

            evaluations.push({
                category: categoryName,
                score: score,
                note: note
            });
        });

        const entry = {
            date: formattedDate,
            time: formattedTime,
            evaluations: evaluations
        };

        try {
            await addDoc(collection(db, "evaluations"), entry);
            alert("Veri başarıyla kaydedildi! 🎉");

            // 📌 Formu temizle
            form.reset();

            // 📌 Yıldızları sıfırla (createStars() çağırmak yerine sadece renkleri sıfırla)
            categories.forEach(category => {
                const starsContainer = category.querySelector(".stars");
                updateStars(starsContainer, 0); // Yıldızları temizle
            });

        } catch (error) {
            console.error("Hata:", error);
            alert("Veri kaydedilirken hata oluştu.");
        }
    });
});