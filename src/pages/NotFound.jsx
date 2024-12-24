import img from '../404_animation.gif'
import style from '../styles/NotFound.module.css'

export default function NotFound({ checkAttendance }) {
    return (
        <div className={style.body}>
            <h1>페이지를 찾지 못했습니다!</h1>
            <img src={img} alt="" width={800}/>
        </div>
    )
}