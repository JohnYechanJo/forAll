import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import PersonalInfoModifyInputTemplate from "../../components/modify/PersonalInfoModifyInputTemplate";
import { useEffect, useState } from "react";
import axios from "axios";
import useDidMountEffect from "../../utils/hooks/useDidMountEffect";
import "../../components/Styles.css";
import UseTermsTemplate from "../../components/signup/UseTermsTemplate";
import * as regularExpressions from "../../utils/regularExpressions";
import Alert from "../../components/Alert";
const PersonalModify = () => {
    const navigate = useNavigate();
    const [pw, setPw] = useState('');
    const [pwCheck, setPwCheck] = useState('');
    const [name, setName] = useState(sessionStorage.getItem("name"));
    const [email, setEmail] = useState(sessionStorage.getItem("email"));
    const [phone, setPhone] = useState("");
    const [cerifiedNum, setCerifiedNum] = useState('');
    const [birthDay, setBirthDay] = useState("");
    const [year, setYear] = useState('');
    const [month, setMonth] = useState('');
    const [day, setDay] = useState('');
    const [gender, setGender] = useState('');
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
        if (!phoneRule.test(phone)) {
            openAlert("전화번호 형식을 확인해주세요");
        }
        else {
            axios.post("/api/v1/send-one/" + phone)
                .then((response) => {
                    openAlert("인증번호를 발송했습니다");
                }).catch((response) => {
                openAlert("인증번호를 발송하지 못했습니다");
            });
        }
    };
    const checkCerifiedNum = () => {
        axios.get("/api/v1/checkSms/" + phone + "/" + cerifiedNum)
            .then((response) => {
                setIsPhoneCerified(true);
            }).catch((response) => {
            setIsPhoneCerified(false);
        });
    };
    useEffect(() => {
        const id = sessionStorage.getItem("user_id");
        axios.get("/api/v1/members/user/" + id)
            .then((res) => {
                setPhone(res.data.phoneNum);
                setYear(res.data.birthday.split('/')[0]);
                setMonth(res.data.birthday.split('/')[1]);
                setDay(res.data.birthday.split('/')[2]);
                setGender(res.data.gender);
                console.log(res.data);
            }).catch((res) => {
            openAlert("회원 정보를 불러오는데 실패했습니다");
        })
    }, []);

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
        } else if (isPhoneCerified !== true) {
            openAlert("휴대폰 인증이 필요합니다");
        } else if (isUseTermsChecked !== true) {
            openAlert("약관 동의가 필요합니다")
        }
        else {
            axios.put("/api/v1/members",
                {
                    loginId: sessionStorage.getItem("user_id"),
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
                navigate('/profileModify');
            }).catch((response) => {
                navigate('/error')
            })
        }
    };
    return (
        <div>
            <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "2.5rem",
                marginLeft: "1rem",
                marginRight: "1rem",
            }}>
                <div style={{
                    textAlign: "center",
                    fontSize: "0.9375rem",
                    lineHeight: "1.375rem",
                    fontWeight: "400",
                    letterSpacing: "-0.0255rem",
                }}>
                    <div style={{ marginTop: '2.75rem', fontSize: '0.9375rem' }} >1.개인 정보</div>
                </div>
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
            </div>
            <div style={{ display: 'flex', width: '100%', margin: '0px', marginTop: '4rem' }}>
                <button style={{ marginLeft: 'auto', backgroundColor: "#FF4F4F", width: '50%', bottom: '0', height: '3.125rem', color: 'white', border: 'none', lineHeight: '1.875rem', textAlign: 'center' }}
                        onClick={() => navigate('/')}
                >
                    이전</button>
                <button style={{ marginLeft: 'auto', backgroundColor: "#525252", width: '50%', bottom: '0', height: '3.125rem', color: 'white', border: 'none', lineHeight: '1.875rem', textAlign: 'center' }}
                        onClick={() => handleButton()}
                >다음</button>
            </div>

            <Alert isOpen={isAlertOpen} setIsOpen={setIsAlertOpen} content={alertContent} />
        </div>
    )
};

export default PersonalModify;