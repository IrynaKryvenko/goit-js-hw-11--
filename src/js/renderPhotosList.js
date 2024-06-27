'user strict';

const containerForImages = document.querySelector('.container-imgs');

function imgCreate({
  largeImageURL,
  webformatURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) {
  const container = `<div class="gallery">
    <div class="container-img-wrap">
      <a href="${largeImageURL}" class="img-link">
          <img src="${webformatURL}" alt="${tags}" title="${tags}" />
        </a>
    </div>
    <table border="0" class="image-descrip">
      <tr class="td-descrip">
        <td>Likes</td>
        <td>Views</td>
        <td>Comments</td>
        <td>Downloads</td>
      </tr>
      <tr class="td-result">
        <td>${likes}</td>
        <td>${views}</td>
        <td>${comments}</td>
        <td>${downloads}</td>
      </tr>
    </table>
  </div>`;

  return container;
}

function imgsCreate(images) {
  return images.map(imgCreate).join('');
}

export function renderImages(images) {
  const markup = imgsCreate(images);
  containerForImages.insertAdjacentHTML('beforeend', markup);
}