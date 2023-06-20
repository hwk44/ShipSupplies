import { useState, useEffect, useRef } from "react";
import { BrowserRouter, Route, Routes, useNavigate, Link, Switch, NavLink, Router } from 'react-router-dom';
import '../styles/MyPage.css';
import UserDelete from '../components/mypage/UserDelete';
import UserPwdUpdate from '../components/mypage/UserPwdConfirm';
import UserUpdate from '../components/mypage/UserUpdate';

const MyPage = () => {
    return (
        <>
            <Routes>
                {/* <Route exact path="/userupdate2" component={UserUpdate} /> */}
                <Route path="/userpwdupdate" component={UserPwdUpdate} />
                <Route path="/userdelete" component={UserDelete} />
            </Routes>
        </>
    );
}
export default MyPage;
