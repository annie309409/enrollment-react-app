import React, {useState} from 'react';
//enrollmenentForm 가져오기
import EnrollmentForm from "./components/enrollmentForm";

const App = ()=>{
    const [program,setProgram]=useState('UG');
    const [prgname,setPrgname] = useState('UnderGraduate(대학교)');
    const [seats,setSeats] = useState(100);
    const handleChange = (e) => {
        setProgram(e.target.value);
        setPrgname(e.target.options[e.target.selectedIndex].text);
    };


    //바꿔줄 수 있는 함수를 넘겨야 함
    // 참가 가능 이원수를 변경하는 함수
    const setUpdateSeats=(modifySeat)=>{
        setSeats(modifySeat);
    };

    return(
        <div className="app">
            <div className="programs">
                <label>프로그램 참가가능 인원 수 : {seats}</label>
                <br/>
                <label htmlFor="sel">프로그램 종류: </label>
                {/* program의 이름으로 ug, pg가 들어감*/}
                <select name="sel" id="sel" className="appDropDowns" onChange={handleChange} value={program}>
                    <option value="UG">UnderGraduate(대학교)</option>
                    <option value="PG">PostGraduate(대학원)</option>
                </select>
            </div>
            <EnrollmentForm chosenProgram={prgname} cSeat={seats} setUpdateSeats={setUpdateSeats} />
        </div>
    );
}

// 컴포넌트로 작성하는 경우에는 반드시
// 기본 반환함수명이나 클래스명이 있어야 함
export default App;