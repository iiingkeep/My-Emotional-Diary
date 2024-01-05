import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
//BrowserRouter에는 브라우저의 주소(url이 아닌, 유저에게 보여지는 컨텐츠)변경을 감지하는 기능 탑재
//컴포넌트가 페이지를 구성하고 이동하는데 필요한 기능 제공.

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //react router 적용: 실행할 App 스크립트를 <BrowserRouter></BrowserRouter>로 감싼다
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

