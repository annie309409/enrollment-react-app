import React from 'react';
// 16버전에서 불러오는 방법
import ReactDOM from 'react-dom';
//app컴포넌트 가져오기 (기본값 한개일 경우)
import App from './App.js';
// 컴포넌트를 가져올때 (기본값 여러개) //책모듈 파트에 있음


//ReactDOM라이브러리의 render함수에 의해서 index.html의 태그들 중 id가 app인 요소에 추가
ReactDOM.render(
  <React.StrictMode>
    <h1>Just React</h1>
  </React.StrictMode>,document.querySelector('#app')
);

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,document.querySelector('#root')
);

