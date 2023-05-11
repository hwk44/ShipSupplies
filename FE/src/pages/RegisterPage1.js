import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Register.css';

const RegisterPage = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    } 
    try{
      const response = await axios.post('/addMember', {
        id,
        password,
        userName,
        email,
      });
      console.log(response.data); // 서버에서 반환한 데이터 출력
      alert('회원가입이 완료되었습니다.');
     
      // 회원가입 완료 후 로그인 페이지로 이동 등의 처리
      navigate('/login');
    }
    catch (error) {
      console.log(error);
      alert('회원가입 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="registerdiv1">
      <form className="registerform1" onSubmit={handleSubmit}>
        <label>아이디</label>
        <input type="text" id="id" value={id} 
          onChange={(e) => setId(e.target.value)} required/>
        <label>비밀번호</label>
        <input type="password" id="password" value={password} 
          onChange={(e) => setPassword(e.target.value)} required />
        <label>비밀번호 재확인</label>
        <input type="password" id="confirmPassword" value={confirmPassword} 
          onChange={(e) => setConfirmPassword(e.target.value)} required />
        <label>이름</label>
        <input type="text" id="userName" value={userName}
          onChange={(e) => setUserName(e.target.value)} />
        <label>이메일</label>
        <input type="email" id="email" value={email} 
          onChange={(e) => setEmail(e.target.value)} required/>
        <br />
        <button type="submit">회원가입</button>
      </form>
      <Link to="/login">로그인</Link>
    </div>
  );
};

export default RegisterPage;
