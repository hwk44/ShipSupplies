<<<<<<< HEAD
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegisterPage = () => {
  const [userName, setUserName] = useState('');
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
=======
import { useState } from 'react';
import axios from 'axios';
import '../styles/Register.css';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');

  const onEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const onConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const onNameChange = (event) => {
    setName(event.target.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

>>>>>>> e8998638d5c592a468c0b2b8fc2d2ee59dc2338f
    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
<<<<<<< HEAD
    try {
      const response = await axios.post('/Addmember', {
        userName,
        email,
        id,
        password,
      });
      console.log(response.data); // 서버에서 반환한 데이터 출력
      alert('회원가입이 완료되었습니다.');
     
      // 회원가입 완료 후 로그인 페이지로 이동 등의 처리
      navigate('/login');
    } catch (error) {
      console.error(error);
      alert('회원가입 중 오류가 발생했습니다.');
    }
  };

  return (
    <>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="userName">Username:</label>
          <input
            type="text"
            id="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="id">id:</label>
          <input
            type="text"
            id="id"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </>
=======

    const data = {
      email,
      password,
      name,
    };

    // TODO: API 호출 등의 처리

    // 예시로서 콘솔에 출력
    console.log(data);
  };

  return (
    <div className="form1">
      <form className="form2" onSubmit={onSubmitHandler}>
        <label>이메일 주소</label>
        <input type="email" value={email} onChange={onEmailChange} placeholder="email" />
        <label>비밀번호</label>
        <input type="password" value={password} onChange={onPasswordChange} />
        <label>비밀번호 재확인</label>
        <input type="password" value={confirmPassword} onChange={onConfirmPasswordChange} />
        <label>이름</label>
        <input type="text" value={name} onChange={onNameChange} />
        <br />
        <button type="submit">회원가입</button>
      </form>
    </div>
>>>>>>> e8998638d5c592a468c0b2b8fc2d2ee59dc2338f
  );
};

export default RegisterPage;
