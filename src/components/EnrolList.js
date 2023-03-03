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
//
// for (let i=1; i<=5 ; ++i){
//     let data = {key:i, fname:'fname', lname:'lname', program:'program', email:'eamil'+i };
//     items.push(data);
// }


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
                <DetailsList items={items} colums={colums} />
            </div>
    )
}


export default  EnrolList;