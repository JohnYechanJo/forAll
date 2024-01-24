import { useState, useCallback } from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import Alert from "../Alert";

const PlaceTemplate = () => {
    const id = sessionStorage.getItem("user_id");
    const [passwd, setPasswd] = useState('');
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [alertContent, setAlertContent] = useState("");

    const openAlert = (string) => {
        setAlertContent(string);
        setIsAlertOpen(true);
    };
    const onChangePw = useCallback((e) => {
        setPasswd(e.target.value);
    },[]);

    const checkPw = () => {
        if (passwd === "") openAlert("비밀번호를 입력해주세요");
        else{
            axios.get("/api/v1/members/"+id+"/"+passwd)
                .then(() => {
                    window.location.href = "/placeInfoModifyPage";
                }).catch(()=>{
                openAlert("비밀번호가 일치하지 않습니다");
            });
        }
    }
    return (
        <div>
            <div>
                <input
                    value={id}
                    readOnly={true}
                />
                <input
                    placeholder="비밀번호 입력"
                    value={passwd}
                    onChange={onChangePw}
                />
            </div>
            <div>
                    <button className="button" onClick={() => checkPw()}>확인</button>

            </div>
            <Alert isOpen={isAlertOpen} setIsOpen={setIsAlertOpen} content={alertContent} />
        </div>
    )
}

export default PlaceTemplate;