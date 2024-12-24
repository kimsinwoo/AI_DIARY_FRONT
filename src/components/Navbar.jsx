import { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import style from '../styles/Navbar.module.css'
import axios from 'axios'

export default function Navbar() {
    const [isLogin, setIsLogin] = useState(localStorage.getItem('accessToken') ? true : false)
    const navigator = useNavigate('')

    const handlerLogout = async () => {
        const accessToken = localStorage.getItem("accessToken")
        const response = await axios.post('http://localhost:3030/auth/logout', {
            accessToken
        })
        localStorage.removeItem('accessToken')
        navigator('/')
        window.location.reload()
        console.log(response)
    }
    return (
        <div className={style.body}>
            <ul>
                <li>
                    <Link className={style.a} to="/">Home</Link>
                </li>
                <li>
                    <Link className={style.a} to="/Diary">Diary</Link>
                </li>
            </ul>
            <ul>
                {
                    isLogin === false ?
                    <>
                        <li>
                            <Link className={style.a} to="/login">로그인</Link>
                        </li>
                        <li>
                            <Link className={style.a} to="/register">회원가입</Link>
                        </li>
                    </>
                    :
                    <>
                        <li>
                            <button className={style.button} onClick={handlerLogout}>로그아웃</button>
                        </li>
                    </>
                }
            </ul>
        </div>
    )
}