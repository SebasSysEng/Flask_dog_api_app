window.addEventListener("DOMContentLoaded", function () {
  const dogImage = document.getElementById("dog-image");
  const spinner = document.getElementById("loading-spinner");

  if (dogImage && spinner) {
    // Call the function on window resize and load
    document.addEventListener('DOMContentLoaded', adjustRandomDogImageSize);
    window.addEventListener('resize', adjustRandomDogImageSize);

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
    const likedDogsContainer = document.getElementById("liked-dogs-container");
    likedDogsContainer.innerHTML = "";
    const likedDogs = JSON.parse(localStorage.getItem("likedDogs")) || [];
    likedDogs.forEach(dog => {
      const card = document.createElement("div");
      card.className = "card";
      const cardImage = document.createElement("figure");
      cardImage.className = "card-image";
      const img = document.createElement("img");
img.className = "responsive-image";
      img.src = dog.url;
      img.alt = "Liked Dog";
      cardImage.appendChild(img);
      const cardHeader = document.createElement("a");
      cardHeader.className = "card-header";
      const breedInfo = document.createElement("a");
breedInfo.className = "breed-info";
      breedInfo.textContent = `${dog.raza || "Desconocida"}`;
      if (dog.subraza) breedInfo.textContent += ` (${dog.subraza || "Desconocida"})`;
      cardHeader.appendChild(breedInfo);
      card.appendChild(cardImage);
      card.appendChild(cardHeader);
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Eliminar";
      deleteButton.className = "delete-button";
      deleteButton.addEventListener("click", () => {
        const index = likedDogs.findIndex(d => d.url === dog.url);
        if (index !== -1) {
          likedDogs.splice(index, 1);
          localStorage.setItem("likedDogs", JSON.stringify(likedDogs));
          card.remove();
        }
      });
      card.appendChild(deleteButton);
      likedDogsContainer.appendChild(card);
    });
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
  const popup = document.getElementById("favorites-popup"); // Ensure popup is defined
  popup.classList.add("hidden");
});

document.addEventListener("DOMContentLoaded", () => {
  const likeButton = document.getElementById("like-dog-button");
  const dogImage = document.getElementById("dog-image");

  likeButton?.addEventListener("click", () => {
    const imageUrl = dogImage?.src;
    if (!imageUrl) return;

    let likedDogs = JSON.parse(localStorage.getItem("likedDogs")) || [];

    const dogIndex = likedDogs.findIndex(dog => dog.url === imageUrl);
    if (dogIndex === -1) {
      const breedText = document.querySelector(".card-header a").textContent;
      const breedMatch = breedText.match(/Raza: (.*?)(?: \((.*)\))?$/);
      const raza = breedMatch ? breedMatch[1] : "";
      const subraza = breedMatch && breedMatch[2] ? breedMatch[2] : null;
      likedDogs.push({ url: imageUrl, raza, subraza });
    } else {
      likedDogs.splice(dogIndex, 1);
    }
    localStorage.setItem("likedDogs", JSON.stringify(likedDogs));
    likeButton.classList.toggle("liked", dogIndex === -1);

    // Toggle SVG stroke color
    const svg = likeButton.querySelector("svg");
    svg.setAttribute("stroke", dogIndex === -1 ? "#EC4646" : "currentColor");
  });

  // Initialize button state based on localStorage
  const initialLikedDogs = JSON.parse(localStorage.getItem("likedDogs")) || [];
  if (initialLikedDogs.some(dog => dog.url === dogImage?.src)) {
    likeButton.classList.add("liked");
  } else {
    likeButton.classList.remove("liked");
  }
});
