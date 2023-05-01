import { useRef, useState } from 'react';

const Form1 = () => {
    const txt1R = useRef();

    const [msgTag, setMsgTag] = useState();

    const formCheck = () => {
        setMsgTag( <p>이름은 {txt1R.current.value} 입니다. </p>); 
    }


    return(
        <>
            <form>
                <p>
                    <label>이름 : </label> 
                    <input ref={txt1R} type="text" name="txt1" id="txt1" palceholder="이름 입력" />
                </p>
                <p>
                    <input className="button" type="button" value="확인" onClick={formCheck} />
                </p>

            </form>

            <div id = "msg">
                {msgTag}
            </div>
        </>
    );
}
export default Form1;