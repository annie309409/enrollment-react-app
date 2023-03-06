import React,{useEffect} from 'react';
import '../EnrolList.css';
import {DetailsList} from '@fluentui/react/lib/DetailsList';

// 컬럼 정의시 사용했던 fieldName 사용
//이름 , 성, 과정, 이메일
// 현재컬럼 앞 뒤로 수정/삭제버튼 추가
const colums = [
    {key: 'edit', name:'수정', fieldName: "edit", maxWidth: 50, resizableColumns:false},
    {
    key:'fname', name:'Firstname', fieldName:'fname', maxWidth:20, resizableColumns:false
    },
    {
        key:'lname', name:'Lastname', fieldName:'lname', maxWidth:90, resizableColumns:false
    },
    {
        key:'program', name:'과정종류', fieldName:'program', maxWidth:90, resizableColumns:false
    },
    {
        key:'email', name:'eamil', fieldName:'eamil', maxWidth:150, resizableColumns:false
    },
    {key: 'delete', name:'삭제', fieldName: "delete", maxWidth: 50, resizableColumns:false}
    ];

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

        //삭제 기능 수행
        if(props.action === 'delete'){
           //삭제 대상 아이템을 키로 가져옴
            const deleteItem = items.filter(
                (item) => item.key === props.selItemKey
            )[0];

            //삭제대상 아이템을 제외하고 다시 items 객체 생성
            items= items.filter(f=>f!==deleteItem);

            //참가가능 인원수 복구
            props.restore(deleteItem.program);
        }
    },[props])
    return (
            <div className="enrolList">
                <DetailsList items={items} colums={colums} />
            </div>
    )
}


export default  EnrolList;