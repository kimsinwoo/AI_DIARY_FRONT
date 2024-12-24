import { Link, useNavigate } from "react-router-dom";
import style from "../styles/introduce.module.css";

export default function introduce() {
  return (
    <div className={style.body}>
      <div className={style.intro_box}>
        <h1 className={style.firstText}>오늘 하루를 글로 표현하고</h1>
        <h1 className={style.secconText}>그림으로도 확인 해보세요.</h1>
        <Link to="/login" className={style.button}>일기 쓰기</Link>
      </div>
      <div className={style.glow_box_purple}></div>
      <div className={style.glow_box_blue}></div>
    </div>
  );
}
