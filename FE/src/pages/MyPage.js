import { useState, useEffect , useRef} from "react";
import {BrowserRouter, Route, Routes, useNavigate, Link} from 'react-router-dom';



const MyPage = () => {
    const navigate = useNavigate();

    const goUserPwdUpdate = () => {
        navigate('/userpwdupdate')
    }

    const goUserUpdate = () => {
        navigate('/userupdate')
    }

    const goUserDelete = () => {
        navigate('/userdelete')
    }

    return(
        <>
            <h1>MyPage</h1>
            <button className='btnpwdupdate' onClick={goUserPwdUpdate}>비밀번호 변경</button>
            <button className='btnupdate' onClick={goUserUpdate}>회원정보 변경</button>
            <button className='btndelete' onClick={goUserDelete}>회원탈퇴</button>
            
           
        </>
    );
}
export default MyPage;
