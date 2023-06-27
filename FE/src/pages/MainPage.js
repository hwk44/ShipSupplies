import { useNavigate } from 'react-router-dom';
import '../styles/MainPage.css';
import googleLogo from '../images/googleLogo.svg';

const MainPage = () => {

    const getCookie = (name) => {
        const value = "; " + document.cookie;
        const parts = value.split("; " + name + "=");
        if (parts.length === 2) return parts.pop().split(";").shift();
    }

    const userId = getCookie('userId');
    if (userId && !localStorage.getItem('userId')) {
        localStorage.setItem('userId', userId);
        window.location.reload(); 
    }

    const isLoggedIn = !!localStorage.getItem('userId');

    const navigate = useNavigate();

    const goLogin = () => {
        navigate("/login");
    }

    const goRegister = () => {
        navigate("/register");
    }

    return (
        <>
            <figure className="figure">
                <article className="txt">
                    {isLoggedIn ? (
                        <div></div>
                    ) : (
                        <div className="div">
                            <div className="flex flex-col sm:mx-auto w-60 sm:max-w-sm space-y-7">
                                <button className="flex w-full h-12 items-center justify-center rounded-md bg-white px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm"
                                    onClick={goLogin}>로그인</button>

                                <button className="flex w-full h-12 items-center justify-center rounded-md bg-white px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm "
                                    onClick={goRegister}>회원가입</button>

                                <button className="flex w-full h-12 items-center justify-center rounded-md bg-white px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm"
                                    onClick={() => { window.location.href = 'http://localhost:8080/oauth2/authorization/google'; }}>
                                    <img src={googleLogo} alt="google" style={{ width: '20px', height: '20px', marginRight: '10px' }} />
                                    구글 로그인
                                </button>
                            </div>
                        </div>
                    )}
                </article>
            </figure>
        </>
    );
}
export default MainPage;
