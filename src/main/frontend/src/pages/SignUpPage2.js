import {Link, useLocation, useNavigate} from "react-router-dom";
import Header from "../components/Header";
import PersonalInfoInputTemplate from "../components/PersonalInfoInputTemplate";
import UseTermsTemplate from "../components/UseTermsTemplate";
import {useState} from "react";
import {Gender} from "../utils/enums";
import axios from "axios";

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
    const [gender, setGender] = useState(Gender["MALE"]);

    const [isCheckDuplicatedId, setIsCheckDuplicatedId] = useState();
    const [isCheckDuplicatedEmail, setIsCheckDuplicatedEmail] = useState();

    const checkDuplicatedId = () => {
        axios.get("/api/v1/members/checkId/"+id)
            .then((response) => {
                setIsCheckDuplicatedId(true);
            }).catch((response) => {
                setIsCheckDuplicatedId(false);
        });

    };
    const checkDuplicatedEmail = () => {
        axios.get("/api/v1/members/checkEmail/"+email)
            .then((response) => {
                setIsCheckDuplicatedEmail(true);
            }).catch((response) => {
            setIsCheckDuplicatedEmail(false);
        });

    };
    const handleButton = () => {
        //Todo : 아이디, 이메일 중복 여부 확인, 비밀번호 확인 여부, 휴대폰 인증 여부, 약관 동의 여부 등 확인
        if (isCheckDuplicatedId !== true){
            alert("아이디 중복확인이 필요합니다");
        }else if (isCheckDuplicatedEmail !== true){
            alert("이메일 중복확인이 필요합니다");
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
                role={data.role}
                setId={setId}
                setPw={setPw}
                setPwCheck={setPwCheck}
                setName={setName}
                setEmail={setEmail}
                setPhone={setPhone}
                setCerifiedNum={setCerifiedNum}
                setBirthDay={setBirthDay}
                setGender={setGender}
                checkDuplicatedId={checkDuplicatedId}
                checkDuplicatedEmail={checkDuplicatedEmail}
                isCheckedDuplicatedId={isCheckDuplicatedId}
                isCheckedDuplicatedEmail={isCheckDuplicatedEmail}

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