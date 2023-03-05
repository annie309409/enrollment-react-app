# Enrollment-react-app
+ react 16.14.0
+ react-dom 16.14.0


## 기본 설정 (react@16.14.0)
### 설치방법
1. 리액트와 리액트-돔 16버전을 설치한다.
```text
npm i react@16.14.0 react-dom@16.14.0
```

2. 웹팩을 설치한다.
```text
npm install --save-dev webpack
```

3. 웹팩 파일(webpack.config.js)을 만들고 아래의 내용을 추가해준다.
```js
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: "source-map",
    entry: "./src/index.js", //진입(시작) 파일
    output: {
        path: path.join(__dirname, "dist"), //번들파일 저장위치
        filename: "app.bundle.js" //지정하지 않으면 main.js
    },
    module: { //각 파일에 대한 세부적인 번들링 작업 정의
        rules: [{ test: /\.js$/, //확장자가 .js로 끝나는 파일에 대한 규칙정의
            exclude: /node_modules/, loader: "babel-loader" },
            // 그림파일에 대한 세부적 번들링작업 (이미지 규칙)
            {
                test: /\.(png|jpe?g|gif|svg|ico)$/i,
                use: [{ loader: "file-loader", },],},
        ]


    },
    devServer: {// npm start명령어로 서버 구동 시 필요한 관련 내용 설정
        static: path.join(__dirname, 'dist'),
        open: true, // 자동으로 브라우저 실행
        hot: true, // 수정사항 발생시 브라우저에 변경사항 즉시 반영
    },
    plugins: [
        new HtmlWebpackPlugin({
            // 빌드시 dist안에 index.html을 바로 생성하는 플러그인
            template: path.join(__dirname, "public", "index.html"),
        }),
    ],
};
```

4. 바벨을 설치한다.
```text
npm install --save-dev @babel/core
```

5. 바벨을 package.json에 설정해 준다.
```javascript
  "devDependencies": {
    "@babel/core": "^7.21.0",
    "@babel/preset-env": "^7.20.2",
    "@babel/preset-react": "^7.18.6",
    "webpack": "^5.75.0"
  }
```


6. 웹팩을 실행한다
```text
npm run build
```

7. 웹팩에서 발생한 index.html을 브라우저에서 직접 켜보고 만약 되지 않는다면 다음과 같이 경로를 수정한다. (/ 앞에 . 붙이기)
```html
<script defer="defer" src="./static/js/main.fd72c568.js"></script><link href="./static/css/main.46fda2c7.css" rel="stylesheet">
```




## 프로젝트 제작과정 
1. index.js 제작 (src 폴더내 위치)

```javascript
import React from 'react';
// 16버전에서 불러오는 방법
import ReactDOM from 'react-dom';
//app컴포넌트 가져오기 (기본값 한개일 경우)
import App from './App.js';

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
```
2. index.html 제작 (public 폴더내 위치)
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <title>enrollment app</title>
  </head>
  <body>

    <!--리액트 컴포넌트 접합부위 -->
    <div id="app"></div>
    <div id="root"></div>

  </body>
</html>

```

3. App.js제작 
```javascript
import React, {useState} from 'react';
//enrollmenentForm 가져오기
import EnrollmentForm from "./components/enrollmentForm";
import EnrolList from "./components/EnrolList";


const App = ()=>{
    const [program,setProgram]=useState('UG');
    const [prgname,setPrgname] = useState('학사과정');
    const [usSeat,setUsSeat] = useState(60);
    const [pgSeat,setPgSeat] = useState(40);

    //select 태그 안 요소가 선택되면 선택된 요소에따라 결과값을 세팅한다.
    const handleChange = (e) => {
        // 선택된 요소의 value값 세팅
        setProgram(e.target.value);
        //선택된 요소의 label에 있는 이름을 세팅
        setPrgname(e.target.nextSibling.innerHTML);
    };

    //학생 정보를 저장하는 변수 선언
    const [stuDetails, setStuDetails]= useState({});

    //프로그램별 참가인원 변경 함수
    const setUpdateSeats=(modifySeat)=>{
        if(program ==='PG') setPgSeat(modifySeat);
        else setUsSeat(modifySeat);
    };


    return(
        <div className="app">
            <div className="programs">
            <h3>프로그램 참가 등록양식</h3>
            <ul className="ulEnrol">
                <li onChange={handleChange} className="parentLabels">
                    <input type="radio" name="prg" value="UG" id="UG" defaultChecked/>
                    <label htmlFor="UG">학사과정</label>
                    <input type="radio" name="prg" value="PG" id="PG"/>
                    <label htmlFor="PG">석사과정</label>
                </li>
                <li><label className="parentLabels">{prgname}참가 가능 인원 : {(program==='PG')?pgSeat:usSeat}</label>  </li>
            </ul>
            
            {/*값이 다르게 들어갈땐 삼항연산자 사용*/}
            // 위에서 세팅했던 내용을 props로 넘김
            <EnrollmentForm chosenProgram={prgname} setUpdateSeats={setUpdateSeats} currentSeat ={(program ==='PG')?pgSeat:usSeat} setStuDetails={setStuDetails} />
            </div>
            <EnrolList stuDetails={stuDetails} setStuDetails={setStuDetails} />
        </div>
    );
}

