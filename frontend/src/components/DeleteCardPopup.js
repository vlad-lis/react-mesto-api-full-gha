import PopupWithForm from "./PopupWithForm";

function DeleteCardPopup() {
    return (
        <PopupWithForm name='delete' title='Are you sure?'>
            <button className="pop-up__save-button" id="delete-popup-save-button" type="submit">Yes</button>
        </PopupWithForm>
    )
};

export default DeleteCardPopup;