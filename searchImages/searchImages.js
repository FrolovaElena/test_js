"use strict";

const URL =
  "https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=";
const KEY = "12491613-658b31097eea137c2f850aec7";

const fetchImages = (query, page) => {
  return fetch(`${URL}${query}&page=${page}&per_page=21&key=${KEY}`).then(
    response => {
      if (response.ok) {
        return response.json();
      }
      throw newError(`Error while fetching data: ${response.statusText}`);
    }
  );
};

const searchForm = document.querySelector(".search-form");
const input = document.querySelector(".input");
const gallery = document.querySelector(".gallery");
const overlay = document.querySelector(".overlay");
const item = document.querySelector(".gallery-item a");
let currentValue = "";
let imgPage = 1;

const renderGallery = (list, data) => {
  const items = data
    .map(
      i => `<li class="gallery-item">
    <a href='#'>
      <img src=${i.webformatURL} data-sourse=${i.largeImageURL} alt="image" />
    </a>
  </li>`
    )
    .join("");
  return list.insertAdjacentHTML("beforeend", items);
};

const handleSubmit = e => {
  e.preventDefault();
  let value = e.currentTarget.firstElementChild.value;
  if (value !== "") {
    const galleryItems = Array.from(gallery.children);
    galleryItems.forEach(i => i.remove());
  }
  fetchImages(value, imgPage).then(data => renderGallery(gallery, data.hits));
  currentValue = value;
  event.currentTarget.reset();
};

const loadImages = () => {
  const contentHeigth = document.querySelector("#root").offsetHeight;
  const windowHeigth = window.innerHeight;
  const scrollPosition = window.pageYOffset;

  if (windowHeigth + scrollPosition >= contentHeigth) {
    fetchImages(currentValue, imgPage + 1).then(data =>
      renderGallery(gallery, data.hits)
    );
  }
};

const openModal = url => {
  const img = document.querySelector(".modal img");
  img.src = url;

  document.body.classList.add("modal-visible");
  window.addEventListener("keydown", handleKeyPress);
};

const closeModal = () => {
  const img = document.querySelector(".modal img");
  img.src = "";
  document.body.classList.remove("modal-visible");
  window.removeEventListener("keydown", handleKeyPress);
};

const handleKeyPress = e => {
  if (e.code !== "Escape") {
    return;
  }
  closeModal();
};

const handleOverlayClick = e => {
  if (e.target !== e.currentTarget) {
    return;
  }
  closeModal();
};

const handleImgClick = e => {
  if (e.target.tagName !== "IMG") {
    return;
  }
  const largeImgUrl = e.target.dataset.sourse;
  openModal(largeImgUrl);
};

searchForm.addEventListener("submit", handleSubmit);
overlay.addEventListener("click", handleOverlayClick);
gallery.addEventListener("click", handleImgClick);
window.addEventListener("scroll", loadImages);
