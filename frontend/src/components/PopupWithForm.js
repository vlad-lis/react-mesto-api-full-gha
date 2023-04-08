function PopupWithForm(props) {
    return (
        <div
            className={`pop-up ${props.isOpen && 'pop-up_opened'}`}
            id={`${props.name}-pop-up`}>
            <div className="pop-up__content">
                <button
                    className="pop-up__close-button"
                    id={`${props.name}-popup-close-button`}
                    aria-label="close"
                    type="button"
                    onClick={props.onClose}></button>
                <h3 className="pop-up__heading">{props.title}</h3>
                <form
                    className="pop-up__form"
                    id={`${props.name}-form`}
                    name="input-form"
                    onSubmit={props.onSubmit}>
                    {props.children}
                    <button className="pop-up__save-button" id={`${props.name}-save-button`} type="submit">{props.button}</button>
                </form>
            </div>
        </div>
    )
};

export default PopupWithForm;