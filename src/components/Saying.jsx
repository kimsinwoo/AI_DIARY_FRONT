import axios from "axios";
import { useState, useEffect } from "react";
import style from "../styles/Saying.module.css";

export default function Saying() {
  const [dataList, setData] = useState(null); 
  const [isLoading, setIsLoading] = useState(false);

  const getSaying = async () => {
    const url = "https://korean-advice-open-api.vercel.app/api/advice";
    try {
      let response = await axios.get(url);
      let data = response.data;
      setData(data); 
      console.log("받은 데이터:", data);
    } catch (error) {
      console.error("에러 발생:", error);
    } finally {
      setIsLoading(false); 
    }
  };

  useEffect(() => {
    setIsLoading(true);
    getSaying();
  }, []);

  return (
    <div className={style.body}>
      {isLoading ? ( 
        <div className={style.loader}></div>
      ) : dataList ? ( 
        <div className={style.message}>
          <div>
            <h3>{dataList.author}</h3>
            <span>{dataList.authorProfile}</span>
          </div>
          <span>{dataList.message}</span>
        </div>
      ) : (
        <div>데이터를 불러올 수 없습니다.</div>
      )}
    </div>
  );
}
