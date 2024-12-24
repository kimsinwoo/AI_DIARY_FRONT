import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Nav, Weather } from "../components";
import style from "../styles/MainPage.module.css";
import DiaryCard from "../components/DiaryCard";
import Saying from "../components/Saying";
import axios from 'axios'

export default function MainPage({ checkAttendance }) {
  const [diaryData, setData] = useState(null);
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken'))

  const getList = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post('http://localhost:3030/diary/list', {
        accessToken
      });
      // response.data.data를 확인하고 배열만 설정
      console.log("API 응답 데이터:", response.data.data);
      setList(Array.isArray(response.data.data) ? response.data.data : []);
    } catch (e) {
      console.log("API 요청 에러:", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getList();
  }, []);
  console.log(diaryData);
  return (
    <div className={style.body}>
      <Nav />
      <div className={style.info_box}>
        <Weather />
        <span className={style.line1}></span>
        <Saying />
      </div>
      <div className={style.startBox}>
        {
          <div>
            {
              checkAttendance === true ? (
                <>
                  <h2>오늘 일기를 작성을 완료하였습니다!!</h2>
                </>
              ) :
                (
                  <>
                    <h2>오늘의 일기를 작성하러 가볼까요?</h2>
                    <Link className={style.button} to="/diary">
                      작성 하기
                    </Link>
                  </>
                )
            }
          </div>
        }
        <span className={style.line2}></span>
        <div>
          <h2>일기 리스트</h2>
          {list !== null && Array.isArray(list) && list.length > 0 ? (
            [...list]
              .reverse()
              .slice(0, 4) 
              .map((a, i) => (
                <Link
                  className={style.LinkBox}
                  to="/diarydetail"
                  state={{ diary: a }}
                  key={i}
                >
                  <DiaryCard
                    img={`http://localhost:3030${a.ImageData}`}
                    title={a.Title}
                    date={a.Date}
                  />
                </Link>
              ))
          ) : (
            <span>현재 작성한 일기가 없습니다...</span>
          )}
        </div>
      </div>
    </div>
  );
}
