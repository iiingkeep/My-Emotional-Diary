//useNavigate 리액트 훅을 이용해 데이터 등을 새로운 페이지로 이동 시킬 수 있지만 페이지 구성요소인 '컴포넌트'에서만 사용 가능. 일반함수는 불가
//위의 문제를 해결하기 위해 리액트 훅의 기능을 직접 코딩해 유저만의 코드 즉, 커스텀훅 useDiary 만듦.

//Custom hook인 useDiary 만들기. 직접 만든 함수가 리액트 훅스라는 것을 나타내기 위해 파일 이름에 use를 붙이도록.
//고유데이터를 구분하는 id를 인풋값으로 받음

//useDiary 함수를 통해 일기 데이터를 불러오는 기능 구현
//useContext를 통해 전체 일기 데이터를 불러온 후 데이터 페이지 이동을 처리

//useNavigate을 통해 입력 id와 일치하는 일기데이터 없을 시 home 화면으로 사용자 리다이렉트
import { useContext, useEffect, useState } from 'react';
import { DiaryStateContext } from '../App';
import { useNavigate } from 'react-router-dom';


const useDiary = (id) => {
    const data = useContext(DiaryStateContext);
    const [diary, setDiary] = useState();
    const navigate = useNavigate();
    //useEffect를 이용해 id나 data값이 바뀔때마다 일기 데이터에서 id값과 일치하는 일기를 찾아 해당 일기 데이터를 업데이트
    useEffect(() => {
        const matchDiary = data.find((it) => String(it.id) === String(id));
        if (matchDiary) {
            setDiary(matchDiary)
        }
        else {
            alert('일기가 존재하지 않습니다');
            //replace: navigate함수 호출 시 사용되는 옵션 중 하나. 
            //true: 현재 페이지의 기록을 지우고 홈페이지로 이동
            //false: 현재 페이지 기록 유지 후 홈페이지 이동. 뒤로가기 누르면 직전에 방문한 페이지로 이동 가능
            navigate('/', {replace: true})
        }
    }, [id, data])
    
    return diary;
}

export default useDiary;