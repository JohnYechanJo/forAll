import {Link, useLocation, useNavigate} from "react-router-dom";
import Header from "../components/Header";
import PersonalInfoInputTemplate from "../components/PersonalInfoInputTemplate";
import {useState} from "react";
import {Gender} from "../utils/enums";

const PersonalModify2 = () => {
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

    const handleButton = () => {
        //Todo : 아이디, 이메일 중복 여부 확인, 비밀번호 확인 여부, 휴대폰 인증 여부, 약관 동의 여부 등 확인
        //Todo : fetch로 데이터 전송 후, response에 따라 페이지 이동 구분

        navigate('/signUpComplete',{
            state: {
                id: id,
                name: name,
                email: email,
                role: data.role
            }
        });

    };
    return (
        <div>
            <Header PageName={"개인정보수정"}/>
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
            />
            <Link to="/personalInfoModify">
                <p>뒤로</p>
            </Link>
            <button
                onClick={()=>handleButton()}
            >수정하기</button>
        </div>
    )
};

export default PersonalModify2;