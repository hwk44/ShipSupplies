import { useState, useEffect, useRef } from "react";
import { BrowserRouter, Route, Routes, useNavigate, Link, Switch, NavLink, Router } from 'react-router-dom';
import Sidebar from "../components/Sidebar";
import '../styles/MyPage.css';
import UserDelete from '../components/user/UserDelete';
import UserPwdUpdate from '../components/user/UserPwdUpdate';
import UserUpdate from '../components/user/UserUpdate';




const MyPage = () => {
    return (
        <>
            <Sidebar>
                <Routes>
                    <Route exact path="/" element={<UserUpdate />} />
                    <Route exact path="/userupdate" element={<UserUpdate />} />
                    <Route path="/userpwdupdate" element={<UserPwdUpdate />} />
                    <Route path="/userdelete" element={<UserDelete />} />
                </Routes>
            </Sidebar>
        </>
    );
}
export default MyPage;
