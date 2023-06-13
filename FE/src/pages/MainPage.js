import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import '../styles/MainPage.css';

const MainPage = () => {

    // getCookie 함수를 정의하여 쿠키를 읽어옴

    const getCookie = (name) => {
        const value = "; " + document.cookie;
        const parts = value.split("; " + name + "=");
        if (parts.length === 2) return parts.pop().split(";").shift();
    }

    // 쿠키 이름을 입력으로 받아 해당 쿠키의 값을 반환
    // 그런 다음 userId 쿠키를 읽어 로컬 스토리지에 저장
    const userId = getCookie('userId');
    if (userId && !localStorage.getItem('userId')) {
        localStorage.setItem('userId', userId);
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
                    <h1 className="h1">선용품 최적 구매발주 서비스</h1>
                    {isLoggedIn ? (
                        <div></div>
                    ) : (
                        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                            <button className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                onClick={goLogin}>로그인</button>

                            <button className="mt-3 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                onClick={goRegister}>회원가입</button>

                            <button className='googleBtn'
                                onClick={() => { window.location.href = 'http://localhost:8080/oauth2/authorization/google'; }}>
                                <img src="/btn_google_signin_light_normal_web.png" alt="Google 로그인" onClick={() => { window.location.href = 'http://localhost:8080/oauth2/authorization/google'; }} />
                            </button>

                        </div>
                    )}
                </article>
            </figure>
        </>
    );
}
export default MainPage;
