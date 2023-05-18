import axios from 'axios';
import { useState, useEffect, useRef } from "react";

const UserPwdUpdate = () => {

    const [password, setPassword] = useState('');
    const [changepwd, setChangepwd] = useState('');
    const [confirmChangePwd, setConfirmChangePwd] = useState('');

    const handlePwdUpdate = async (e) => {
        e.preventDefault();
        if (changepwd !== confirmChangePwd) {
            alert('변경할 비밀번호가 일치하지 않습니다.');
            return;
        }
        try {
            const response = await axios.post('/api/user/update', {
                password: password,
                changepwd: changepwd,
                confirmChangePwd : confirmChangePwd,
            });
            console.log(response.data); 
            alert('비밀번호 변경이 완료되었습니다.');

        }
        catch (error) {
            console.log(error);
            alert('비밀번호 변경 중 오류가 발생했습니다.');
        }
    }

    return (
        <>
            <h1>비밀번호 변경</h1>
            <form onSubmit={handlePwdUpdate}>
                <div>
                    <label>현재 비밀번호:</label>
                    <input type="password" value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div>
                    <label>변경할 비밀번호:</label>
                    <input type="password" value={changepwd}
                        onChange={(e) => setChangepwd(e.target.value)} />
                </div>
                <div>
                    <label>변경할 비밀번호 확인:</label>
                    <input
                        type="password" value={confirmChangePwd}
                        onChange={(e) => setConfirmChangePwd(e.target.value)} />
                </div>
                <button type="submit">비밀번호 변경</button>
            </form>
        </>
    );
}
export default UserPwdUpdate;
