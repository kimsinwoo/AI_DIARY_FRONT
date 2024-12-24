import React from "react"
import style from "../styles/Modal.module.css"
import axios from "axios"
import { useState } from "react";

export default function Modal({ onClose, children, setIsLoading }) {
    const [title, setTitle] = useState('');
    const [weather, setWeather] = useState('눈이 내림');
    const [mood, setMood] = useState('아주 좋음');
    const [content, setContent] = useState('');
    const accessToken = localStorage.getItem('accessToken')

    const handleTitleChange = (e) => setTitle(e.target.value);
    const handleWeatherChange = (e) => setWeather(e.target.value);
    const handleMoodChange = (e) => setMood(e.target.value);
    const handleContentChange = (e) => setContent(e.target.value);

    const date = new Date()
    const formattedDateForDisplay = `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`
    const formattedDateForServer = date.toISOString().slice(0, 10).replace(/-/g, '')
    
    const handleOutsideClick = (e) => {
        onClose();
    };

    const handleInsideClick = (e) => {
        e.stopPropagation();
    };

    const creatediary = async () => {
        try {
            setIsLoading(true)
            const response = await axios.post('http://localhost:3030/diary/imagecreate', {
                title,
                content,
                weather,
                mood,
                date : formattedDateForServer,
                accessToken
            })
        } catch (e) {
            console.log(e)
        } finally {
            setIsLoading(false)
            window.location.reload()
        }
    }

    return (
        <div className={style.modalOverlay} onClick={handleOutsideClick}>
            <div className={style.modalContent} onClick={handleInsideClick}>
                <h2>일기 작성</h2>
                <label>
                제목
                <input
                    type="text"
                    placeholder="제목을 입력하세요"
                    value={title}
                    onChange={handleTitleChange}
                    className={style.input}
                />
            </label>
            <label>
                날짜
                <input
                    type="text"
                    value={formattedDateForDisplay}
                    readOnly
                    className={style.input}
                />
            </label>
            <label>
                날씨
                <select
                    value={weather}
                    onChange={handleWeatherChange}
                    className={style.select}
                >
                    <option value="눈이 내림">눈이 내림</option>
                    <option value="아주 맑음">아주 맑음</option>
                    <option value="맑음">맑음</option>
                    <option value="흐림">흐림</option>
                    <option value="비가 내림">비가 내림</option>
                </select>
            </label>
            <label>
                기분
                <select
                    value={mood}
                    onChange={handleMoodChange}
                    className={style.select}
                >
                    <option value="아주 좋음">아주 좋음</option>
                    <option value="좋음">좋음</option>
                    <option value="보통">보통</option>
                    <option value="나쁨">나쁨</option>
                    <option value="아주 나쁨">아주 나쁨</option>
                </select>
            </label>
            <label>
                일기 내용
                <textarea
                    placeholder="오늘 하루를 기록하세요"
                    value={content}
                    onChange={handleContentChange}
                    className={style.textarea}
                ></textarea>
            </label>
                        <button className={style.submitButton} onClick={creatediary}>작성하기</button>
                    </div>
                </div>
            );
        }
