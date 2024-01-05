import { useNavigate } from 'react-router-dom';
import { getEmotionImgById } from '../util';
import './DiaryItem.css'
import Button from './Button';
import React from 'react';

const DiaryItem = ({ id, emotionId, content, date }) => {
    const navigate = useNavigate();
    const goDetail = () => {
        navigate(`diary/${id}`);
    }

    const goEdit = () => {
        navigate(`/edit/${id}`);
}

    return (
        <div className='DiaryItem'>
            <div onClick={goDetail} className={['img_section', `img_section_${emotionId}`].join(' ')}>
                <img alt={`emotion${emotionId}`} src={getEmotionImgById(emotionId)} />
            </div>
            <div onClick={goDetail} className='infoSection'>
                <div className='dateWrapper'>
                    {new Date(parseInt(date)).toLocaleDateString()}
                </div>
                <div className='contentWrapper'>
                    {/* 화면에 표시되는 컨텐츠를 25글자로 제한 */}
                    {content.slice(0,25)}
                </div>
            </div>
                <div className='buttonSection'>
                    <Button onClick={goEdit} text={'수정하기'}></Button>
                </div>
        </div>
    )
}

export default React.memo(DiaryItem);