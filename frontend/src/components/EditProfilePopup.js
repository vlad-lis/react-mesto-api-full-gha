import PopupWithForm from "./PopupWithForm";
import { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const currentUser = useContext(CurrentUserContext);

    function handleNameChange(evt) {
        setName(evt.target.value);
    }

    function handleDescriptionChange(evt) {
        setDescription(evt.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        props.onUpdateUser({
            name: name,
            about: description,
        });
    }

    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, props.isOpen]);

    return (
        <PopupWithForm
            name='profile'
            title='Edit Profile'
            button='Save'
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}>
            <label className="pop-up__label">
                <input
                    className="pop-up__input pop-up__input_type_name"
                    id="profile-name-input"
                    type="text"
                    name="username"
                    placeholder="Name"
                    minLength="2"
                    maxLength="40"
                    required
                    onChange={handleNameChange}
                    value={name || ''}></input>
                <span className="pop-up__input-error profile-name-input-error"></span>
            </label>
            <label className="pop-up__label">
                <input
                    className="pop-up__input pop-up__input_type_job"
                    id="profile-job-input"
                    type="text"
                    name="userjob"
                    placeholder="About you"
                    minLength="2"
                    maxLength="200"
                    required
                    onChange={handleDescriptionChange}
                    value={description || ''}></input>
                <span className="pop-up__input-error profile-job-input-error"></span>
            </label>
        </PopupWithForm>
    )
};

export default EditProfilePopup;