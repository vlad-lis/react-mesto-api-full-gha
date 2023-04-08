import logo from '../images/logo.svg';
import { Routes, Route, Link } from 'react-router-dom';

function Header({ email, onClick }) {
    return (
        <header className="header">
            <img className="header__logo" src={logo} alt="logo" />

            <Routes>
                <Route
                    path='/'
                    element={
                        <div className='header__nav-container'>
                            <p className='header__email'>{email}</p>
                            <Link to='/sign-in' className='header__nav-exit' onClick={onClick}>Выйти</Link>
                        </div>
                    } />
                <Route
                    path='/sign-up'
                    element={
                        <Link to='/sign-in' className='header__nav-link'>Войти</Link>

                    } />
                <Route
                    path='/sign-in'
                    element={
                        <Link to='/sign-up' className='header__nav-link'>Регистрация</Link>
                    } />
            </Routes>

        </header>
    )
}

export default Header;