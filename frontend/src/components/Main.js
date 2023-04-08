import { useContext } from 'react';
import addButton from '../images/add-button.svg';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {
    const currentUser = useContext(CurrentUserContext)

    return (
        <main className="content">
            <section className="profile">
                <div className="profile-container">
                    <div
                        className="profile__avatar"
                        onClick={props.onEditAvatar}
                        style={{ backgroundImage: `url(${currentUser.avatar})` }}>
                    </div>
                    <div className="profile-info">
                        <h1 className="profile-info__name">{currentUser.name}</h1>
                        <button
                            className="profile-info__edit-button"
                            aria-label="edit"
                            type="button"
                            onClick={props.onEditProfile}>
                        </button>
                        <p className="profile-info__description">{currentUser.about}</p>
                    </div>
                </div>
                <button
                    className="profile__add-button"
                    aria-label="add"
                    type="button"
                    onClick={props.onAddPlace}>
                    <img className="profile__add-button-image" src={addButton} alt="Добавить"></img>
                </button>
            </section>

            <section className="elements">
                <ul className="elements__list">
                    {props.cards.map((newCard) => {
                        return (
                            <Card
                                card={newCard}
                                key={newCard._id}
                                onCardClick={props.onCardClick}
                                onCardLike={props.onCardLike}
                                onCardDelete={props.onCardDelete} />
                        )
                    })}
                </ul>
            </section>
        </main>
    )
}

export default Main;