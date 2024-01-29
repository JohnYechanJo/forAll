import Header from "../components/home/Header";
import SearchPwTemplate from "../components/SearchPwTemplate";
import {useState} from "react";
import * as regularExpressions from "../utils/regularExpressions";
import axios from "axios";
import {Link} from "react-router-dom";
import Alert from "../components/Alert";

const SearchPwPage = () => {
    const [pw, setPw] = useState("");
    const [id, setId] = useState('');
    const [phone, setPhone] = useState('');
    const [cerifiedNum, setCerifiedNum] = useState('');
    const [isSendCerifiedNum, setIsSendCerifiedNum] = useState(false);
    const [isCerified, setIsCerified] = useState(false);
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [alertContent, setAlertContent] = useState("");

    const openAlert = (string) => {
        setAlertContent(string);
        setIsAlertOpen(true);
    }
    const sendCerifiedNum = () => {
        const phoneRule = regularExpressions.phoneNum;
        if (!phoneRule.test(phone)){

            openAlert("전화번호 형식을 확인해주세요.");


        }
        else{
            axios.post("/api/v1/send-one/"+phone)
                .then((response) => {

                    openAlert("인증번호를 발송했습니다.");
                    setIsSendCerifiedNum(true);
                }).catch((response) => {
                openAlert("인증번호를 발송하지 못했습니다.");


            });
        }
    };
    const checkCerifiedNum = () => {
        axios.get("/api/v1/findPw/"+id+"/"+phone+"/"+cerifiedNum)
            .then((response) => {
                openAlert("인증에 성공했습니다!");
                setPw(response.data);
                setIsCerified(true);
            }).catch((response) => {
            openAlert("인증에 실패했거나, 아이디와 핸드폰 번호에 해당하는 계정이 존재하지 않습니다.");
        });
    };

    return (
        <div>

            <SearchPwTemplate
                pw={pw}
                setId={setId}
                setPhone={setPhone}
                setCerifiedNum={setCerifiedNum}
                isSendCerifiedNum={isSendCerifiedNum}
                isCerified={isCerified}
                checkCerifiedNum={checkCerifiedNum}
                sendCerifiedNum={sendCerifiedNum}
            />

            <Alert isOpen={isAlertOpen} setIsOpen={setIsAlertOpen} content={alertContent} />
        </div>
    )
}

export default  SearchPwPage;