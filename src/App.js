import React from 'react';

const App = ()=>{
    const ClickHandler = () => {
        alert('??');
    };
    return(
        <div>
            <button type='button' onClick={ClickHandler}>Click React</button>
        </div>
    );
}

export default App;