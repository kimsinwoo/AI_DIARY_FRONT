import React, { useState } from "react";
import axios from "axios"; // axios 임포트
import styles from "../styles/Register.module.css";
import { Link, useNavigate } from 'react-router-dom'; // useNavigate 추가

export default function SignUp() {
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("")
    const [name, setName] = useState("")
    const [error, setError] = useState(false)
    const [message, setMessage] = useState('')
    const navigate = useNavigate(); 

    const handleLogin = async (e) => {
        e.preventDefault()
        if(password !== rePassword) {
            setMessage("비밀번호재입력을 확인해주세요.")
            return errorMessage()
        }
        if(!name) {
            setMessage("이름을 입력해주세요.")
            return errorMessage()
        }
        if(!userId) {
            setMessage("아이디를 입력해주세요.")
            return errorMessage()
        }
        try {
            const response = await axios.post('http://localhost:3030/auth/register', {
                UserId: userId,
                Password: password,
                Name: name
            })
            if (response.status == 201) {
                navigate('/login');
                window.location.reload()
            }
        } catch (error) {
            console.error(error)
        }
    }

    const errorMessage = () => {
        setError(true)
        setTimeout(() => {
            setError(false)
            setMessage('')
        }, 3000)
    }

    return (
        <div className={styles.container}>
            {
                error && <div className={styles.errorMessageBox}>{message}</div>
            }
            <div className={styles.loginBox}>
                <h2 className={styles.title}>처음 오신걸 환영해요!</h2>
                <form onSubmit={handleLogin} className={styles.form}>
                    <input
                        type="text"
                        placeholder="아이디를 입력해주세요."
                        value={userId} 
                        onChange={(e) => setUserId(e.target.value)}
                        className={styles.input}
                    />
                    <input
                        type="password"
                        placeholder="비밀번호를 입력해주세요."
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={styles.input}
                    />
                    <input
                        type="password"
                        placeholder="비밀번호를 재입력해주세요."
                        value={rePassword}
                        onChange={(e) => setRePassword(e.target.value)}
                        className={styles.input}
                    />
                    <input
                        type="text"
                        placeholder="이름을 입력해주세요."
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={styles.input}
                    />
                    <button className={styles.loginButton} type="submit">
                        회원가입
                    </button>
                    <div className={styles.LinkBox}>
                        <Link className={styles.a} to="/register">계정이 있으신가요?</Link>
                        <Link className={styles.a} to="/lostpw">비밀번호를 잃어버리셨나요?</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}