import './Viewer.css'
import { emotionList } from '../util';



const Viewer = ({ content, emotionId }) => {
    const emotionItem = emotionList.find((it) => it.id === emotionId);
    console.log(emotionItem)
    return (
        <div className='Viewer'>
            <section>
                <h4>오늘의 감정</h4>
                <div className={['emotionImgWrapper', `emotionImgWrapper${emotionId}`].join(' ')}>
                    <img alt={emotionItem.name} src={emotionItem.img} />
                    <div className='emotionDescript'>{emotionItem.name}</div>
                </div>
            </section>
            <section>
                <h4>오늘의 일기</h4>
                <div className='contentWrapper'>
                    <p>{content}</p>
                </div>
            </section>
        </div>
    )
}

export default Viewer;