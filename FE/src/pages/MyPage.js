import { useState, useEffect , useRef} from "react";
import {BrowserRouter, Route, Routes, useNavigate, Link, Switch, NavLink} from 'react-router-dom';
import Sidebar from "../components/user/Sidebar";
import '../styles/MyPage.css';
import UserDelete from '../components/user/UserDelete';
import UserPwdUpdate from '../components/user/UserPwdUpdate';
import UserUpdate from '../components/user/UserUpdate';




const MyPage = () => {

    const activeStyle = {
        color : '#289951',
    }

    return(
        <>
            <div className="center">
                {/* <Sidebar/> */}
                <Routes>
                    <Route exact path="/userupdate" component={UserUpdate} />
                    <Route path="/userpwdupdate" component={UserPwdUpdate} />
                    <Route path="/userdelete" component={UserDelete} />
                </Routes>
                <div>
                    <div>마이페이지</div>
                    <ul>
                        <li>
                            <NavLink style={({ isActive }) => (isActive? activeStyle : {})} to="/userupdate" >
                                정보변경
                            </NavLink>
                        </li>
                        <li>
                            <NavLink style={({ isActive }) => (isActive? activeStyle : {})} to="/userpwdupdate" >
                                비밀번호 변경
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
}
export default MyPage;
