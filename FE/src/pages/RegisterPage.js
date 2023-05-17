import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Register.css';
import Logo from '../components/Logo';

const RegisterPage = () => {
  // 아이디, 이메일, 비밀번호, 비밀번호 확인
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  
  // 오류메시지 상태저장
  const [idMessage, setIdMessage] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [confirmPasswordMessage, setConfirmPasswordMessage] = useState('');
  const [userNameMessage, setUserNameMessage] = useState('');
  const [emailMessage, setEmailMessage] = useState(''); 

  // 유효성 검사
  const [isId, setIsId] = useState('');
  const [isPassword, setIsPassword] = useState('');
  const [isConfirmPassword, setIsConfirmPassword] = useState('');
  const [isUserName, setIsUserName] = useState('');
  const [isEmail, setIsEmail] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    } 
    try{
      const response = await axios.post('/api/user/join', {
        id : id,
        password :password,
        username : userName,
        email : email,
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

  // 이름
  const onChangeName = async(e) => {
    setUserName(e.target.value);
    if (e.target.value.length < 2 || e.target.value.length > 5){
      setUserNameMessage('2글자 이상 5글자 미만으로 입력해주세요.');
      setIsUserName(false);
    } 
  }
  
  
  // 이메일
  const onChangeEmail = (e) => {
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
    const emailCurrent = e.target.value
    setEmail(emailCurrent)

  }
  

  return (
    <div className="registerdiv1">
      <Logo className="logo" />
      <form className="registerform1" onSubmit={handleRegister}>
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
          onChange={(e) => setUserName(e.target.value)} required/>
        <label>이메일</label>
        <input type="email" id="email" value={email} 
          onChange={onChangeEmail} required/>
        {email.length > 0 && <span className={`message ${isEmail ? 'success' : 'error'}`}>{emailMessage}</span>}
        <br />
        <button type="submit">회원가입</button>
      </form>
      <Link to="/login">로그인</Link>
    </div>
  );
};

export default RegisterPage;
