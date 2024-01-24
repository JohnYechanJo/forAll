import {Link, useNavigate} from "react-router-dom";
import PersonalInfoInputTemplate from "../../components/signup/PersonalInfoInputTemplate";
import UseTermsTemplate from "../../components/signup/UseTermsTemplate";
import {useEffect, useState} from "react";
import {Gender} from "../../utils/enums";
import axios from "axios";
import useDidMountEffect from "../../utils/hooks/useDidMountEffect";
import * as regularExpressions from "../../utils/regularExpressions";
<<<<<<< HEAD
<<<<<<< HEAD
=======
import SignUpInformationTemplate from "../../components/signup/SignUpInformationTemplate";
>>>>>>> 087f6a3 ([01.24 예찬] 메뉴사진, 트라이얼, 새벽배달, 워크인, 미장 모달 구현 중+ModalStyles 세가지로 구분)
=======
import SignUpInformationTemplate from "../../components/signup/SignUpInformationTemplate";
>>>>>>> e9549e8 ([01.25 예찬] 모달 정보 수정 구현 완료)
import "../../components/Styles.css";
import Modal from "react-modal";
import Alert from "../../components/Alert";
const SignUpPage = () => {
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
    const [gender, setGender] = useState(Gender.NotSpecified);
<<<<<<< HEAD
<<<<<<< HEAD
=======

>>>>>>> 087f6a3 ([01.24 예찬] 메뉴사진, 트라이얼, 새벽배달, 워크인, 미장 모달 구현 중+ModalStyles 세가지로 구분)
=======

>>>>>>> e9549e8 ([01.25 예찬] 모달 정보 수정 구현 완료)
    const [isCheckDuplicatedId, setIsCheckDuplicatedId] = useState();
    const [isCheckDuplicatedEmail, setIsCheckDuplicatedEmail] = useState();
    const [isCheckPw, setIsCheckPw] = useState();
    const [isPhoneCerified, setIsPhoneCerified] = useState();
    const [isAllChecked, setIsAllChecked] = useState(false);
    const [isUseTermsChecked, setIsUseTermsChecked] = useState(false);
    const [alertContent, setAlertContent] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = (string) => {
        setAlertContent(string);
        setIsModalOpen(true);
    }
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
<<<<<<< HEAD
<<<<<<< HEAD
            openModal("이메일 형식을 확인해주세요.");
=======
            openModal("이메일 형식을 확인해주세요");
>>>>>>> 087f6a3 ([01.24 예찬] 메뉴사진, 트라이얼, 새벽배달, 워크인, 미장 모달 구현 중+ModalStyles 세가지로 구분)
=======
            openModal("이메일 형식을 확인해주세요");
>>>>>>> e9549e8 ([01.25 예찬] 모달 정보 수정 구현 완료)
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
<<<<<<< HEAD
<<<<<<< HEAD
            openModal("전화번호 형식을 확인해주세요.");
=======
            openModal("전화번호 형식을 확인해주세요");
>>>>>>> 087f6a3 ([01.24 예찬] 메뉴사진, 트라이얼, 새벽배달, 워크인, 미장 모달 구현 중+ModalStyles 세가지로 구분)
=======
            openModal("전화번호 형식을 확인해주세요");
>>>>>>> e9549e8 ([01.25 예찬] 모달 정보 수정 구현 완료)
        }
        else{
            axios.post("/api/v1/send-one/"+phone)
                .then((response) => {
<<<<<<< HEAD
<<<<<<< HEAD
                    openModal("인증번호를 발송했습니다.");
                }).catch((response) => {
                openModal("인증번호를 발송하지 못했습니다.");
=======
                    openModal("인증번호를 발송했습니다");
                }).catch((response) => {
                openModal("인증번호를 발송하지 못했습니다");
>>>>>>> 087f6a3 ([01.24 예찬] 메뉴사진, 트라이얼, 새벽배달, 워크인, 미장 모달 구현 중+ModalStyles 세가지로 구분)
=======
                    openModal("인증번호를 발송했습니다");
                }).catch((response) => {
                openModal("인증번호를 발송하지 못했습니다");
>>>>>>> e9549e8 ([01.25 예찬] 모달 정보 수정 구현 완료)
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
        console.log(birthDay);
        setBirthDay(year+'/'+month+'/'+day);
    }, [year, month, day]);
    const handleButton = () => {
        if (id === ""){
<<<<<<< HEAD
<<<<<<< HEAD
            openModal("아이디는 필수 입력 사항입니다.");
        }else if(pw === ""){
            openModal("비밀번호는 필수 입력 사항입니다.");
        }else if(name === ""){
            openModal("이름은 필수 입력 사항입니다.");
        }else if(email === ""){
            openModal("이메일은 필수 입력 사항입니다.");
        }else if(phone === ""){
            openModal("휴대폰 번호는 필수 입력 사항입니다.");
        }else if((year === "")||(month === "")||(day === "")){
            openModal("생년월일은 필수 입력 사항입니다.");
        }
        else if(isCheckDuplicatedId !== true) {
            openModal("아이디 중복확인이 필요합니다.");
        }else if(isCheckPw !== true){
            openModal("비밀번호가 일치하지 않습니다.");
        }
        else if (isCheckDuplicatedEmail !== true){
            openModal("이메일 중복확인이 필요합니다.");
        }
        else if (isPhoneCerified !== true){
            openModal("휴대폰 인증이 필요합니다.");
        }
        else if (isUseTermsChecked !== true){
            openModal("약관 동의가 필요합니다.")
        }
        else{
            setIsAllChecked(true);
            submit();
        }
    };
    const submit = () => {
            navigate('/guestRegistry',{
                state: {
=======
=======
>>>>>>> e9549e8 ([01.25 예찬] 모달 정보 수정 구현 완료)
            openModal("아이디는 필수 입력 사항입니다");
        }else if(pw === ""){
            openModal("비밀번호는 필수 입력 사항입니다");
        }else if(name === ""){
            openModal("이름은 필수 입력 사항입니다");
        }else if(email === ""){
            openModal("이메일은 필수 입력 사항입니다");
        }else if(phone === ""){
            openModal("휴대폰 번호는 필수 입력 사항입니다");
        }else if((year === "")||(month === "")||(day === "")){
            openModal("생년월일은 필수 입력 사항입니다");
        }
        else if(isCheckDuplicatedId !== true) {
            openModal("아이디 중복확인이 필요합니다");
        }else if(isCheckPw !== true){
            openModal("비밀번호가 일치하지 않습니다");
        }
        else if (isCheckDuplicatedEmail !== true){
            openModal("이메일 중복확인이 필요합니다");
        }
        else if (isPhoneCerified !== true){
            openModal("휴대폰 인증이 필요합니다");
        }
        else if (isUseTermsChecked !== true){
            openModal("약관 동의가 필요합니다")
        }
        else{
            setIsAllChecked(true);
        }
    };
    const submit = () => {
        if (isAllChecked){
            axios.post("/api/v1/members",
                {
<<<<<<< HEAD
>>>>>>> 087f6a3 ([01.24 예찬] 메뉴사진, 트라이얼, 새벽배달, 워크인, 미장 모달 구현 중+ModalStyles 세가지로 구분)
=======
>>>>>>> e9549e8 ([01.25 예찬] 모달 정보 수정 구현 완료)
                    loginId: id,
                    loginPw: pw,
                    name: name,
                    birthday: birthDay,
                    gender: gender,
                    email: email,
<<<<<<< HEAD
<<<<<<< HEAD
                    phoneNum: phone
                }
            });

=======
=======
>>>>>>> e9549e8 ([01.25 예찬] 모달 정보 수정 구현 완료)
                    phoneNum: phone,
                },
                {
                    headers:{
                        'Content-type': 'application/json',
                        'Accept': 'application/json'
                    }
                }
            ).then((response) => {
                navigate('/guestRegistry',{
                    state: {
                        id: id,
                        name: name,
                        email: email,
                    }
                });

            }).catch((response) => {
                navigate('/error')
            })
        }
<<<<<<< HEAD
>>>>>>> 087f6a3 ([01.24 예찬] 메뉴사진, 트라이얼, 새벽배달, 워크인, 미장 모달 구현 중+ModalStyles 세가지로 구분)
=======
>>>>>>> e9549e8 ([01.25 예찬] 모달 정보 수정 구현 완료)
    }
    return (
        <div>
            <div style={{
            display:"flex",
            flexDirection:"column",
            alignItems:"center",
            gap:"2.5rem",
            marginLeft:"1rem",
            marginRight:"1rem",
        }} >
            <div style={{
                textAlign:"center",
                fontSize:"0.9375rem",
                lineHeight:"1.375rem",
                fontWeight:"400",
                letterSpacing:"-0.0255rem",
            }}>
                <div style={{marginTop:'2.75rem',fontSize:'0.9375rem'}} >1.정보 입력</div>
            </div>
            <PersonalInfoInputTemplate
                pw = {pw}
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
            <UseTermsTemplate
                setIsUseTermsChecked={setIsUseTermsChecked}
            />
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> e9549e8 ([01.25 예찬] 모달 정보 수정 구현 완료)
            
            {isAllChecked ? <SignUpInformationTemplate
                setIsAllChecked={setIsAllChecked}
                submit={submit}
            /> : null}
<<<<<<< HEAD
>>>>>>> 087f6a3 ([01.24 예찬] 메뉴사진, 트라이얼, 새벽배달, 워크인, 미장 모달 구현 중+ModalStyles 세가지로 구분)
=======
>>>>>>> e9549e8 ([01.25 예찬] 모달 정보 수정 구현 완료)
            <Alert isOpen={isModalOpen} setIsOpen={setIsModalOpen} content={alertContent} />

        </div>
        <div style={{display:'flex',width:'100%',margin:'0px',marginTop:'4rem'}}>
        <button style={{marginLeft:'auto',backgroundColor:"#FF4F4F",width:'50%',bottom:'0',height:'3.125rem',color:'white',border:'none',lineHeight:'1.875rem',textAlign:'center'}}
        onClick={() => navigate('/login')}
        >
            이전</button>
        <button style={{marginLeft:'auto',backgroundColor:"#525252",width:'50%',bottom:'0',height:'3.125rem',color:'white',border:'none',lineHeight:'1.875rem',textAlign:'center'}}
            onClick={()=>handleButton()}
        >다음</button>
        </div>
        </div>
        
    )
};

export default SignUpPage;