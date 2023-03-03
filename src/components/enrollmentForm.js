import React from 'react';
import '../App.css';
import {useState} from "react";

const EnrollmentForm = (props)=>{

    // 폼에 입력한 내용(이름/성)을 기억하기 위해 state형 변수선언
    // blur이벤트 발생 시 입력한 이름, 성은 firstname, lastname변수에 저장
    const [firstName,setFirstName]=useState("");
    const [lastName,setLastName]=useState("");

    // state형 변수에 저장된 이름, 성을 환영메세지와함께 조합
    const [welcome,setWelcome]=useState("");

    const HandleSubmit = (e) => {
        e.preventDefault();
        // state형 변수에 저장된 이름, 성을 환영메세지와함께 조합
        setWelcome(`welcome,${firstName} ${lastName}`);
        // 참여가능 인원수 감소 (parameter로 함수도 받아올 수 있음)
        props.setUpdateSeats(props.currentSeat-1);
    };
    return(
        <div>
            <form className="enrolForm" onSubmit={HandleSubmit}>
                <h1>{props.chosenProgram} 등록양식</h1>
                <div>
                    <label htmlFor="fname">First Name</label>
                    <input type="text" id="fname" onBlur={(e)=>{setFirstName(e.target.value)}}/>
                </div>
                <div>
                    <label htmlFor="lname">Last Name</label>
                    <input type="text" id="lname" onBlur={(e)=>{setLastName(e.target.value)}}/>
                </div>
                <div>
                    <button type='submit'> 등록하기</button>
                </div>
            </form>
            <label id="studentMsg" className="message">{welcome}</label>
        </div>
        
    );
}

export default  EnrollmentForm;