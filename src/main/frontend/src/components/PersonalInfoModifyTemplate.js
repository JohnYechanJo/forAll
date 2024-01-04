import { useState, useCallback } from "react";
import {Link} from "react-router-dom";
import "./Styles.css";
const PersonTemplate = () => {
    const [id, setId] = useState('');
    const [passwd, setPasswd] = useState('');

    const onChangeId = useCallback((e) => {
        setId(e.target.value);
    },[]);
    const onChangePw = useCallback((e) => {
        setPasswd(e.target.value);
    },[]);
    return (
        <div>
            <div>
                <input
                    placeholder="아이디 입력"
                    value={id}
                    
                />
                <input
                    placeholder="비밀번호 입력"
                    value={passwd}
                    onChange={onChangePw}
                />
            </div>
            <div>
                <footer className="footer">
                    <Link to="/personalInfoModify2">
                    <button className="button" style={{backgroundColor:"black"}}>확인</button>
                    </Link>
                </footer>
            </div>
        </div>
    )
}

export default PersonTemplate;