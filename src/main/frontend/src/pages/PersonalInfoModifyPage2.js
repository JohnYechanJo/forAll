import { Link, useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import PersonalInfoModifyInputTemplate from "../components/PersonalInfoModifyInputTemplate";
import { useEffect, useState } from "react";
import { Gender } from "../utils/enums";
import axios from "axios";
import useDidMountEffect from "../utils/hooks/useDidMountEffect";
import "../components/Styles.css";
import UseTermsTemplate from "../components/UseTermsTemplate";
import * as regularExpressions from "../utils/regularExpressions";
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
    useDidMountEffect(() => {
        setIsCheckPw(pw === pwCheck);
    }, [pw, pwCheck]);

    useEffect(() => {
        setBirthDay(year + '/' + month + '/' + day);
    }, [year, month, day]);
    const sendCerifiedNum = () => {
        const phoneRule = regularExpressions.phoneNum;
        if (! phoneRule.test(phone)){
            alert("전화번호 형식을 확인해주세요");
        }
        else{
            axios.post("/api/v1/send-one/"+phone)
                .then((response) => {
                    alert("인증번호를 발송했습니다");
                }).catch((response) => {
                alert("인증번호를 발송하지 못했습니다");
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
        //Todo : 아이디, 이메일 중복 여부 확인, 비밀번호 확인 여부, 휴대폰 인증 여부, 약관 동의 여부 등 확인
        if (pw === "") {
             alert("비밀번호는 필수 입력 사항입니다");
        } else if (name === "") {
             alert("이름은 필수 입력 사항입니다");
        } else if (email === "") {
             alert("이메일은 필수 입력 사항입니다");
        } else if (phone === "") {
             alert("휴대폰 번호는 필수 입력 사항입니다");
        } else if ((year === "") || (month === "") || (day === "")) {
             alert("생년월일은 필수 입력 사항입니다");
        } else if (isCheckPw !== true) {
             alert("비밀번호가 일치하지 않습니다");
        } else if (isCheckDuplicatedEmail !== true) {
            alert("이메일 중복확인이 필요합니다");
        } else if (isPhoneCerified !== true){
            alert("휴대폰 인증이 필요합니다");
        } else if (isUseTermsChecked !== true){
            alert("약관 동의가 필요합니다")
        }
        else {
            axios.put("/api/v1/members",
                {
                    loginId: data.loginId,
                    loginPw: pw,
                    name: name,
                    birthDay: birthDay,
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
            <Link to="/personalInfoModify">
                <button>뒤로</button>
            </Link>
            <UseTermsTemplate
                setIsUseTermsChecked={setIsUseTermsChecked}
            />
            <button>탈퇴하기</button>
            <footer className="footer">
                <button onClick={() => handleButton()} className="button" style={{ backgroundColor: "black"}}>수정하기</button>
            </footer>
        </div>
    )
};

export default PersonalModify2;