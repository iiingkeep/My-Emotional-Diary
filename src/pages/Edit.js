import { useContext, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import useDiary from '../hooks/useDiary';
import Button from "../component/Button";
import Header from "../component/Header";
import Editor from '../component/Editor';
import { DiaryDispatchContext } from '../App';
import { setPageTitle } from '../util';



const Edit = () => {
    useEffect(() => {
        setPageTitle('MED :: 일기 수정하기')
    },[])
    const { id } = useParams();
    const data = useDiary(id);
    const navigate = useNavigate();
    //삭제하기와 작성완료 버튼에 적용할 이벤트 함수 불러온다
    const { onUpdate,onDelete } = useContext(DiaryDispatchContext);

    const onSubmit = (data) => {
        if (window.confirm('일기를 정말 수정할까요?')) {
            const { date, content, emotionId } = data;
            onUpdate(id, date, content, emotionId);
            navigate('/', { replace: true });
        }
    }

    const onClickDelete = () => {
        if (window.confirm('일기를 정말 삭제할까요? 복구되지 않습니다')) {
            onDelete(id);
            navigate('/', { replace: true });
        }
    }

    const goBack = () => {
        navigate(-1);
    }

    if (!data) {
        return <div>일기를 불러오는 중입니다 ●'◡'●</div>
    }
    else {
        return (
            <div>
                <Header title={'일기 수정하기'}
                    leftChild={<Button type='positive' text={'<'} onClick={goBack} />}
                    rightChild={<Button type='negative' text={'삭제하기'} onClick={onClickDelete} />} />
                <Editor initData={data} onSubmit={onSubmit} />

            </div>
        )
    }
}

export default Edit;