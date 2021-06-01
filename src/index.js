import './sass/main.scss';
import PictureApiService from './apiService.js';
import pictureHbs from './templates/picture.hbs';
import { error, info } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import LoadMoreBtn from './load-more-btn';

function infoNotification() {
  info({
    text: 'Вау, смотри что удалось найти!',
    delay: 1500,
  });
}
function myError() {
  error({
    text: 'Привет! Веди что-то нормальное :)',
    delay: 1500,
  });
}

const refs = {
  form: document.querySelector('.search-form'),  
  picturesLIst: document.querySelector('.gallery'),
};
// const element = document.getElementById('.my-element-selector');
// element.scrollIntoView({
//   behavior: 'smooth',
//   block: 'end',
// });
const NewApiService = new PictureApiService();
refs.form.addEventListener('submit', onSearch);
const loadMoreBtn = new LoadMoreBtn({ selector: '[data-action="load-more"]', hidden: true });

function onSearch(e) {
  e.preventDefault();
  clearPisturesList();
  NewApiService.searchQuery = e.currentTarget.elements.query.value.trim();
  loadMoreBtn.show();
  loadMoreBtn.disable();
  NewApiService.resetPage();
  NewApiService.fetchPictures().then(picturesShow).then(loadMoreBtn.enable());
}


loadMoreBtn.refs.button.addEventListener('click', onLoadMore);
function onLoadMore() {
     loadMoreBtn.disable();
  NewApiService.fetchPictures().then(picturesShow).then(loadMoreBtn.enable());
}

const picturesShow = hits => {
  if (hits.length === 0) {
    myError();
  }
  if (hits.length >= 1) {
    refs.picturesLIst.insertAdjacentHTML('beforeend', pictureHbs(hits));
    infoNotification();
  }
};
function clearPisturesList() {
  refs.picturesLIst.innerHTML = '';
}
