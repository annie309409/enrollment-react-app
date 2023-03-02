import React from 'react';
import '../App.css';

const EnrollmentForm = ()=>{
    return(
        <div>
            <form>
                <h1>대학생 등록양식</h1>
                <div>
                    <label htmlFor="fname">First Name</label>
                    <input type="text" id="fname"/>
                </div>
                <div>
                    <label htmlFor="lname">Last Name</label>
                    <input type="text" id="lname"/>
                </div>
                <div>
                    <button type='submit'> 등록하기</button>
                </div>
            </form>
        </div>
        
    );
}

export default  EnrollmentForm;