window.addEventListener("DOMContentLoaded", function () {
  const dogImage = document.getElementById("dog-image");
  const spinner = document.getElementById("loading-spinner");

  if (dogImage && spinner) {
    // Ocultar la imagen hasta que esté cargada
    dogImage.classList.add("fade-in");

    dogImage.onload = function () {
      spinner.style.display = "none";
      dogImage.classList.remove("fade-in");
      dogImage.classList.add("fade");
    };
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const likeButton = document.getElementById("like-button");
  const popup = document.getElementById("favorites-popup");

  likeButton.addEventListener("click", () => {
    popup.classList.remove("hidden");
  });

  // Opcional: cerrar el popup al hacer clic fuera del contenido
  popup.addEventListener("click", (e) => {
    if (e.target === popup) {
      popup.classList.add("hidden");
    }
  });
});

const closePopup = document.querySelector(".close-popup");
closePopup.addEventListener("click", () => {
  popup.classList.add("hidden");
});

