import axios from 'axios';
import { useState, useEffect, useRef } from "react";

const UserUpdate = () => {

    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');

    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/api/user/update', {
                userName: userName,
                email: email,
            });
            console.log(response.data);
            alert('회원정보 변경이 완료되었습니다.');

        }
        catch (error) {
            console.log(error);
            alert('회원정보 변경 중 오류가 발생했습니다.');
        }


    }



    return (
        <>
            <h1>회원정보 변경</h1>
            <form onSubmit={handleUpdate}>
                <div>
                    <label>이름:</label>
                    <input type="text" value={userName}
                        onChange={(e) => setUserName(e.target.value)} />
                </div>
                <div>
                    <label>이메일:</label>
                    <input type="email" value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                </div>
                <button type="submit">정보수정</button>

            </form>
        </>
    );
}
export default UserUpdate;
