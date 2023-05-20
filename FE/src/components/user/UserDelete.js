import { useState } from 'react';
import axios from 'axios';

const UserDelete = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleDelete = (event) => {
    event.preventDefault();

    // 회원 탈퇴 요청을 백엔드로 전송
    axios.post('/api/user/delete', { username, password })
      .then((response) => {
        // 회원 탈퇴 성공 시 처리
        console.log('회원 탈퇴 성공:', response.data);
      })
      .catch((error) => {
        // 회원 탈퇴 실패 시 처리
        console.error('회원 탈퇴 실패:', error.response.data);
      });

    // 폼 초기화
    setUsername('');
    setPassword('');
  };

  return (
    <form onSubmit={handleDelete}>
      <div>
        <label htmlFor="username">사용자명:</label>
        <input type="text" id="username" value={username}
          onChange={handleUsernameChange} />
      </div>
      <div>
        <label htmlFor="password">비밀번호:</label>
        <input type="password" id="password" value={password}
          onChange={handlePasswordChange} />
      </div>
      <button type="submit">회원 탈퇴</button>
    </form>
  );
};

export default UserDelete;
