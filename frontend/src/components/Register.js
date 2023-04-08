import { useState } from "react";
import { Link } from "react-router-dom";

function Register({ onSignup }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleEmailChange(evt) {
        setEmail(evt.target.value);
    };

    function handlePasswordChange(evt) {
        setPassword(evt.target.value);
    };

    function handleSubmit(evt) {
        evt.preventDefault();
        onSignup({ password, email });
    }

    return (
        <form className='auth__form' onSubmit={handleSubmit}>
            <h3 className='auth__title'>Регистрация</h3>
            <input
                id='email'
                className='auth__input'
                type='email'
                name='email'
                placeholder='email@mail.com'
                value={email || ''}
                onChange={handleEmailChange}
            />
            <input
                id='password'
                className='auth__input'
                type='password'
                name='password'
                placeholder='password'
                value={password || ''}
                onChange={handlePasswordChange}
            />
            <button className='auth__button' type='submit'>
                Зарегистрироваться
            </button>
            <Link to='/sign-in' className='auth__link'>
                Уже зарегистрировались? Войти
            </Link>

        </form>
    )
}

export default Register;