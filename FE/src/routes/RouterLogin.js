import {BrowserRouter, Route, Routes, useNavigate, Link} from 'react-router-dom';
import '../styles/RouterNav.css';
import axios from 'axios';

const RouterLogin = () => {
    const navigate = useNavigate();

    const goLogin = () => {
        navigate('/login')
    };

    const goRegister = () => {
        navigate('/register')
    };

    const goMypage = () => {
        navigate('/mypage')
    }

    const isLoggedIn = !!localStorage.getItem('userId');

    const handleLogout = async () => {
        try{
            // 서버에 로그아웃 요청을 보냅니다.
            // await axios.post('/api/user/logout');
            // setIsLogged(false);
            localStorage.removeItem('jwt');
            // localStorage.setItem("jwt", null);
            alert('로그아웃 되었습니다.');
            window.location.href = "/";
        } catch (error) {
            console.log(error);
            alert('로그아웃 처리 중 오류가 발생했습니다.');
        }
    };

    if (window.location.pathname === '/login') return null;
    if (window.location.pathname === '/register') return null;
    return(
        <>
            {isLoggedIn ? (
                <div className="rnavdiv1">
                    <button className='rnavbutton1' onClick={goMypage}>마이페이지</button>
                    <button className='rnavbutton1' onClick={handleLogout}>로그아웃</button>
                </div>
            ) : (
                <div className="rnavdiv1">
                    <button className='rnavbutton1' onClick={goLogin}>로그인</button>
                    <button className='rnavbutton1' onClick={goRegister}>회원가입</button>
                </div>
            )}    
        </>
    );
}
export default RouterLogin;
