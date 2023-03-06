import React, {useState} from 'react';
//enrollmenentForm 가져오기
import EnrollmentForm from "./components/enrollmentForm";
import EnrolList from "./components/EnrolList";


const App = ()=>{
    const [program,setProgram]=useState('UG');
    const [prgname,setPrgname] = useState('학사과정');
    const [usSeat,setUsSeat] = useState(60);
    const [pgSeat,setPgSeat] = useState(40);


    //학생 정보를 저장하는 변수 선언
    const [stuDetails, setStuDetails]= useState({});


    // 작업종류 지정
    const [action,setAction] = useState();
    // 등록 정보 키값 저장
    const [selItemKey,setSelItemKey] = useState();



    const handleChange = (e) => {
        setProgram(e.target.value);
        setPrgname(e.target.nextSibling.innerHTML);
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


    // 작업종류, 키 설정 함수
    const handleItemSelection=(action,key)=>{
        setAction(action);
        setSelItemKey(key);
    }

    //등록 학생 삭제시 남은 자리 복원
    const restore=(pgm)=>{
        pgm === '학사과정' ? setUsSeat(usSeat+1): setPgSeat(pgSeat+1);
        setAction('');
    }

    return(
        <div className="app">
            <div className="programs">
            {/*    /!*그때마다 변경*!/*/}
            {/*    /!*<label>학사 프로그램 참가가능 인원 수 : {currentSeat()}</label>*!/*/}
            {/*    /!*<label>학사 프로그램 참가가능 인원 수 : {(usSeat>0)?(0,alert('더이상 신청할 수 없습니다')):usSeat}</label>*!/*/}
            {/*    /!*<br/>*!/*/}
            {/*    /!*<label>석사 프로그램 참가가능 인원 수 : {(pgSeat>0)?(0,alert('더이상 신청할 수 없습니다')):pgSeat}</label>*!/*/}

            {/*    <label>학사 프로그램 참가가능 인원 수 : {usSeat}</label>*/}
            {/*    <br/>*/}
            {/*    <label>석사 프로그램 참가가능 인원 수 : {pgSeat}</label>*/}
            {/*    <br/>*/}
            {/*    <label htmlFor="sel">프로그램 종류: </label>*/}
            {/*    /!* program의 이름으로 ug, pg가 들어감*!/*/}
            {/*    <select name="sel" id="sel" className="appDropDowns" onChange={handleChange} value={program}>*/}
            {/*        <option value="UG">UnderGraduate(대학교)</option>*/}
            {/*        <option value="PG">PostGraduate(대학원)</option>*/}
            {/*    </select>*/}
            {/*</div>*/}
            
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
            <EnrollmentForm chosenProgram={prgname} setUpdateSeats={setUpdateSeats} currentSeat ={(program ==='PG')?pgSeat:usSeat} setStuDetails={setStuDetails} handleItemSelection={handleItemSelection} />
            </div>
            <EnrolList stuDetails={stuDetails} setStuDetails={setStuDetails}
            action={action} selItemKey={selItemKey} restore={restore} />
        </div>
    );
}

// 컴포넌트로 작성하는 경우에는 반드시
// 기본 반환함수명이나 클래스명이 있어야 함
export default App;