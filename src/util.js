// 이미지 파일의 경로를 나타내는 변수 설정
import emotion1 from "./img/emotion1.png";
import emotion2 from "./img/emotion2.png";
import emotion3 from "./img/emotion3.png";
import emotion4 from "./img/emotion4.png";
import emotion5 from "./img/emotion5.png";

// 내가 선택한 case마다 그에 맞는 이모션 이모티콘이 선택될 수 있도록 컴포넌트를 만들기 위해 switch 구문 생성
// 상황에따라 이미지를 불러오는 단순 코드 저장 파일.App.js의 하위 컴포넌트가 아닌 동급?이기때문에 소문자로 시작해도 상관없다
export const getEmotionImgById = (emotionId) => {
    const targetEmotionId = String(emotionId);
    switch (targetEmotionId) {
        case '1':
            return emotion1;
        case '2':
            return emotion2;
        case '3':
            return emotion3;
        case '4':
            return emotion4;
        case '5':
            return emotion5;
        default:
            return null;
    }
}

export const getFormattedDate = (targetDate) => {
    let year = targetDate.getFullYear();
    let month = targetDate.getMonth() +1;
    let date = targetDate.getDate();
    if (month < 10) {
        month = `0${month}`;
    }
    if (date < 10) {
        date = `0${date}`;
    }
    return `${year}-${month}-${date}`;
}


export const emotionList = [
  {
    id: 1,
    name: "완전좋음",
    img: getEmotionImgById(1), //emotion1 파일의 경로 반환
  },
  {
    id: 2,
    name: "좋음",
    img: getEmotionImgById(2),
  },
  {
    id: 3,
    name: "그럭저럭",
    img: getEmotionImgById(3),
  },
  {
    id: 4,
    name: "나쁨",
    img: getEmotionImgById(4),
  },
  {
    id: 5,
    name: "매우나쁨",
    img: getEmotionImgById(5),
  },
];

//달의 기간 설정.
export const getMonthRangeByDate = (date) => {
  // 년도와 월은 그대로 두고 일자를 1로 설정 = 해당 달의 첫번째 날
  const beginTimeStamp = new Date(date.getFullYear(), date.getMonth(), 1).getTime();
  // 주어진 날짜의 년도와 다음달을 나타냄. 다음달이 되기 전날 밤 23시 59분 59초.
  const endTimeStamp = new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59).getTime();
  return { beginTimeStamp, endTimeStamp };
}
//예를 들어, date: 2023년 5월이라면
//beginTimeStamp : 2023년 5월 1일 00:00:00
//endTimeStamp : 2023년 6월 0일 23:59:59



// 각각의 세부페이지의 웹페이지 title을 변경하는 함수 생성
//getElementsByTagName : 인수로 전달한 태그를 전부 배열로 반환
//인수로 title을 전달하니 페이지 제목을 설정하는 <head>의 <title>태그 불러옴
//innerText로 제목 변경
export const setPageTitle = (title) => {
  const titleElement = document.getElementsByTagName('title')[0];
  titleElement.innerText = title;
}