import "./style.css";
import {API} from './API';
import {Card} from './Card';
import {CardList} from './CardList';
import {FormValidator} from './FormValidator';
import {Popup} from './Popup';
import {UserInfo} from './UserInfo';

const baseUrl = process.env.NODE_ENV === 'development' ? 'https://nomoreparties.co/cohort12' : 'http://nomoreparties.co/cohort12';

(function () {

    const api = new API({
        baseUrl,
        headers: {
            authorization: 'cacecd25-6927-4bc6-841e-a9732a22d8d7',
            'Content-Type': 'application/json'
        }
    });

    const placesList = document.querySelector('.places-list');

    const popupImage = document.querySelector('.popup-image');

    const popupImageClass = new Popup(popupImage);

    const dialog = document.querySelector('.popup_form_edit');

    const popupDialog = new Popup(dialog);

    const form = dialog.querySelector("form");
    const openFormButton = document.querySelector('.user-info__button');
    const closeFormButton = document.querySelector('.popup__close_form');

    const userInfoData = document.querySelector('.user-info__data');
    const userInfoName = document.querySelector('.user-info__name');
    const userInfoJob = document.querySelector('.user-info__job');

    const userInfo = new UserInfo(userInfoName, userInfoJob, "", "")

    const dialogUser = document.querySelector('.popup_user_edit');

    const popupUser = new Popup(dialogUser);

    const formUser = dialogUser.querySelector("form");
    const editProfileButton = document.querySelector('.user-info__edit');
    const closeUserButton = document.querySelector('.popup__close_user');

    const popupUserEdit = document.querySelector('.popup_user_edit');

    const popupFormEdit = document.querySelector('.popup_form_edit');

    const userForm = popupUserEdit.querySelector('.popup__form');

    const userValidator = new FormValidator(userForm);
    userValidator.setEventListeners();

    const placeForm = popupFormEdit.querySelector('.popup__form');

    const placeValidator = new FormValidator(placeForm);

    placeValidator.setEventListeners();

    function openImageCallback(url) {
        popupImage.classList.toggle('popup_is-opened');
        document.querySelector('.big_image').src = url;
    };

    const cardList = new CardList(placesList, []);

    api.getCards().then((res) => {
        const newInitialCards = res.map((element) => new Card(element, openImageCallback));
        newInitialCards.forEach(element => cardList.addCard(element));
        cardList.render();
    })


    cardList.render();

    openFormButton.onclick = () => {
        popupDialog.openClose();
        placeValidator.setDefaultValue();
        placeValidator.setSubmitButtonState();
    };

    closeFormButton.onclick = () => popupDialog.openClose;

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const name = form.querySelector("input[name='name']").value;
        const link = form.querySelector("input[name='link']").value
        cardList.addCard(new Card({ name, link }, openImageCallback));
        popupDialog.openClose();
    });

    editProfileButton.onclick = () => {
        const inputName = formUser.querySelector("input[name='name']");
        const inputJob = formUser.querySelector("input[name='job']");
        popupUser.openClose();
        inputName.value = userInfoName.textContent;
        inputJob.value = userInfoJob.textContent;
        userValidator.checkInputValidity();
        userValidator.setSubmitButtonState();
    };

    closeUserButton.onclick = () => popupUser.openClose;

    formUser.addEventListener('submit', function (event) {
        event.preventDefault();
        const name = formUser.querySelector("input[name='name']").value;
        const about = formUser.querySelector("input[name='job']").value;
        api.patchUser(name, about).then((res) => {
            userInfo.setUserInfo(name, about);
            userInfo.updateUserInfo();
        })
 
        popupUser.openClose();
    });

    api.getUser().then((res) => {
        userInfo.setUserInfo(res.name, res.about);
        userInfo.updateUserInfo();
    })
  
})();