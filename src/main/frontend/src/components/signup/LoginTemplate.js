import { useState, useCallback } from "react";
import "./LoginTemplate.css";
import {Link, useNavigate} from "react-router-dom";
import {user_role} from "../../utils/enums";
import axios from "axios";
import "../../components/Styles.css";
import Modal from "react-modal";
import Alert from "../Alert";
const LoginTemplate = () => {
    const navigate = useNavigate();
    const [id, setId] = useState('');
    const [passwd, setPasswd] = useState('');
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [alertContent, setAlertContent] = useState("");
    const onChangeId = useCallback((e) => {
        setId(e.target.value);
    },[]);
    const onChangePw = useCallback((e) => {
        setPasswd(e.target.value);
    },[]);
    const openAlert = (string) => {
        setAlertContent(string);
        setIsAlertOpen(true);
    }
    const logIn = () => {
        if (id === "") openAlert("아이디를 입력해주세요");
        else if(passwd === "") openAlert("비밀번호를 입력해주세요");
        else{
            axios.post("/api/v1/login",
                {
                    loginId: id,
                    loginPw: passwd,
                },
                {
                    headers:{
                        'Content-type': 'application/json',
                        'Accept': 'application/json'
                    }
                }
                ).then((res) => {
                sessionStorage.setItem("user_id", id);
                sessionStorage.setItem("name", res.data.name);
                sessionStorage.setItem("email", res.data.email);
                navigate('/');
            }).catch((res) => {
                openAlert("로그인에 실패했습니다");
            })
        }
    }
    return (
        <div style={{display:"flex",flexDirection:"column" , alignItems:"center",justifyContent:"center",padding:'1rem',gap:'4rem'}} >
            <div style={{display:"flex",flexDirection:"column", margin:"1rem",alignItems:"center",justifyContent:"center"}} >
                <input
                    placeholder="아이디 입력"
                    className="input"
                    value={id}
                    onChange={onChangeId}
                />
                <input
                    placeholder="비밀번호 입력"
                    className="input"
                    type="password"
                    value={passwd}
                    onChange={onChangePw}
                />
            </div>
            <div>
                <div style={{display:'flex',flexDirection:'column'}}>
                <button onClick={() => logIn()} style={{width:"21.875rem",height:'3.125rem',flexShrink:'0',backgroundColor:'#616161',marginBottom:'0.5rem'}} >로그인</button>
                <Link to="/signUp">
                    <button style={{width:"21.875rem",height:'3.125rem',flexShrink:'0',border:'1px solid #000',backgroundColor:'white'}}>회원가입</button>
                </Link>
                </div>
                <div  style={{
                color: "#B0B0B0",
                textAlign: "center",
                fontFeatureSettings: "'case' on", 
                fontSize: "0.9375rem",
                fontWeight:"500",
                lineHeight:"1.375rem",
                textDecorationLine:"underline",
            }}>
                <Link to="/searchId"><span style={{
                color: "#B0B0B0",
                textAlign: "center",
                fontFeatureSettings: "'case' on", 
                fontSize: "0.9375rem",
                fontWeight:"500",
                lineHeight:"1.375rem",
                textDecorationLine:"underline",
            }}>아이디 찾기</span></Link>
                <span style={{marginLeft:"0.69rem",marginRight:"0.69rem"}} >|</span>
                <Link to="/searchPw"><span style={{
                color: "#B0B0B0",
                textAlign: "center",
                fontFeatureSettings: "'case' on", 
                fontSize: "0.9375rem",
                fontWeight:"500",
                lineHeight:"1.375rem",
                textDecorationLine:"underline",
            }}>비밀번호 찾기</span></Link>
            </div>
            </div>
            
            <Alert isOpen={isAlertOpen} setIsOpen={setIsAlertOpen} content={alertContent} />
        </div>
    )
}

export default LoginTemplate;