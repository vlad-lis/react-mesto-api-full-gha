import PopupWithForm from "./PopupWithForm";
import { useEffect, useRef } from "react";

function EditAvatarPopup(props) {
    const ref = useRef();

    function handleSubmit(evt) {
        evt.preventDefault();
        props.onUpdateAvatar({
            avatar: ref.current.value,
        });
    }

    useEffect(() => {
        ref.current.value = '';
    }, [props.isOpen])

    return (
        <PopupWithForm
            name='edit-avatar'
            title='Обновить аватар'
            button='Сохранить'
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}>
            <label className="pop-up__label">
                <input
                    className="pop-up__input pop-up__input_type_image-link"
                    id="avatar-url-input"
                    type="url"
                    name="avatar"
                    placeholder="Ссылка на аватар"
                    required
                    ref={ref}></input>
                <span className="pop-up__input-error avatar-url-input-error"></span>
            </label>
        </PopupWithForm>
    )
};

export default EditAvatarPopup;