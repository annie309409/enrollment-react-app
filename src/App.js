import React, {useState} from 'react';
//enrollmenentForm 가져오기
import EnrollmentForm from "./components/enrollmentForm";

const App = ()=>{
    const [program,setProgram]=useState('UG');
    const [prgname,setPrgname] = useState('UnderGraduate(대학교)');
    const [usSeat,setUsSeat] = useState(60);
    const [pgSeat,setPgSeat] = useState(40);
    const handleChange = (e) => {
        setProgram(e.target.value);
        setPrgname(e.target.options[e.target.selectedIndex].text);
    };


    //바꿔줄 수 있는 함수를 넘겨야 함
    // 참가 가능 이원수를 변경하는 함수

    //프로그램별 참가인원 변경 함수
    const setUpdateSeats=(modifySeat)=>{
        if(program ==='PG') setPgSeat(modifySeat);
        else setUsSeat(modifySeat);
    };

    // 조건에따라 반환하는 함수를 설정했지만 삼항연산자가 훨씬 간단함
    // const currentSeat = ()=>{
    //     if(program =='PG') return pgSeat;
    //     else return  usSeat;
    // }

    return(
        <div className="app">
            <div className="programs">
                {/*그때마다 변경*/}
                {/*<label>학사 프로그램 참가가능 인원 수 : {currentSeat()}</label>*/}
                {/*<label>학사 프로그램 참가가능 인원 수 : {(usSeat>0)?(0,alert('더이상 신청할 수 없습니다')):usSeat}</label>*/}
                {/*<br/>*/}
                {/*<label>석사 프로그램 참가가능 인원 수 : {(pgSeat>0)?(0,alert('더이상 신청할 수 없습니다')):pgSeat}</label>*/}

                <label>학사 프로그램 참가가능 인원 수 : {usSeat}</label>
                <br/>
                <label>석사 프로그램 참가가능 인원 수 : {pgSeat}</label>
                <br/>
                <label htmlFor="sel">프로그램 종류: </label>
                {/* program의 이름으로 ug, pg가 들어감*/}
                <select name="sel" id="sel" className="appDropDowns" onChange={handleChange} value={program}>
                    <option value="UG">UnderGraduate(대학교)</option>
                    <option value="PG">PostGraduate(대학원)</option>
                </select>
            </div>
            {/*값이 다르게 들어갈땐 삼항연산자 사용*/}
            <EnrollmentForm chosenProgram={prgname} setUpdateSeats={setUpdateSeats} currentSeat ={(program ==='PG')?pgSeat:usSeat} />
        </div>
    );
}

// 컴포넌트로 작성하는 경우에는 반드시
// 기본 반환함수명이나 클래스명이 있어야 함
export default App;