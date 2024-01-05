import { Link, useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import PersonalInfoInputTemplate from "../components/PersonalInfoInputTemplate";
import { useEffect, useState } from "react";
import { Gender } from "../utils/enums";
import axios from "axios";
import useDidMountEffect from "../utils/hooks/useDidMountEffect";
import "../components/Styles.css";
const PersonalModify2 = () => {
    const location = useLocation();
    const data = { ...location.state };
    const birdDayList = data.birthDay != null ? data.birthDay.split('/') : "//".split("/");
    const navigate = useNavigate();
    const [id, setId] = useState(data.loginId);
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

    const [isCheckDuplicatedId, setIsCheckDuplicatedId] = useState();
    const [isCheckDuplicatedEmail, setIsCheckDuplicatedEmail] = useState();
    const [isCheckPw, setIsCheckPw] = useState();

    const checkDuplicatedId = () => {
        axios.get("/api/v1/members/checkId/" + id)
            .then((response) => {
                setIsCheckDuplicatedId(true);
            }).catch((response) => {
                setIsCheckDuplicatedId(false);
            });

    };
    const checkDuplicatedEmail = () => {
        axios.get("/api/v1/members/checkEmail/" + email)
            .then((response) => {
                setIsCheckDuplicatedEmail(true);
            }).catch((response) => {
                setIsCheckDuplicatedEmail(false);
            });

    };
    useDidMountEffect(() => {
        setIsCheckPw(pw === pwCheck);
    }, [pw, pwCheck]);

    useEffect(() => {
        setBirthDay(year + '/' + month + '/' + day);
    }, [year, month, day]);
    const handleButton = () => {
        //Todo : 아이디, 이메일 중복 여부 확인, 비밀번호 확인 여부, 휴대폰 인증 여부, 약관 동의 여부 등 확인
        if (id === "") {
            alert("아이디는 필수 입력 사항입니다");
        }
        // else if (pw === "") {
        //     alert("비밀번호는 필수 입력 사항입니다");
        // } else if (name === "") {
        //     alert("이름은 필수 입력 사항입니다");
        // } else if (email === "") {
        //     alert("이메일은 필수 입력 사항입니다");
        // } else if (phone === "") {
        //     alert("휴대폰 번호는 필수 입력 사항입니다");
        // } else if ((year === "") || (month === "") || (day === "")) {
        //     alert("생년월일은 필수 입력 사항입니다");
        // }
        // else if (isCheckDuplicatedId !== true) {
        //     alert("아이디 중복확인이 필요합니다");
        // } else if (isCheckPw !== true) {
        //     alert("비밀번호가 일치하지 않습니다");
        // }
        // else if (isCheckDuplicatedEmail !== true) {
        //     alert("이메일 중복확인이 필요합니다");
        // }
        else {
            axios.put("/api/v1/members", //이 부분이 불명확해서 수정이 필요할 수 있음
                {
                    loginId: id,
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
                navigate('/signUpComplete', {
                    state: {
                        id: id,
                        name: name,
                        email: email,
                        role: data.role
                    }
                });
            }).catch((response) => {
                navigate('/error')
            })
        }



    };
    return (
        <div>
            <Header PageName={"개인정보수정"} />
            <PersonalInfoInputTemplate
                id={id}
                name={name}
                phone={phone}
                email={email}
                year={year}
                month={month}
                day={day}
                gender={gender}
                setId={setId}
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
                checkDuplicatedId={checkDuplicatedId}
                checkDuplicatedEmail={checkDuplicatedEmail}
                isCheckedDuplicatedId={isCheckDuplicatedId}
                isCheckedDuplicatedEmail={isCheckDuplicatedEmail}
                isCheckPw={isCheckPw}
            />
            <Link to="/personalInfoModify">
                <button>뒤로</button>
            </Link>
            <footer className="footer">
                <button onClick={() => handleButton()} className="button" style={{ backgroundColor: "black"}}>수정하기</button>
            </footer>
        </div>
    )
};

export default PersonalModify2;