// 취소하기 버튼은 누르면 메인 페이지로 돌아가야함
// react-router-dom의 기능 중 useNavigate :리액트에서 뒤로가기 이벤트가 동작
import {useNavigate} from 'react-router-dom'
import './Editor.css';
import { useState, useEffect, useCallback } from 'react';
import { emotionList, getFormattedDate } from '../util';
import Button from './Button';
import EmotionItem from './EmotionItem';

const Editor = ({ initData, onSubmit }) => {
    // useNavigate를 호출해 함수 navigate를 생성하면 간편하게 페이지간 이동
    const navigate = useNavigate();
    const [state, setState] = useState({
      // util컴포넌트에서 설정한 날짜 형식을 가져와 사용
      date: getFormattedDate(new Date()),
      emotionId: 3,
      content: "",
    });
    // 날짜 관련 이벤트 핸들러 생성
    // 사용자가 입력된 날짜를 변경하면 함수가 호출되어 state를 업데이트.
    const handleChangeDate = (e) => {
        // 현재의 stage 가져와 새로운 객체 생성. 다른 속성은 그대로 유지하고 업데이트 할 속성(date)만 변경
        setState({
            ...state,
            date: e.target.value,
        })
    }
    const handleChangeContent = (e) => {
        setState({
            ...state,
            content: e.target.value,
        })
    }
    // 작성완료 버튼의 onClick 함수
    const handleSubmit = () => {
        onSubmit(state);
    }
    // 취소 버튼의 onClick함수
    const handleOnGoBack = () => {
        navigate(-1);
    }

    //감정 이미지를 클릭하면 호출할 이벤트 함수
    //감정 이미지 선택 섹션에서 클릭한 이미지 번호를 매개변수 emotionId에 저장. 이 저장된 번호로 현재 state의 emotionId값 업데이트
    const handleChangeEmotion = useCallback((emotionId) => {
        setState((state) => ({
            ...state,
            emotionId,
        }));
    }, []);
    //editor 컴포넌트에서 useEffect를 호출하고 props로 받은 initData를 의존성 배열에 저장
    //useEffect의 콜백함수가 실행될 때 initData 참거짓여부를 확인해 setState로 상태를 업데이트.
    useEffect(() => {
        if (initData) {
            setState({
                ...initData,
                date: getFormattedDate(new Date(parseInt(initData.date))),
            })
        }
    },[initData])

    return (
        <div className='Editor'>
            <div className='EditorSection'>
                <h4>오늘의 날짜</h4>
                <div className='InputWrapper'>
                    <input type='date' value={state.date}
                    onChange={handleChangeDate} />
                </div>
            </div>
            <div className='EditorSection'>
                <h4>오늘의 감정</h4>
                <div className='InputWrapper EmotionListWrapper'>
                    {/* map함수를 이용해 emotionList에 저장 된 5개의 이미지 객체렌더링.
                    props의 key로 감정 이미지의 id와 프로퍼티 전달.
                    마지막으로 현재 배열요소의 id와 state.emotionId가 동일한지 확인작업을 통해 현재 선택된 감정 이미지 여부 파악 */}
                    {emotionList.map((it) => (
                        <EmotionItem key={it.id} {...it}
                            onClick={handleChangeEmotion}
                            isSelected={state.emotionId === it.id} />
                    ))}
                </div>
            </div>
            <div className='EditorSection'>
                <h4>오늘의 일기</h4>
                <div className='InputWrapper'>
                    <textarea placeholder='오늘은 어땠나요?'
                     value={state.content} onChange={handleChangeContent} />
                </div>
            </div>
            <div className='EditorSection BottomSection'>
                <Button text={'취소하기'} onClick={handleOnGoBack} />
                <Button text={'작성완료'} type={'positive'}
                    onClick={handleSubmit} />
                {/* 작성완료, 취소 관련 코드 삽입 */}
            </div>
        </div>
    )
}

export default Editor;