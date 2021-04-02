import galleryItems from "./gallery-items.js";

const galleryContainerRef = document.querySelector('.js-gallery');
const modalWindowRef = document.querySelector('.js-lightbox');
const lightboxImageRef = modalWindowRef.querySelector('.lightbox__image');
const galleryMarkup = createGalleryCardsMarkup(galleryItems);

galleryContainerRef.insertAdjacentHTML('beforeend', galleryMarkup);

galleryContainerRef.addEventListener('click', onGalleryContainerClick);

function createGalleryCardsMarkup(galleryItems) {
    return galleryItems.map(({ preview, original, description }) => {
        return `
                <li class="gallery__item">
        <a
            class="gallery__link"
            href="${original}"
        >
            <img
            loading="lazy"
            class="gallery__image lazyload"
            data-src="${preview}"
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
  event.preventDefault();

    if (!event.target.classList.contains('gallery__image')) {
        return;
    }
  const galleryImage = event.target;
 
  return galleryImage.dataset.source;
}

const galleryElementsRef = document.querySelectorAll('.gallery__item');
galleryElementsRef.forEach(element => {
  element.addEventListener('click', onGalleryElementClick);
})

function onGalleryElementClick() {
  window.addEventListener('keydown', onEscKeyPress);
  modalWindowRef.classList.add('is-open');
  lightboxImageRef.src = onGalleryContainerClick(event);
}

const modalCloseBtnRef = document.querySelector('[data-action="close-lightbox"]');
const lightboxOverlayRef = document.querySelector('.lightbox__overlay');

modalCloseBtnRef.addEventListener('click', onCloseModal);
lightboxOverlayRef.addEventListener('click', onLightboxOverlayClick);

function onCloseModal() {
  window.removeEventListener('keydown', onEscKeyPress);
  modalWindowRef.classList.remove('is-open');
  lightboxImageRef.src = '';
}

function onLightboxOverlayClick(evt) {
  if (evt.currentTarget === evt.target) {
    onCloseModal()
  }
}

function onEscKeyPress(evt) {
  if (evt.code === "Escape") {
    onCloseModal()
  }
}

/* Additional task - lazy loading */

if ('loading' in HTMLImageElement.prototype) {
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');

  lazyImages.forEach(img => {
    img.src = img.dataset.src;
  });
} else {
  const script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
  script.integrity = 'sha512-q583ppKrCRc7N5O0n2nzUiJ+suUv7Et1JGels4bXOaMFQcamPk9HjdUknZuuFjBNs7tsMuadge5k9RzdmO+1GQ==';
  script.crossOrigin = 'anonymous';

  document.body.appendChild(script);
}
