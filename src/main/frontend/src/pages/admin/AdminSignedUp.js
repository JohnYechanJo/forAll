import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../components/home/Header";
import PersonalInfoModifyInputTemplate from "../../components/modify/PersonalInfoModifyInputTemplate";
import React, {useCallback, useEffect, useState} from "react";
import axios from "axios";
import useDidMountEffect from "../../utils/hooks/useDidMountEffect";
import "../../components/Styles.css";
import UseTermsTemplate from "../../components/signup/UseTermsTemplate";
import * as regularExpressions from "../../utils/regularExpressions";
import Alert from "../../components/Alert";
import {AiFillEye, AiFillEyeInvisible} from "react-icons/ai";

const AdminSignedUp = () => {
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
    const [isUseTermsChecked, setIsUseTermsChecked] = useState(false);
    const [isAllChecked, setIsAllChecked] = useState(false);
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const openAlert = (string) => {
        setIsAlertOpen(true);
    };


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

    console.log(year, month, day);


    const onChangePw = useCallback((e) => {
        setPw(e.target.value);
    }, []);
    const onChangePwCheck = useCallback((e) => {
        setPwCheck(e.target.value);
    }, []);
    const onChangeName = useCallback((e) => {
        setName(e.target.value);
    }, []);
    const onChangeEmail = useCallback((e) => {
        setEmail(e.target.value);
    }, []);
    const onChangePhone = useCallback((e) => {
        setPhone(e.target.value);
    }, []);
    const onChangeCerifiedNum = useCallback((e) => {
        setCerifiedNum(e.target.value);
    }, []);
    const onChangeGender = useCallback((e) => {
        setGender(e.target.value);
    }, []);
    const onChangeYear = (e) => {
        setYear(e.target.value);
    };
    const onChangeMonth = (e) => {
        setMonth(e.target.value);
    };
    const onChangeDay = (e) => {
        setDay(e.target.value);
    };


    const [prevEmail, setPrevEmail] = useState(email);
    const [prevPhone, setPrevPhone] = useState(phone);
    const years = [...Array(121).keys()].map(i => i + 1900).reverse();
    const months = [...Array(12).keys()].map(i => i + 1);
    const days = [...Array(31).keys()].map(i => i + 1);
    const id = sessionStorage.getItem("user_id");


    const [hide, setHide] = useState([true, true]);

    const onToggleHide = (idx) => {
        setHide(hide.map((ishide, i)=> idx === i ? !ishide : ishide));
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
                width: "100%",
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
                <div style={{width: '100%'}}>
                    <a className="fontForRegister" style={{paddingLeft: "2%"}}>아이디<span className="fontForRegister"
                                                                                        style={{color: "#FF2929"}}>*</span></a>
                    <div style={{flexDirection: "column", paddingLeft: '2%', marginBottom: "2.5rem", display: "flex"}}>
                        <input
                            className="inputForRegister"
                            style={{
                                height: '2.5rem',
                                paddingLeft: '2%',
                                fontSize: '0.625rem',
                                fontWeight: '300',
                                width: "92%"
                            }}
                            placeholder={"아이디를 입력해 주세요"}
                            disabled={true}
                            defaultValue={sessionStorage.getItem("user_id")}
                        />
                    </div>

                    <a className="fontForRegister" style={{paddingLeft: "2%"}}>이름<span className="fontForRegister"
                                                                                       style={{color: "#FF2929"}}>*</span></a>
                    <div style={{flexDirection: "column", paddingLeft: '2%', marginBottom: "2.5rem", display: "flex"}}>
                        <input
                            disabled={true}
                            className="inputForRegister fontForRegister"
                            placeholder={" 이름을 입력해 주세요"}
                            onChange={onChangeName}
                            style={{
                                height: '2.5rem',
                                paddingLeft: '2%',
                                fontSize: '0.625rem',
                                fontWeight: '300',
                                width: "92%"
                            }}

                        />
                    </div>
                    <a className="fontForRegister" style={{paddingLeft: "2%"}}>이메일<span className="fontForRegister"
                                                                                        style={{color: "#FF2929"}}>*</span></a>
                    <div style={{
                        paddingLeft: '2%',
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: "2.5rem",
                        display: "flex"
                    }}><input
                        disabled={true}
                        className="inputForRegister fontForRegister"
                        defaultValue={email}
                        onChange={onChangeEmail}
                        placeholder={"예: forall@forall.com"}
                        style={{width: "92%", paddingLeft: "2%", fontSize: '0.625rem', fontWeight: '300'}}
                    />

                    </div>

                    <a style={{paddingLeft: '2%'}} className="fontForRegister">휴대폰<span className="fontForRegister"
                                                                                        style={{color: "#FF2929"}}>*</span></a>
                    <div style={{
                        paddingLeft: '2%',
                        flexDirection: "row",
                        alignItems: "center",

                        marginBottom: "2.5rem",
                        display: "flex"
                    }}>
                        <input
                            disabled={true}
                            style={{width: "92%", paddingLeft: "2%", fontSize: '0.625rem', fontWeight: '300'}}
                            className="inputForRegister fontForRegister"
                            placeholder={" 숫자만 입력해 주세요"}
                            onChange={onChangePhone}
                        />

                    </div>


                        <a style={{paddingLeft: "2%"}} className="fontForRegister">생년월일<span className="fontForRegister"
                                                                                             style={{color: "#FF2929"}}>*</span></a>

                        <div style={{paddingLeft: "2%", marginBottom: "2.5rem", display: 'flex'}}>

                            <select onChange={onChangeYear} style={{
                                paddingLeft: "2%",
                                marginRight: "3%",
                                height: '2.5rem',
                                border: '1px solid #D9D9D9',
                                width: '30%'
                            }}>
                                <option value="">년(YYYY)</option>
                                {years.map(year => (
                                    <option key={year} value={year}>
                                        {year}
                                    </option>
                                ))}
                            </select>
                            <select onChange={onChangeMonth} style={{
                                paddingLeft: "2%",
                                marginRight: "3%",
                                height: '2.5rem',
                                border: '1px solid #D9D9D9',
                                width: '30%'
                            }}>
                                <option value="">월(MM)</option>
                                {months.map(month => (
                                    <option key={month} value={month}>
                                        {month}
                                    </option>
                                ))}
                            </select>
                            <select onChange={onChangeDay} style={{
                                paddingLeft: "2%",
                                marginRight: "3%",
                                height: '2.5rem',
                                border: '1px solid #D9D9D9',
                                width: '30%'
                            }}>
                                <option value="">일(DD)</option>
                                {days.map(day => (
                                    <option key={day} value={day}>
                                        {day}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div style={{display:'flew', justifyContent: 'left', fontSize: '0.625rem', paddingLeft: '0.5rem', height: '3rem'}}>
                        <a className="fontForRegister">성별<span className="fontForRegister"
                                                               style={{color: "#FF2929"}}>*</span></a>
                        <div>
                            <input
                                disabled={true}
                                type="radio"
                                name="gender"
                                value="Male"
                                onChange={onChangeGender}
                                id="male"
                                checked={gender === "Male"}
                            />
                            <label htmlFor='male'
                                   style={{
                                       display: 'flex',
                                       alignItems: 'center',
                                       marginBottom: '0.5rem',
                                       marginTop: '0.5rem'
                                   }}>
                                <em></em><a className="fontForRegister">남자</a>
                            </label>
                            <input
                                disabled={true}
                                type="radio"
                                name="gender"
                                value="Female"
                                onChange={onChangeGender}
                                id="female"
                                checked={gender === "Female"}
                            />
                            <label htmlFor='female' style={{display: 'flex', alignItems: 'center'}}>
                                <em></em>
                                <a className="fontForRegister">여자</a>

                            </label>
                        </div>
                    </div>
                </div>
            <div style={{
                display: 'flex',
                width: '100%',
                margin: '0px',
                marginTop: '4rem',

                fontSize: "0.9375rem",
                fontWeight: "400"
            }}>
                <button style={{
                    marginLeft: 'auto',
                    backgroundColor: "#FF4F4F",
                    width: '50%',
                    bottom: '0',
                    height: '3.125rem',
                    color: 'white',
                    border: 'none',
                    lineHeight: '1.875rem',
                    textAlign: 'center'
                }}
                        onClick={() => navigate('/')}
                >
                    이전
                </button>
                <button style={{
                    marginLeft: 'auto',
                    backgroundColor: "#525252",
                    width: '50%',
                    bottom: '0',
                    height: '3.125rem',
                    color: 'white',
                    border: 'none',
                    lineHeight: '1.875rem',
                    textAlign: 'center'
                }}
                        onClick={() => handleButton()}
                >다음
                </button>
            </div>
        </div>
    )
};

export default AdminSignedUp;