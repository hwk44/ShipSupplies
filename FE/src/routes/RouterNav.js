import { useNavigate } from 'react-router-dom';
import '../styles/RouterLogo.css';
import Logo from '../components/icon/Logo';
import { BsCart3 } from 'react-icons/bs';
import { LuLogOut } from "react-icons/lu";
import Dropdown from '../components/mypage/Dropdown';
import axios from 'axios';

const RouterNav = () => {
    const navigate = useNavigate();

    const goCart = () => {
        navigate('/cart')
    }

    const isLoggedIn = !!localStorage.getItem('userId');
    const userId = localStorage.getItem('userId');


    const handleLogout = async () => {
        try {
            // 서버에 로그아웃 요청
            const response = await axios.post('/api/user/logout', {
                user: { id: userId }
            });

            console.log(response)

            localStorage.removeItem('userId');
            alert('로그아웃 되었습니다.');
            window.location.href = "/";
        } catch (error) {
            console.log(error);
            alert('로그아웃 처리 중 오류가 발생했습니다.');
        }
    };

    return (
        <nav>
            <div className='flex items-center justify-between my-4 mr-5 h-14'>
                <Logo />
                <ul className='flex flex-row space-x-4 items-center mr-12'>
                    <li>
                        <a href="/data" className="hover:text-blue-700">
                            데이터 통계
                        </a>
                    </li>
                    
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
                        <Dropdown className="my-1" />
                        <button
                            type="button"
                            className="mx-2.5 text-gray-400 hover:text-black mb-3"
                            onClick={goCart}
                        >
                            <BsCart3 size={25} />
                        </button>

                        {/* 로그인 시 로그아웃 버튼 보이게 */}
                        {isLoggedIn ? (
                            <button
                                type="button"
                                className="mx-2.5 mb-2.5 text-gray-400 hover:text-black flex flex-direction: row; "
                                onClick={handleLogout}
                            >
                                로그아웃
                                <LuLogOut size={20} />
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