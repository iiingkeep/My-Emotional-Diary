import { useNavigate } from 'react-router-dom';
import Button from '../component/Button';
import Header from '../component/Header';
import Editor from '../component/Editor';
import { useContext, useEffect } from 'react';
import { DiaryDispatchContext } from '../App';
import { setPageTitle } from '../util';

//새 일기 '작성완료' 버튼 클릭 시 일기가 추가되도록 구현.
//App 함수의 onCreate 호출을 위해 DiaryDispatchContext import


const New = () => {
  useEffect(() => {
    setPageTitle('MED :: 새 일기 쓰기')
  },[])
  //useContext 사용, DiaryDispatchContext를 인수로 받아 onCreate함수 소환
  //일기 데이터가 JSON형태의 객체이므로 { }사용
  const { onCreate } = useContext(DiaryDispatchContext);
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  }
  const onSubmit = (data) => {
    const { date, content, emotionId } = data;
    onCreate(date, content, emotionId);
    navigate('/', {replace: true})
  }
    return (
      <div>
        <Header title={'새 일기 쓰기'} leftChild={<Button text={'<'} onClick={goBack} />} />
        <Editor onSubmit={onSubmit} />
      </div>
    );
}

export default New;