// 컴포넌트로 작성하는 경우에는 반드시
// 기본 반환함수명이나 클래스명이 있어야 함
export default App;
```

4. 컴포넌트 제작 
+ 폼 컴포넌트 제작(enrollmentForm.js)
```javascript
import React from 'react';
import '../App.css';
import {useState} from "react";

const EnrollmentForm = (props)=>{

    // 폼에 입력한 내용(이름/성/이메일)을 기억하기 위해 state형 변수선언
    // onChange이벤트 발생 시 입력한 이름, 성,이메일은 firstName, lastName, email변수에 저장
    const [firstName,setFirstName]=useState("");
    const [lastName,setLastName]=useState("");
    const [email,setEmail]=useState("");

    // state형 변수에 저장된 이름, 성을 환영메세지와함께 조합
    const [welcome,setWelcome]=useState("welcome");
    let [msgCol,setmsgCol] = useState("message");

    const HandleSubmit = (e) => {
        e.preventDefault();
        // state형 변수에 저장된 이름, 성을 환영메세지와함께 조합
        setWelcome(`Welcome ! ${firstName} ${lastName} we send an email to ${email}`);

        // 참여가능 인원수 감소 (parameter로 함수도 받아올 수 있음)\
        if(props.currentSeat-1<0){
            props.setUpdateSeats(0);
            setmsgCol('warn');
            setWelcome('There are no seats anymore!');
        } else{
            props.setUpdateSeats(props.currentSeat-1);
            //등록완료된 학생정보에 사용할 key생성
            const rndKey = Math.floor(1000+Math.random()*9000);
            //생성한 key와 등록완료된 학생정보를 props에 저장
            let stud = {
                key:rndKey, fname:firstName, lname:lastName, program:props.chosenProgram, email:email
            };
            props.setStuDetails(stud);
        }
    };
    const handleInputChage = (setInput, e) => {
        setInput(e.target.value);
    };


    return(
        <div>
            <div>
                <form className="enrolForm" onSubmit={HandleSubmit}>
                    <ul className="ulEnrol">
                        <li>
                            <label htmlFor="FirstName"></label>
                            <input type="text" id="FirstName" name="firstName" className="inputFields" placeholder="first name"  value={firstName} onChange={e=>handleInputChage(setFirstName,e)}/>
                        </li>
                        <li>
                            <label htmlFor="LastName"></label>
                            <input type="text" id="LastName" name="lastName" className="inputFields" placeholder="last name"  value={lastName} onChange={e=>handleInputChage(setLastName,e)}/>
                        </li>
                        <li>
                            <label htmlFor="Email"></label>
                            <input type="email" id="Email" name="email" className="inputFields" placeholder="email addr"  value={email} onChange={e=>handleInputChage(setEmail,e)}/>
                        </li>
                        <li id="center-btn">
                            <button type="submit" id="btnEnrol" name="enrol" onClick={HandleSubmit}>제출</button>
                        </li>
                        <li>
                            <label id="studentMsg" className={msgCol}>{welcome}</label>
                        </li>
                    </ul>
                </form>
            </div>
        </div>
        
    );
}

export default  EnrollmentForm;

```

+ EnrolList.js 컴포넌트 제작
```javascript
import React,{useEffect} from 'react';
import '../EnrolList.css';
import {DetailsList} from '@fluentui/react/lib/DetailsList';

// 컬럼 정의시 사용했던 fieldName 사용
//이름 , 성, 과정, 이메일
const colums = [{
    key:'fname', name:'Firstname', fieldName:'fname', minWidth:90, isResizable:false
    },
    {
        key:'lname', name:'Lastname', fieldName:'lname', minWidth:90, isResizable:false
    },
    {
        key:'program', name:'과정종류', fieldName:'program', minWidth:90, isResizable:false
    },
    {
        key:'email', name:'eamil', fieldName:'eamil', minWidth:90, isResizable:false
    }];

let items =[];

const EnrolList = (props) => {
    //과정 등록학생 데이터가 추가될때마다 UI를 재 랜더링 하기위해
    // useEffect 리액트 훅 사용
    // useEffect: 컴포넌트
    // props 객체에 값이 존재할때 마다 detailList에 렌더링해서 화면에 표시
    useEffect(()=>{
        const curItemKey =  props.stuDetails.key;
        if(curItemKey) {
            items= [...items,props.stuDetails];
            props.setStuDetails({});
        }
    },[props])
    return (
            <div className="enrolList">
                //fluentui 활용
                <DetailsList items={items} colums={colums} />
            </div>
    )
}


export default  EnrolList;
```