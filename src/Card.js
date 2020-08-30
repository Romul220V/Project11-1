export class Card {
    constructor(cardData, openImageCallback) {
        this.name = cardData.name;
        this.link = cardData.link;
        this.openImageCallback = openImageCallback;
        this.imageClick = this.imageClick.bind(this);
        this.remove = this.remove.bind(this);
         };
    like(event) {
        if (event.target.classList.contains('place-card__like-icon')) {
            event.target.classList.toggle('place-card__like-icon_liked');
        };
    }

    remove() {
        this.placeImage.removeEventListener('click', this.imageClick);
        this.placeButtonLike.removeEventListener('click', this.like);
        this.placeButtonDel.removeEventListener('click', this.remove);
        this.placeCard.remove();
    };

    createCard() {
        const placeCard = document.createElement('div');
        const placeImage = document.createElement('div');
        const placeButtonDel = document.createElement('button');
        const placeDescrip = document.createElement('div');
        const placeHead = document.createElement('h3');
        const placeButtonLike = document.createElement('button');

        placeCard.classList.add('place-card');

        placeImage.setAttribute('style', 'background-image: url(' + this.link + ')');
        placeImage.classList.add('place-card__image');
        placeButtonDel.classList.add('place-card__delete-icon');
        placeDescrip.classList.add('place-card__description');
        placeHead.classList.add('place-card__name');
        placeHead.textContent = this.name;
        placeButtonLike.classList.add('place-card__like-icon');

        placeCard.appendChild(placeImage);
        placeImage.appendChild(placeButtonDel);
        placeCard.appendChild(placeDescrip);
        placeDescrip.appendChild(placeHead);
        placeDescrip.appendChild(placeButtonLike);
        placeButtonDel.addEventListener('click', this.remove);
        this.placeButtonDel = placeButtonDel;
        this.placeCard = placeCard;
        placeButtonLike.addEventListener('click', this.like);
        this.placeButtonLike = placeButtonLike;
        placeImage.addEventListener('click', this.imageClick);
        this.placeImage = placeImage;
        return placeCard;
    };

    imageClick(event) {
     this.openImageCallback(this.link);
    }
}