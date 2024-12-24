import sytle from '../styles/DiaryListCard.module.css'

export default function DiaryCard({ img, date, title, Click }) {
  return (
    <div className={sytle.Card} onClick={Click}>
      <img src={img} alt="" width={65} />
      <div className={sytle.title}>
        <h3>{title}</h3>
        <span>{date.substr(0,4) + "년 " + date.substr(4, 2) + "월 " + date.substr(6,2) + "일"}</span>
      </div>
      <p>자세히 보러 가기...</p>
    </div>
  );
}
