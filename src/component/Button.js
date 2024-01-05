// 세 종류의 버튼(text,type,onClick)을 리액트 컴포넌트로 구현
// text: 버튼에 표시할 문자열
// type: 버튼 색상 결정
// onClick : 버튼 클릭 시 발생 이벤트핸들러
// 리액트의 버튼 생성: 이 세가지의 조합으로 여러가지의 버튼 생성 가능!
// 버튼에 props로 전달되는 type에 따라 스타일을 변경.
import './Button.css';


const Button = ({ text, type, onClick }) => {
    // 요소가 positive, negative인 배열에서 전달 type에 해당 요소가 있는지 includes 메서드로 확인
    // type이 positive 또는 negative 중 하나에 속하는지 확인 후 속하면 btnType = type, 그렇지 않으면 btnType = default.
    const btnType = ['positive', 'negative'].includes(type) ? type : 'default';
    return (
        <div>
            {/* 중괄호를 써서 복수의 데이터가 들어가는 객체 처리를 하고, 대괄호를 사용해 데이터의 배열처리
            props를 통해 넘겨받은 type값을 기준으로 버튼의 이름을 지정하고 그 데이터처리를 배열로 복수데이터를 하나의 데이터셋으로 처리
            오타 등의 이유로 type에 해당 값 없으면 default가 기본값. */}
            <button className={['Button', `Button_${btnType}`].join(' ')} onClick={onClick}>{text}</button>
        </div>
    )
}

// 아무런 type도 props로 전달되지 않을 때를 대비한 default값 지정
// type 지정 실패시 type은 default가 기본값.
Button.defaultProps = {
    type: 'default',
}
export default Button;