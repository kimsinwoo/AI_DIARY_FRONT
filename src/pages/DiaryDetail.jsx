import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import style from '../styles/DiaryDetail.module.css'

export default function DiaryDetail() {
    const location = useLocation();
    const { diary } = location.state || {};
    console.log(diary)
    const date = diary.Date.substr(0,4) + "년 " + diary.Date.substr(4,2) + "월 " + diary.Date.substr(6,2) + "일"
    return (
        <div>
            <Navbar />
            <div className={style.diaryContentBox}>
                <div className={style.TopBox}>
                    <img className={style.Image} src={`http://localhost:3030${diary.ImageData}`} alt="" width={320} height={320} />
                    <div className={style.Title}>
                        <div>
                            <h1>{diary.Title}</h1>
                            <span>{date}</span>
                        </div>
                        <div>
                            <span>날씨 : {diary.Weather}</span>
                            <span>기분 : {diary.Mood}</span>
                        </div>
                    </div>
                </div>
                <div className={style.content}>
                    {diary.Content}
                </div>
            </div>
            <div className={style.AI_Content}>
                <h2>다솜이</h2>
                <span>
                    {diary.Ai_Coments}
                </span>
            </div>
        </div>
    )
}