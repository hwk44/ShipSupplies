import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import '../styles/MainPage.css';

const MainPage = () => {
    const isLoggedIn = !!localStorage.getItem('jwt');

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
                        </div>
                    )}
                </article>
            </figure>
        </>
    );
}
export default MainPage;
