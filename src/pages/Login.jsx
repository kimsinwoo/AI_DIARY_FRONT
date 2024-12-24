import React, { useState } from "react";
import axios from "axios"; // axios 임포트
import styles from "../styles/Login.module.css";
import { Link, useNavigate } from 'react-router-dom'; // useNavigate 추가

export default function Login() {
  const [userId, setUserId] = useState(""); // userId 상태로 변경
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // 로그인 후 이동할 페이지를 처리하기 위해 useNavigate 추가

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:3030/auth/login', {
        UserId : userId,
        Password : password
      })
      if (response.data.accessToken) {
        // 로그인 성공 시, 엑세스 토큰을 로컬 스토리지에 저장
        localStorage.setItem('accessToken', response.data.accessToken);
        navigate('/');
        window.location.reload()
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <h2 className={styles.title}>돌아오신걸 환영해요!</h2>
        <form onSubmit={handleLogin} className={styles.form}>
          <input
            type="text"
            placeholder="아이디를 입력해주세요." // userId로 변경
            value={userId} // userId로 변경
            onChange={(e) => setUserId(e.target.value)} // userId로 변경
            className={styles.input}
            required
          />
          <input
            type="password"
            placeholder="비밀번호를 입력해주세요."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
            required
          />
          <button className={styles.loginButton} type="submit">
            로그인
          </button>
          <div className={styles.LinkBox}>
            <Link className={styles.a} to="/register">계정이 없으신가요?</Link>
            <Link className={styles.a} to="/lostpw">비밀번호를 잃어버리셨나요?</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
