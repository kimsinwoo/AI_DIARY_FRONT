import { useEffect, useState } from "react";
import { API_KEY } from "../config/config";
import axios from "axios";
import style from '../styles/weather.module.css'

export default function Weather() {
  const apiKey = API_KEY;

  const [weather, setWeather] = useState("");

  const [temp, setTemp] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const [weatherMent, setWeatherMent] = useState("")

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      getWeather(lat, lon);
    });
  };

  const getWeather = async (lat, lon) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    try {
      let response = await axios.get(url);
      let data = response.data;
      setWeather(data);
      setTemp(Math.floor(data.main.temp));
      console.log("현재 날씨는?", data);
    } catch (error) {
      console.error("에러 발생:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    getCurrentLocation();
    if (temp <= 14 && temp >= 5) {
        setWeatherMent("현재 날씨가 쌀쌀해요.");
      } else if (temp <= 4 && temp >= 1) {
        setWeatherMent("현재 날씨가 추워요.");
      } else if (temp <= 0 && temp >= -10) {
        setWeatherMent("오늘 날씨가 매우 추워요.");
      } else if (temp < -10) {
        setWeatherMent("오늘 날씨가 극도로 추워요.");
      }
  }, []);
  return (
    <div className={style.body}>
      {isLoading ? (
        <>
          <div className={style.loader}></div>
        </>
      ) : (
        <>
          <div>
            <h3>{weather && weather.name + " 날씨"}</h3>
            <h2>현재 온도 : {temp && temp - 273 + " 도"}</h2>
          </div>
          <div>
            {weatherMent}
          </div>
        </>
      )}
    </div>
  );
}
