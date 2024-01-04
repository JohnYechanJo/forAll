import {Link, useLocation, useNavigate} from "react-router-dom";
import Header from "../components/Header";
import PersonalInfoInputTemplate from "../components/PersonalInfoInputTemplate";
import UseTermsTemplate from "../components/UseTermsTemplate";
import {useEffect, useState} from "react";
import {Gender} from "../utils/enums";
import axios from "axios";
import useDidMountEffect from "../utils/hooks/useDidMountEffect";
import * as regularExpressions from "../utils/regularExpressions";
const SignUpPage2 = () => {
    const location = useLocation();
    const data = {...location.state};
    const navigate = useNavigate();
    const [id, setId] = useState('');
    const [pw, setPw] = useState('');
    const [pwCheck, setPwCheck] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [cerifiedNum, setCerifiedNum] = useState('');
    const [birthDay, setBirthDay] = useState('');
    const [year, setYear] = useState("");
    const [month, setMonth] = useState("");
    const [day, setDay] = useState("");
    const [gender, setGender] = useState("");

    const [isCheckDuplicatedId, setIsCheckDuplicatedId] = useState();
    const [isCheckDuplicatedEmail, setIsCheckDuplicatedEmail] = useState();
    const [isCheckPw, setIsCheckPw] = useState();
    const [isPhoneCerified, setIsPhoneCerified] = useState();

    const checkDuplicatedId = () => {
        axios.get("/api/v1/members/checkId/"+id)
            .then((response) => {
                setIsCheckDuplicatedId(true);
            }).catch((response) => {
                setIsCheckDuplicatedId(false);
        });

    };
    const checkDuplicatedEmail = () => {
        const emailRule = regularExpressions.email;
        if (!emailRule.test(email)){
            alert("이메일 형식을 확인해주세요");
        }else{
            axios.get("/api/v1/members/checkEmail/"+email)
                .then((response) => {
                    setIsCheckDuplicatedEmail(true);
                }).catch((response) => {
                setIsCheckDuplicatedEmail(false);
            });
        }


    };

    const sendCerifiedNum = () => {
        const phoneRule = regularExpressions.phoneNum;
        if (! phoneRule.test(phone)){
            alert("전화번호 형식을 확인해주세요")
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

    useDidMountEffect(() => {
        setIsCheckPw(pw === pwCheck);
    }, [pw,pwCheck]);

    useEffect(() => {
        setBirthDay(year+'/'+month+'/'+day);
    }, [year, month, day]);

    useEffect(() => {
        console.log(gender);
    }, [gender]);
    const handleButton = () => {
        //Todo : 아이디, 이메일 중복 여부 확인, 비밀번호 확인 여부, 휴대폰 인증 여부, 약관 동의 여부 등 확인
        if (id === ""){
            alert("아이디는 필수 입력 사항입니다");
        }else if(pw === ""){
            alert("비밀번호는 필수 입력 사항입니다");
        }else if(name === ""){
            alert("이름은 필수 입력 사항입니다");
        }else if(email === ""){
            alert("이메일은 필수 입력 사항입니다");
        }else if(phone === ""){
            alert("휴대폰 번호는 필수 입력 사항입니다");
        }else if((year === "")||(month === "")||(day === "")){
            alert("생년월일은 필수 입력 사항입니다");
        }
        else if(isCheckDuplicatedId !== true) {
            alert("아이디 중복확인이 필요합니다");
        }else if(isCheckPw !== true){
            alert("비밀번호가 일치하지 않습니다");
        }
        else if (isCheckDuplicatedEmail !== true){
            alert("이메일 중복확인이 필요합니다");
        }
        else if (isPhoneCerified !== true){
            alert("휴대폰 인증이 필요합니다");
        }
        else{
            axios.post("/api/v1/members",
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
                    headers:{
                        'Content-type': 'application/json',
                        'Accept': 'application/json'
                    }
                }
            ).then((response) => {
                navigate('/signUpComplete',{
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
            <Header PageName={"02.정보입력"}/>
            <PersonalInfoInputTemplate
                pw = {pw}
                role={data.role}
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
                sendCerifiedNum={sendCerifiedNum}
                checkCerifiedNum={checkCerifiedNum}
                isPhoneCerified={isPhoneCerified}
                gender = {gender}
            />
            <UseTermsTemplate />
            <Link to="/signUp">
                <p>뒤로</p>
            </Link>
            <button
                onClick={()=>handleButton()}
            >다음</button>
        </div>
    )
};

export default SignUpPage2;