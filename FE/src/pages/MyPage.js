import { useState, useEffect, useRef } from "react";
import { BrowserRouter, Route, Routes, useNavigate, Link, Switch, NavLink, Router } from 'react-router-dom';
import Sidebar from "../components/Sidebar";
import '../styles/MyPage.css';
import UserDelete from '../components/user/UserDelete';
import UserPwdUpdate from '../components/user/UserPwdUpdate';
import UserUpdate from '../components/user/UserUpdate';
import Navbar from "../components/mypage/Navbar";
import Dropdown1 from "../components/Dropdown1";




const MyPage = () => {
    return (
        <>
            {/* <Sidebar>
                <Routes>
                    <Route exact path="/" element={<UserUpdate />} />
                    <Route exact path="/userupdate" element={<UserUpdate />} />
                    <Route path="/userpwdupdate" element={<UserPwdUpdate />} />
                    <Route path="/userdelete" element={<UserDelete />} />
                </Routes>
            </Sidebar> */}
            
                <Navbar />
                <Routes>
                    {/* <Route exact path="/" element={<UserUpdate />} /> */}
                    <Route exact path="/userupdate" component={UserUpdate} />
                    <Route path="/userpwdupdate" component={UserPwdUpdate} />
                    <Route path="/userdelete" component={UserDelete} />
                </Routes>

        </>
    );
}
export default MyPage;
