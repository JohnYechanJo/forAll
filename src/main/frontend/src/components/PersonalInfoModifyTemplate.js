import { useState, useCallback } from "react";
import {Link, useNavigate} from "react-router-dom";
import "./Styles.css";
import axios from "axios";
const PersonTemplate = () => {
    const navigate = useNavigate();
    const id = sessionStorage.getItem("user_id");
    const [passwd, setPasswd] = useState('');

    const onChangePw = useCallback((e) => {
        setPasswd(e.target.value);
    },[]);

    const checkPw = () => {
        if (passwd === "") alert("비밀번호를 입력해주세요");
        else{
            axios.get("/api/v1/members/"+id+"/"+passwd)
                .then((res) => {
                    navigate("/personalInfoModify2",{
                        state: res.data
                    })
                }).catch(()=>{
                alert("비밀번호가 일치하지 않습니다");
            });
        }
    }
    return (
        <div>
            <div>
                <input
                    value={id}
                    disabled={true}
                />
                <input
                    placeholder="비밀번호 입력"
                    value={passwd}
                    onChange={onChangePw}
                />
            </div>
            <div>
                <footer className="footer">
                    <button className="button" style={{backgroundColor:"black"}} onClick={() => checkPw()}>확인</button>
                </footer>
            </div>
        </div>
    )
}

export default PersonTemplate;