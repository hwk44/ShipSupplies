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
            <div className="container">
                <Sidebar className="sidebar" />
                <div className="content">
                    other pages
                    <Routes>
                        <Route exact path="/userupdate" component={UserUpdate} />
                        <Route path="/userpwdupdate" component={UserPwdUpdate} />
                        <Route path="/userdelete" component={UserDelete} />
                    </Routes>
                </div>
            </div>
        </>
    );
}
export default MyPage;
