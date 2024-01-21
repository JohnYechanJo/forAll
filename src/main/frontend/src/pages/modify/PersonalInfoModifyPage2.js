import { Link, useLocation, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import PersonalInfoModifyInputTemplate from "../../components/modify/PersonalInfoModifyInputTemplate";
import { useEffect, useState } from "react";
import { Gender } from "../../utils/enums";
import axios from "axios";
import useDidMountEffect from "../../utils/hooks/useDidMountEffect";
import "../../components/Styles.css";
import UseTermsTemplate from "../../components/signup/UseTermsTemplate";
import * as regularExpressions from "../../utils/regularExpressions";
import Alert from "../../components/Alert";
const PersonalModify2 = () => {
    const location = useLocation();
    const data = { ...location.state };
    const birdDayList = data.birthday != null ? data.birthday.split('/') : "//".split("/");
    const navigate = useNavigate();
    const [pw, setPw] = useState('');
    const [pwCheck, setPwCheck] = useState('');
    const [name, setName] = useState(data.name);
    const [email, setEmail] = useState(data.email);
    const [phone, setPhone] = useState(data.phoneNum);
    const [cerifiedNum, setCerifiedNum] = useState('');
    const [birthDay, setBirthDay] = useState(data.birthDay);
    const [year, setYear] = useState(birdDayList[0]);
    const [month, setMonth] = useState(birdDayList[1]);
    const [day, setDay] = useState(birdDayList[2]);
    const [gender, setGender] = useState(data.gender);
    const [isCheckDuplicatedEmail, setIsCheckDuplicatedEmail] = useState();
    const [isCheckPw, setIsCheckPw] = useState();
    const [isUseTermsChecked, setIsUseTermsChecked] = useState(false);
    const [isPhoneCerified, setIsPhoneCerified] = useState(false);
    const [isAllChecked, setIsAllChecked] = useState(false);
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [alertContent, setAlertContent] = useState("");

    const openAlert = (string) => {
        setAlertContent(string);
        setIsAlertOpen(true);
    };
    useDidMountEffect(() => {
        setIsCheckPw(pw === pwCheck);
    }, [pw, pwCheck]);

    useEffect(() => {
        setBirthDay(year + '/' + month + '/' + day);
    }, [year, month, day]);
    const sendCerifiedNum = () => {
        const phoneRule = regularExpressions.phoneNum;
        if (! phoneRule.test(phone)){
            openAlert("전화번호 형식을 확인해주세요");
        }
        else{
            axios.post("/api/v1/send-one/"+phone)
                .then((response) => {
                    openAlert("인증번호를 발송했습니다");
                }).catch((response) => {
                openAlert("인증번호를 발송하지 못했습니다");
            });
        }
    };
    const checkCerifiedNum = () => {
        axios.get("/api/v1/checkSms/"+phone+"/"+cerifiedNum)
            .then((response) => {
                setIsPhoneCerified(true);
            }).catch((response) => {
            setIsPhoneCerified(false);
        });
    };
    const handleButton = () => {
        if (pw === "") {
            openAlert("비밀번호는 필수 입력 사항입니다");
        } else if (name === "") {
            openAlert("이름은 필수 입력 사항입니다");
        } else if (email === "") {
            openAlert("이메일은 필수 입력 사항입니다");
        } else if (phone === "") {
            openAlert("휴대폰 번호는 필수 입력 사항입니다");
        } else if ((year === "") || (month === "") || (day === "")) {
            openAlert("생년월일은 필수 입력 사항입니다");
        } else if (isCheckPw !== true) {
            openAlert("비밀번호가 일치하지 않습니다");
        } else if (isCheckDuplicatedEmail !== true) {
            openAlert("이메일 중복확인이 필요합니다");
        } else if (isPhoneCerified !== true){
            openAlert("휴대폰 인증이 필요합니다");
        } else if (isUseTermsChecked !== true){
            openAlert("약관 동의가 필요합니다")
        }
        else {
            axios.put("/api/v1/members",
                {
                    loginId: data.loginId,
                    loginPw: pw,
                    name: name,
                    birthday: birthDay,
                    gender: gender,
                    email: email,
                    phoneNum: phone,
                },
                {
                    headers: {
                        'Content-type': 'application/json',
                        'Accept': 'application/json'
                    }
                }
            ).then((response) => {
                navigate('/modifyComplete');
            }).catch((response) => {
                navigate('/error')
            })
        }



    };
    return (
        <div>
            <Header PageName={"개인정보수정"} />
            <PersonalInfoModifyInputTemplate
                name={name}
                phone={phone}
                email={email}
                year={year}
                month={month}
                day={day}
                gender={gender}
                cerifiedNum={cerifiedNum}
                setPw={setPw}
                setPwCheck={setPwCheck}
                setName={setName}
                setEmail={setEmail}
                setPhone={setPhone}
                setCerifiedNum={setCerifiedNum}
                setYear={setYear}
                setMonth={setMonth}
                setDay={setDay}
                setGender={setGender}
                sendCerifiedNum={sendCerifiedNum}
                isCheckedDuplicatedEmail={isCheckDuplicatedEmail}
                setIsCheckedDuplicatedEmail={setIsCheckDuplicatedEmail}
                isCheckPw={isCheckPw}
                isPhoneCerified={isPhoneCerified}
                setIsPhoneCerified={setIsPhoneCerified}
            />
            <UseTermsTemplate
                setIsUseTermsChecked={setIsUseTermsChecked}
            />
            <button>탈퇴하기</button>
            <footer className="footer">
                <button onClick={() => handleButton()} className="button" style={{ backgroundColor: "black"}}>수정하기</button>
            </footer>
            <Alert isOpen={isAlertOpen} setIsOpen={setIsAlertOpen} content={alertContent} />
        </div>
    )
};

export default PersonalModify2;