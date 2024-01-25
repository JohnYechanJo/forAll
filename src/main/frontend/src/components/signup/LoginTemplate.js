import { useState, useCallback } from "react";
import "./LoginTemplate.css";
import {Link, useNavigate} from "react-router-dom";
import {user_role} from "../../utils/enums";
import axios from "axios";
import "../../components/Styles.css";
import Modal from "react-modal";
import Alert from "../Alert";
import { ModalStyles } from "../../components/ModalStyles";
const LoginTemplate = () => {
    const navigate = useNavigate();
    const [id, setId] = useState('');
    const [passwd, setPasswd] = useState('');
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [alertContent, setAlertContent] = useState("");
    const [isOpen, setIsOpen] = useState(false);
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
                setIsOpen(true);
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
            <Modal isOpen={isOpen} style={ModalStyles}>
                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50" fill="none">
                    <path
                        d="M22.0832 28.7503L17.5519 24.2191C17.17 23.8371 16.7012 23.6462 16.1457 23.6462C15.5901 23.6462 15.104 23.8545 14.6873 24.2712C14.3054 24.6531 14.1144 25.1392 14.1144 25.7295C14.1144 26.3198 14.3054 26.8059 14.6873 27.1878L20.6248 33.1253C21.0068 33.5073 21.4929 33.6982 22.0832 33.6982C22.6735 33.6982 23.1596 33.5073 23.5415 33.1253L35.3644 21.3024C35.7464 20.9205 35.9373 20.4517 35.9373 19.8962C35.9373 19.3406 35.729 18.8545 35.3123 18.4378C34.9304 18.0559 34.4443 17.8649 33.854 17.8649C33.2637 17.8649 32.7776 18.0559 32.3957 18.4378L22.0832 28.7503ZM24.9998 45.8337C22.1179 45.8337 19.4096 45.2864 16.8748 44.192C14.3401 43.0989 12.1353 41.6149 10.2603 39.7399C8.38525 37.8649 6.90123 35.66 5.80817 33.1253C4.71373 30.5906 4.1665 27.8823 4.1665 25.0003C4.1665 22.1184 4.71373 19.41 5.80817 16.8753C6.90123 14.3406 8.38525 12.1357 10.2603 10.2607C12.1353 8.38574 14.3401 6.90102 16.8748 5.80658C19.4096 4.71352 22.1179 4.16699 24.9998 4.16699C27.8818 4.16699 30.5901 4.71352 33.1248 5.80658C35.6596 6.90102 37.8644 8.38574 39.7394 10.2607C41.6144 12.1357 43.0984 14.3406 44.1915 16.8753C45.2859 19.41 45.8332 22.1184 45.8332 25.0003C45.8332 27.8823 45.2859 30.5906 44.1915 33.1253C43.0984 35.66 41.6144 37.8649 39.7394 39.7399C37.8644 41.6149 35.6596 43.0989 33.1248 44.192C30.5901 45.2864 27.8818 45.8337 24.9998 45.8337Z"
                        fill="black"/>
                </svg>
                <p style={{color: "#000", fontFamily:"Noto Sans KR", fontSize:"0.9375rem",
                    fontStyle: "normal", fontWeight: "400", lineHeight: "normal"}}>아이디, 비밀번호를 확인해 주세요!</p>
                <hr/>
                <button onClick={()=>setIsOpen(false)} style={{width:'100%',height:'3.125rem',backgroundColor:'white',border:'none'}} >확인</button>
            </Modal>
            <Alert isOpen={isAlertOpen} setIsOpen={setIsAlertOpen} content={alertContent} />
        </div>
    )
}

export default LoginTemplate;