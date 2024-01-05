//메인페이지에 달 별 데이터 생성.
//state의 초기값으로 날짜 객체를 부르는 방법을 통해 현재 날짜를 초기값으로 전달
//월별로 일기 데이터를 구분 하려면 date 객체에서 해당월의 가장 빠른 시간과 가장 늦은 시간의 타임스탬프 값 구해야
import { useState, useContext, useEffect } from 'react';
import { DiaryStateContext } from '../App';
import Button from '../component/Button';
import Header from '../component/Header';
import Editor from '../component/Editor';
import { getMonthRangeByDate, setPageTitle } from "../util";
import DiaryList from '../component/DiaryList';

const Home = () => {
    const data = useContext(DiaryStateContext);
    //일기를 날짜별로 분류하기 위해
    const [filteredData, setFilteredData] = useState([]);
    const [pivotDate, setPivotDate] = useState(new Date());
    const headerTitle = `${pivotDate.getFullYear()}년 ${pivotDate.getMonth() + 1}월`;
  
  useEffect(() => {
        setPageTitle('MED :: 메인페이지')
        if (data.length >= 1) {
            const { beginTimeStamp, endTimeStamp } = getMonthRangeByDate(pivotDate);
            setFilteredData(data.filter((it) => beginTimeStamp <= it.date && it.date <= endTimeStamp));
        }
        else {
            setFilteredData([]);
        }
    }, [data, pivotDate]);



    const onIncreaseMonth = () => {
        setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1));
    }
    const onDecreaseMonth = () => {
        setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1 ));
    }

    return (
      <div>
        <div>
          <Header
            title={headerTitle}
            leftChild={
              <Button type="positive" text={"<"} onClick={onDecreaseMonth} />
            }
            rightChild={
              <Button type="negative" text={">"} onClick={onIncreaseMonth} />
            }
          />
        </div>
        <DiaryList data={filteredData} />
      </div>
    );
}

export default Home;