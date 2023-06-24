import success from '../images/success.svg';
import fail from '../images/fail.svg'

function InfoTooltip(props) {
    return (
        <div className={`pop-up ${props.isOpen && 'pop-up_opened'}`}>
            <div className='pop-up__content'>
                <button
                    className="pop-up__close-button"
                    aria-label="close"
                    type="button"
                    onClick={props.onClose}>
                </button>
                <img
                    className='pop-up__auth-img'
                    src={props.signupSuccess ? success : fail} 
                    alt='auth-img'/>
                <h3 className="pop-up__heading pop-up__auth-heading">
                    {props.tooltip}
                </h3>
            </div>
        </div>
    )
}

export default InfoTooltip;