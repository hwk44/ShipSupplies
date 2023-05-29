import { BrowserRouter, Route, Routes, useNavigate, Link } from 'react-router-dom';
import '../styles/RouterLogo.css';
import Search from '../components/Search';
import Logo from '../components/icon/Logo';
import Cart from '../components/icon/Cart';
import OrderHistory from '../components/icon/Orderhistory';
import { BsPerson, BsCart3 } from 'react-icons/bs';


import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';

const pages = ["상품검색", "카테고리 분류 예측", "게시판"];

const RouterLogo = () => {
    const navigate = useNavigate();

    const goCategorySearch = () => {
        navigate('/catesearch')
    }

    const goPrediction = () => {
        navigate('/prediction')
    }

    const goBoard = () => {
        navigate('board')
    }

    const goMypage = () => {
        navigate('/mypage')
    }

    const goCart = () => {
        navigate('/cart')
    }


    /*if (window.location.pathname === '/login') return null;
    if (window.location.pathname === '/register') return null;*/
    return (
        /*
        <div>
            <div className="rlogodiv" >
                <Logo />
                <button className="btn" onClick={goCategorySearch}>카테고리 검색</button>
                <button className="btn" onClick={goPrediction}>카테고리 분류 예측 </button>
                <button className="btn" onClick={goBoard}>게시판</button>
                <Cart />
            </div>
        </div>
        */
        /*
        <nav>
         <ul>
             <li><Logo /></li>
         </ul>
         <ul>
             <li><a href="/prediction">카테고리 검색</a></li>
             <li><a href="/catesearch">선용품 선택</a></li>
             <li><a href="/">게시판</a></li>
         </ul>
        </nav>
        */
        <nav class="bg-white border-gray-200 dark:bg-gray-900">
            <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Logo />
                <button data-collapse-toggle="navbar-default" type="button" class="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                    <span class="sr-only">Open main menu</span>
                    <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
                </button>
                <div class="hidden w-full md:block md:w-auto" id="navbar-default">
                    <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <li>
                            <a href="/prediction" class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                                카테고리 분류
                            </a>
                        </li>
                        <li>
                            <a href="#" class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                                리드타임 예측
                            </a>
                        </li>
                        <li>
                            <a href="/search" class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                                선용품 선택
                            </a>
                        </li>
                        <li>
                            <a href="#" class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                                게시판
                            </a>
                        </li>
                        
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