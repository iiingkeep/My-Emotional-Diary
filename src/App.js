import { Routes, Route, Link } from 'react-router-dom'
import React, { useReducer, useRef, useEffect, useState } from 'react';
import Home from './pages/Home'
import Edit from './pages/Edit'
import New from './pages/New'
import Diary from './pages/Diary'
import './App.css';
import { getEmotionImgById } from "./util";

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

function reducer(state, action) {
  switch (action.type) {
    case 'INIT':
      {
      return action.data;
      }
    case "CREATE":
      { 
        //새로운 게시물을 등록 시 현재 있던 데이터셋에 새로운 데이터action.data를 추가한 새로운 배열 생성 후 localStorage에 저장한 후 새로워진 상태 반환
        const newState = [action.data, ...state];
        localStorage.setItem('diary', JSON.stringify(newState))
        return newState;
      }
    case "UPDATE":
      {
        //state(현재상태)를 순회하며 action.data와 같은 id를 가진 항목을 찾아 업데이트 후 localStorage에 저장 후 새로워진 상태 반환
        const newState = state.map((it) =>
          String(it.id) === String(action.data.id) ? { ...action.data } : it)
        localStorage.setItem('diary', JSON.stringify(newState))
        return newState
      }
    case "DELETE":
      {
        //state(현재상태)를 순회하며 action.data와 같은 id를 가진 항목을 필터링하여 제거 후 새로워진 상태를 localStorage에 저장, 새로운 상태 반환
        const newState = state.filter((it) => String(it.id) !== String(action.data.id))
        localStorage.setItem('diary', JSON.stringify(newState));
        return newState;
      }
    default:
      {
        return state;  
      }
  }
}

const mockData = [
  {
    id: 'mock1',
    date: new Date().getTime()-1,
    content: 'mock1',
    emotionId: 1,
  },
  {
    id: 'mock2',
    date: new Date().getTime()-2,
    content: 'mock2',
    emotionId: 2,
  },
  {
    id: 'mock3',
    date: new Date().getTime()-3,
    content: 'mock3',
    emotionId: 3,
  },
]

function App() {
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [data, dispatch] = useReducer(reducer, []);
  const idRef = useRef(0);


  useEffect(() => {
    //로컬 스토리지로부터 diary라는 키 값에 저장해 둔 데이터를 불러와 rawData변수에 할당.
    //만약 rawData가 없다면 setIsDataLoaded를 true로 업데이트 후 종료
    const rawData = localStorage.getItem('diary');
    if (!rawData) {
      setIsDataLoaded(true);
      return;
    }
    //rawData가 존재한다면 JSON형식의 문자열로 저장된 데이터를 파싱해 localData변수에 할당
    //하지만 localData 길이가 0이면 데이터는 있지만 비어있다는 뜻이므로 setIsDataLoaded를 true로 업데이트 후 종료
    const localData = JSON.parse(rawData);
    if (localData.length === 0) {
      setIsDataLoaded(true);
      return;
    }
    //불러온 일기 데이터를 id 기준으로 내림차순 정렬
    //내림차순 정렬 = localData[0](데이터 배열의 첫 원소)는 id 중 가장 큰 값.
    //idRef.current, 즉 새로 추가되는 id의 값을 가장 큰 값에 1을 더해 할당
    //그 후 localStorage에 저장한 데이터를 초기에 불러옴
    localData.sort((a, b) => Number(b.id) - Number(a.id));
    idRef.current = localData[0].id + 1
    dispatch({ type: 'INIT', data: localData });
    setIsDataLoaded(true);
  }, [])

  const onCreate = (date, content, emotionId) => {
    dispatch({
      type: 'CREATE',
      data: {
        id: idRef.current,
        date: new Date(date).getTime(),
        content,
        emotionId,
      }
    });
    idRef.current += 1
  }
  const onUpdate = (targetId, date, content, emotionId) => {
    dispatch({
      type: 'UPDATE',
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        content,
        emotionId,
      }
    })
  }
  //일기 state를 dispatch로 업데이트하는 삭제 함수. (삭제상태 업데이트)변수 targetId로 삭제할 Id저장
  const onDelete = (targetId) => {
    dispatch({
      type: 'DELETE',
      targetId
    })
  }

  if (!isDataLoaded) {
    return <div>일기를 불러오는 중입니다 ●'◡'●</div>;
  }
  else {
    
    return (
      <DiaryStateContext.Provider value={data}>
        <DiaryDispatchContext.Provider value={{ onCreate, onUpdate, onDelete }}>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/edit/:id" element={<Edit />} />
              <Route path="/new" element={<New />} />
              <Route path="/diary/:id" element={<Diary />} />
            </Routes>
          </div>
        </DiaryDispatchContext.Provider>
      </DiaryStateContext.Provider>
      
    );
  }
}
  export default App;