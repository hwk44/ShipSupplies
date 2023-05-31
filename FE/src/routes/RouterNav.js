import { BrowserRouter, Route, Routes, useNavigate, Link } from 'react-router-dom';
import '../styles/RouterLogo.css';
import Logo from '../components/icon/Logo';
import { BsPerson, BsCart3 } from 'react-icons/bs';

const RouterLogo = () => {
    const navigate = useNavigate();

    const goMypage = () => {
        navigate('/mypage')
    }

    const goCart = () => {
        navigate('/cart')
    }

    return (
        <nav class="bg-white border-gray-200 dark:bg-gray-900">
            <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Logo />
                <div class="hidden w-full md:block md:w-auto" id="navbar-default">
                    <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <li>
                            <a href="/prediction" class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                                카테고리 분류
                            </a>
                        </li>
                        <li>
                            <a href="/regression" class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                                리드타임 예측
                            </a>
                        </li>
                        <li>
                            <a href="/search" class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                                선용품 선택
                            </a>
                        </li>
                        {/* <li>
                            <a href="#" class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                                게시판
                            </a>
                        </li> */}
                        
                        <button
                            type="button"
                            className="rounded-fullp-1 text-gray-400 hover:text-black focus:outline-none focus:ring-white focus:ring-offset-2 "
                            onClick={goMypage}
                        >
                            <BsPerson size={30}/>
                        </button>
                        <button
                            type="button"
                            className="rounded-fullp-1 text-gray-400 hover:text-black focus:outline-none focus:ring-white focus:ring-offset-2 "
                            onClick={goCart}
                        >
                            <BsCart3 size={30}/>
                        </button>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
export default RouterLogo;