import { useState } from "react";

function Login({ onSignin }) {
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
        onSignin({ password, email });
    }

    return (
        <form className='auth__form' onSubmit={handleSubmit}>
            <h3 className='auth__title'>Вход</h3>
            <input
                className='auth__input'
                type='email'
                name='email'
                placeholder='email@email.com'
                value={email || ''}
                onChange={handleEmailChange}
            />
            <input
                className='auth__input'
                type='password'
                name='password'
                placeholder='password'
                value={password || ''}
                onChange={handlePasswordChange}
            />
            <button className='auth__button' type='submit'>
                Войти
            </button>
        </form>
    )
}

export default Login