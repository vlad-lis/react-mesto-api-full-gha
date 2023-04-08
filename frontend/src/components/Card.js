import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
    const currentUser = useContext(CurrentUserContext);
    const isOwn = props.card.owner === currentUser._id;
    const isLiked = props.card.likes.some(i => i === currentUser._id);
    const cardLikeButtonClassName = (
        `element__like-button ${isLiked && 'element__like-button_active'}`
    );

    function handleClick() {
        props.onCardClick(props.card);
    };

    function handleLikeClick() {
        props.onCardLike(props.card);
    }

    function handleDeleteClick() {
        props.onCardDelete(props.card);
    }

    return (
        <div className="element">
            {isOwn && <button
                className="element__delete-button"
                aria-label="delete"
                type="button"
                onClick={handleDeleteClick}></button>}
            <img
                className="element__image"
                src={props.card.link}
                onClick={handleClick}
                alt={props.card.name}></img>
            <h3 className="element__heading">{props.card.name}</h3>
            <div className="element__like-container">
                <button
                    className={cardLikeButtonClassName}
                    aria-label="like"
                    type="button"
                    onClick={handleLikeClick}></button>
                <p className="element__like-counter">{props.card.likes.length}</p>
            </div>
        </div>
    );
};

export default Card;