

export default function DiaryListBox({img, title, content, date, weather}) {
    return (
        <div>
            <img src={img} alt="" />
            <div>
                <h2>{title}</h2>
                <span>{content}</span>
            </div>
            <div>
                <span>{date}</span>
                <span>{weather}</span>
            </div>
        </div>
    )
}