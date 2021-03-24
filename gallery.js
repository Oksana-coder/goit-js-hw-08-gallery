/* 
Создай галерею с возможностью клика по ее элементам и просмотра полноразмерного изображения 
в модальном окне. Превью результата посмотри по ссылке.

Разбей задание на несколько подзадач:

+ Создание и рендер разметки по массиву данных и предоставленному шаблону.
+ Реализация делегирования на галерее ul.js-gallery и получение url большого изображения.
Открытие модального окна по клику на элементе галереи.
Подмена значения атрибута src элемента img.lightbox__image.
Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"].
Очистка значения атрибута src элемента img.lightbox__image. Это необходимо для того, 
чтобы при следующем открытии модального окна, пока грузится изображение, мы не видели предыдущее.

В файле gallery-items.js есть массив объектов содержащих информацию о изображениях: 
маленькое изображение, оригинальное и описание.

Разметка элемента галереи
Ссылка на оригинальное изображение должна храниться в data-атрибуте source на элементе img, 
и указываться в href ссылки (это необходимо для доступности).

<li class="gallery__item">
  <a
    class="gallery__link"
    href="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546_1280.jpg"
  >
    <img
      class="gallery__image"
      src="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546__340.jpg"
      data-source="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546_1280.jpg"
      alt="Tulips"
    />
  </a>
</li>

Модальное окно для полноразмерного изображения
      Для того чтобы открыть, необходимо добавить на div.lightbox CSS-класс is-open
*/

import galleryItems from "./gallery-items.js";

const galleryContainer = document.querySelector('.js-gallery');
const modalWindow = document.querySelector('.lightbox');

const galleryMarkup = createGalleryCardsMarkup(galleryItems);

galleryContainer.insertAdjacentHTML('beforeend', galleryMarkup);

galleryContainer.addEventListener('click', onGalleryContainerClick);

function createGalleryCardsMarkup(galleryItems) {
    return galleryItems.map(({ preview, original, description }) => {
        return `
                <li class="gallery__item">
        <a
            class="gallery__link"
            href="${original}"
        >
            <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
            />
        </a>
        </li>
        `;
    })
    .join('');
}

function onGalleryContainerClick(event) {
    if (!event.target.classList.contains('gallery__item')) {
        return;
    }
    
    modalWindow.classList.add('is-open');
    console.log(event.target.dataset.source);

}
