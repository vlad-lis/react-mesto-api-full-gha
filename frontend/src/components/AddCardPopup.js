import { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";

function AddCardPopup(props) {
    const [name, setName] = useState('');
    const [link, setLink] = useState('');

    function handleNameChange(evt) {
        setName(evt.target.value)
    }

    function handleLinkChange(evt) {
        setLink(evt.target.value)
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        props.onAddCard({
            name: name,
            link: link,
        });
    }

    useEffect(() => {
        setName('');
        setLink('');
    }, [props.isOpen])

    return (
        <PopupWithForm
            name='add-card'
            title='New card'
            button='Add'
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}>
            <label className="pop-up__label">
                <input
                    className="pop-up__input pop-up__input_type_name"
                    id="card-name-input"
                    type="text"
                    name="name"
                    placeholder="Name"
                    minLength="2"
                    maxLength="30"
                    required
                    value={name}
                    onChange={handleNameChange}></input>
                <span className="pop-up__input-error card-name-input-error"></span>
            </label>
            <label className="pop-up__label">
                <input
                    className="pop-up__input pop-up__input_type_image-link"
                    id="card-url-input"
                    type="url"
                    name="link"
                    placeholder="Image Link"
                    required
                    value={link}
                    onChange={handleLinkChange}></input>
                <span className="pop-up__input-error card-url-input-error"></span>
            </label>
        </PopupWithForm>
    )
};

export default AddCardPopup;