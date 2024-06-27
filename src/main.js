'use strict';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { imgPix } from './js/apiService.js';

import icon from './img/x-icon.svg';

import { renderImages } from './js/renderPhotosList.js';

const refs = {
  searchForm: document.querySelector('.form'),
  loadDiv: document.querySelector('.loader'),
  loadMorePictures: document.querySelector('.load-morepics'),
  userKeyWordInput: document.querySelector('.data-userInput'),
  containerForImages: document.querySelector('.container-imgs'),
};

const lightbox = new SimpleLightbox('.container-img-wrap a', {
  close: true,
  captionsData: 'alt',
  captionDelay: 50,
  captionsPosition: 'bottom',
  animationSpeed: 1,
  captionSelector: 'img',
  loop: true,
});

let page;
let maxPages;
let userKeyWord;

refs.searchForm.addEventListener('submit', onSubmit);

refs.loadMorePictures.addEventListener('click', loadMore);

async function onSubmit(e) {
  e.preventDefault();
  userKeyWord = refs.userKeyWordInput.value.trim();
  page = 1;
  showLoader();
  if (!userKeyWord) {
    maxPages = 0;
    checkLoadBtnVisibility();
    hideLoader();
    refs.containerForImages.innerHTML = '';
    showError('Empty field!', 'green', 'black', false);
    return;
  }
  try {
    const data = await imgPix(userKeyWord, page);
    if (data.totalHits === 0) {
      showError(
        'Sorry, there are no images matching your search query. Please try again!',
        'red',
        'white',
        icon
      );
    }
    const img = data.hits;
    maxPages = Math.ceil(data.totalHits / 20);
    refs.containerForImages.innerHTML = '';
    renderImages(img);
    lightbox.refresh();
  } catch (error) {
    showError('Error occured! Please, try again! ', 'red', 'white', icon);
    maxPages = 0;
    refs.containerForImages.innerHTML = '';
  } finally {
    checkLoadBtnVisibility();
  }

  hideLoader();
  e.target.reset();
}

async function loadMore() {
  page += 1;
  showLoader();
  const data = await imgPix(userKeyWord, page);
  renderImages(data.hits);
  lightbox.refresh();
  hideLoader();
  checkLoadBtnVisibility();
  if (page === maxPages) {
    showError(
      'We are sorry, but you have reached the end of search results.',
      'lightblue',
      'white',
      false
    );
  }

  const height =
    refs.containerForImages.firstElementChild.getBoundingClientRect().height;

  scrollBy({
    behavior: 'smooth',
    top: height * 3,
  });
}

function showLoadBtn() {
  refs.loadMorePictures.classList.remove('hidden');
}

function removeLoadBtn() {
  refs.loadMorePictures.classList.add('hidden');
}

function checkLoadBtnVisibility() {
  if (page >= maxPages) {
    removeLoadBtn();
  } else {
    showLoadBtn();
  }
}

function showLoader() {
  refs.loadDiv.classList.remove('hidden');
}

function hideLoader() {
  refs.loadDiv.classList.add('hidden');
}

function showError(text, bgColor, txtColor, iconX) {
  iziToast.error({
    position: 'topRight',
    iconUrl: iconX,
    message: text,
    messageColor: txtColor,
    messageSize: '16',
    messageLineHeight: '15',
    backgroundColor: bgColor,
    timeout: 5000,
    displayMode: 2,
    close: true,
    closeOnEscape: true,
    closeOnClick: true,
  });
}