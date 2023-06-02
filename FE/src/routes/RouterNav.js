import { BrowserRouter, Route, Routes, useNavigate, Link } from 'react-router-dom';
import '../styles/RouterLogo.css';
import Logo from '../components/icon/Logo';
import { BsPerson, BsCart3 } from 'react-icons/bs';
import { LuLogOut } from "react-icons/lu";
import Dropdown1 from '../components/Dropdown1';

const RouterNav = () => {
    const navigate = useNavigate();

    const goMypage = () => {
        navigate('/mypage')
    }

    const goCart = () => {
        navigate('/cart')
    }


    const isLoggedIn = !!localStorage.getItem('jwt');

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

    return (
        <nav>
            <div className='flex items-center justify-between my-4 mr-5 h-36'>
                <Logo />
                <ul className='flex flex-row space-x-4 items-center mr-12'>
                        <li>
                            <a href="/prediction" className="hover:text-blue-700 ">
                                카테고리 분류
                            </a>
                        </li>
                        
                        <li>
                            <a href="/regression" className="hover:text-blue-700">
                                리드타임 예측
                            </a>
                        </li>
                        
                        <li>
                            <a href="/search" className="hover:text-blue-700">
                                선용품 검색
                            </a>
                        </li>
                        <li>
                            <a href="/helpdesk" className="hover:text-blue-700">
                                고객센터
                            </a>
                        </li>
                        
                        <div className="flex items-center">
                            <Dropdown1 className="my-1" />
                            <button
                                type="button"
                                className="mx-2.5 text-gray-400 hover:text-black mb-3"
                                onClick={goCart}
                            >
                                <BsCart3 size={25}/>
                            </button>

                            {/* 로그인 시 로그아웃 버튼 보이게 */}
                            {isLoggedIn ? (
                                <button
                                type="button"
                                className="mx-2.5 mb-2.5 text-gray-400 hover:text-black flex flex-direction: row; "
                                onClick={handleLogout}
                                >
                                로그아웃
                                <LuLogOut size={20}/>
                                </button>
                            ) : (
                                <div></div>
                            )}
                        </div>
                    </ul>
            </div>
        </nav>
    );
}
export default RouterNav;