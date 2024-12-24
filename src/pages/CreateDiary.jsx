import Navbar from "../components/Navbar";
import style from "../styles/CreateDiary.module.css";

export default function CreateDiary() {
  return (
    <div>
      <Navbar />
      <div className={style.SubNavbar}>
        <span>오늘 하루는 어떠하였나요?</span>
        <button>일기 생성하기</button>
      </div>
      <div className={style.DiaryList}>
        <h3>작성한 일기 목록</h3>
        <div className={style.DiaryListBox}>
            아직 작성한 일기가 없습니다.. ㅠㅠ
        </div>
      </div>
    </div>
  );
}
