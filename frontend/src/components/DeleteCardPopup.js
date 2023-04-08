import PopupWithForm from "./PopupWithForm";

function DeleteCardPopup() {
    return (
        <PopupWithForm name='delete' title='Вы уверены?'>
            <button className="pop-up__save-button" id="delete-popup-save-button" type="submit">Да</button>
        </PopupWithForm>
    )
};

export default DeleteCardPopup;