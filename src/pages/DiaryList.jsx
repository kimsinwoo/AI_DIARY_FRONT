import axios from "axios";
import Navbar from "../components/Navbar";
import style from '../styles/DiaryList.module.css';
import { useEffect, useState } from "react";
import DiaryCard from "../components/DiaryCard";
import { Link, useNavigate } from "react-router-dom";
import Modal from '../components/Modal'

export default function DiaryList({ accessToken, checkAttendance }) {
    const [list, setList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isModal, setIsModal] = useState(false)
    const navigate = useNavigate('')

    const getList = async () => {
        try {
            setIsLoading(true);
            const response = await axios.post('http://localhost:3030/diary/list', {
                accessToken
            });
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

    if (isLoading) {
        return <div className={style.loader}></div>;
    }

    const ClickCreate = () => {
        setIsModal(true);
    };

    const handleCloseModal = () => {
        setIsModal(false);
    };

    return (
        <div className={style.body}>
            {isModal && (
                <Modal setIsLoading={setIsLoading} onClose={handleCloseModal}>

                </Modal>

            )}
            <Navbar />
            <div className={style.ListBox}>
                <div className={style.Status}>
                    <div className={style.statusBox}>
                        <p>일기 작성 갯수</p>
                        <span>{list.length}</span>
                    </div>
                    <div className={style.statusBox}>
                        <p>오늘 일기 작성</p>
                        {
                            checkAttendance === true ?
                                <span>O</span>
                                :
                                <span>X</span>
                        }
                    </div>
                </div>
                <div className={style.List}>
                    {Array.isArray(list) &&
                        [...list] 
                            .reverse()
                            .map((item, index) => (
                                <Link
                                    className={style.Link}
                                    to="/diarydetail"
                                    state={{ diary: item }}
                                    key={index}
                                >
                                    <DiaryCard
                                        img={`http://localhost:3030${item.ImageData}`}
                                        title={item.Title}
                                        date={item.Date}
                                    />
                                </Link>
                            ))}

                </div>
            </div>
            {
                checkAttendance === false ?
                <div className={style.plusButton} onClick={ClickCreate}>+</div> :
                ""
            }
            <div className={style.glow_box_purple}></div>
            <div className={style.glow_box_blue}></div>
        </div>
    );

}
