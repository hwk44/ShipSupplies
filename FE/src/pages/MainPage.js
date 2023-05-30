import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import '../styles/MainPage.css';
import INTRO_IMAGE from '../images/container-ship.jpg';

const MainPage = () => {
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
                <img src={INTRO_IMAGE} alt="intro_img" />
                <article className="txt">
                    <h1 className="h1">선용품 최적 구매발주 서비스</h1>
                    <div className="div">
                        <button className="btn" onClick={goLogin}>로그인</button>
                        <button className="btn" onClick={goRegister}>회원가입</button>
                    </div>
                </article>
            </figure>
        </>
    );
}
export default MainPage;
