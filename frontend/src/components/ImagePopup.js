function ImagePopup({card, onClose}) {
    return (
        <div className={`pop-up preview ${card && 'pop-up_opened'}`} id="preview-pop-up">
            <div className="pop-up__preview">
                <button className="pop-up__close-button" id="preview-popup-close-button" aria-label="close"
                    type="button" onClick={onClose}></button>
                <img
                    className="pop-up__image-preview"
                    src={card?.link}
                    alt={card?.name}></img>
                <h3 className="pop-up__image-heading">
                    {card?.name}
                </h3>
            </div>
        </div>
    )
};

export default ImagePopup;