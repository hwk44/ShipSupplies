import {BrowserRouter, Route, Routes, useNavigate, Link} from 'react-router-dom';
import '../styles/RouterLogo.css';
import Search from '../components/Search';
import Logo from '../components/icon/Logo';
import Cart from '../components/icon/Cart';
import OrderHistory from '../components/icon/Orderhistory';

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
    

    /*if (window.location.pathname === '/login') return null;
    if (window.location.pathname === '/register') return null;*/
    return(
        /*
        <div>
            <div className="rlogodiv" >
                <Logo />
                <button className="btn" onClick={goCategorySearch}>카테고리 검색</button>
                <button className="btn" onClick={goPrediction}>카테고리 분류 예측 </button>
                <button className="btn" onClick={goBoard}>게시판</button>
                <OrderHistory />
                <Cart />
            </div>
        </div>
        */
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
    );
}
export default RouterLogo;