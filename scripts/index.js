//Закрытие попапа
const closeButtons = document.querySelectorAll('.popup__close-button');
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

closeButtons.forEach(function(closeButton) {
  const popup = closeButton.closest('.popup');
  closeButton.addEventListener('click', function() {
    closePopup(popup)})
  });

//Функция открытия попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

//Редактирование профиля
const profileEditButton = document.querySelector('.profile__edit-button');
const nameInput = document.querySelector('#username-field');
const jobInput = document.querySelector('#userinfo-field');
const profileName = document.querySelector('.profile__name');
const profileInfo = document.querySelector('.profile__info');
const popupEditProfile = document.querySelector('#popupEditProfile');
const formEditProfile = popupEditProfile.querySelector('.popup__form');

profileEditButton.addEventListener('click', function () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileInfo.textContent;
  openPopup(popupEditProfile);
})

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileInfo.textContent = jobInput.value;
    closePopup(popupEditProfile);
}
formEditProfile.addEventListener('submit', formSubmitHandler);

//Открытие картинки
const openImagePopup = document.querySelector('.popup_open-image');
const popupImage = document.querySelector('.popup__image');
const imageCaption = document.querySelector('.popup__image-caption');

function openImage(evt) {
  const image = evt.target;
  popupImage.setAttribute('src', image.src);
  popupImage.setAttribute('alt', image.alt);
  imageCaption.textContent = image.alt;

  openPopup(openImagePopup);
}

//Создание начальной галереи
const elementsBlock = document.querySelector('.elements');
const elementTemplate = document.querySelector('.element__template').content;

function addCard (name, link) {
  const template = elementTemplate.querySelector('.element').cloneNode(true);

  const image = template.querySelector('.element__image');
  image.setAttribute('alt', name);
  image.setAttribute('src', link);

  const title = template.querySelector('.element__title');
  title.textContent = name;

  //Лайк
  const likeButton = template.querySelector('.element__button');
  likeButton.addEventListener('click', function () {
    likeButton.classList.toggle('element__button_active')
  })

  //Удаление
  const deleteButton = template.querySelector('.element__button-delete');
  deleteButton.addEventListener('click', function() {
    const element = deleteButton.closest('.element');
    element.remove();
  });
  image.addEventListener('click', openImage);
  return template;
}

initialCards.forEach(function(item) {
  elementsBlock.append(addCard(item.name, item.link))
});

//Открытие попапа добавления фото
const addPhotoPopup = document.querySelector('#popupAddPhoto');
const addPhotoForm = addPhotoPopup.querySelector('#formAddPhoto');
const addPhotoButton = document.querySelector('.profile__add-button');
addPhotoButton.addEventListener('click', function () {
  openPopup(addPhotoPopup);
})

//Добавление фото через попап
const photoTitle = document.querySelector('#phototitle-field');
const photoLink = document.querySelector('#photolink-field');

function formAddPhotoHandler (evt) {
  evt.preventDefault();
  elementsBlock.prepend(addCard(photoTitle.value, photoLink.value));
  closePopup(addPhotoPopup);
  addPhotoForm.reset();
}
addPhotoForm.addEventListener('submit', formAddPhotoHandler);
