import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import {AiFillEye, AiFillEyeInvisible} from "react-icons/ai";
import useDidMountEffect from "../../utils/hooks/useDidMountEffect";

const PersonalInfoModifyInputTemplate = ({ name, pw, phone, email, year, month, day, cerifiedNum, setPw, setPwCheck, setName, setEmail, setPhone, setCerifiedNum, setYear, setMonth, setDay, setGender, isCheckPw, setIsCheckedDuplicatedEmail, isCheckedDuplicatedEmail, sendCerifiedNum, gender, isPhoneCerified, setIsPhoneCerified, defaultEmail, defaultPhone }) => {
    const [phoneChanged, setPhoneChanged] = useState(false);
    const [emailChanged, setEmailChanged] = useState(false);
    console.log(year,month,day);
    useDidMountEffect(() => {
        if (phone != defaultPhone){
            setIsPhoneCerified(false);
            setPhoneChanged(true);
        }
    }, [phone]);
    useDidMountEffect(() => {
        if(email != defaultEmail){
            setIsCheckedDuplicatedEmail(false);
            setEmailChanged(true);
        }
    }, [email]);


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
    const [hide, setHide] = useState([true, true]);

    const onToggleHide = (idx) => {
        setHide(hide.map((ishide, i)=> idx === i ? !ishide : ishide));
    };
    const checkDuplicatedEmail = () => {
        axios.get("/api/v1/members/checkEmail/" + email)
            .then((response) => {
                setIsCheckedDuplicatedEmail(true);
            }).catch((response) => {
            setIsCheckedDuplicatedEmail(false);
        });
    };
    const checkCerifiedNum = () => {
        axios.get("/api/v1/checkSms/" + phone + "/" + cerifiedNum)
            .then((response) => {
                setIsPhoneCerified(true);
            }).catch((response) => {
            setIsPhoneCerified(false);
        });
    };
    const years = [...Array(121).keys()].map(i => i + 1900).reverse();
    const months = [...Array(12).keys()].map(i => i + 1);
    const days = [...Array(31).keys()].map(i => i + 1);
    const id = sessionStorage.getItem("user_id");

    const arrPW = pw.split('');
    console.log(arrPW);
    const isPasswordValid =
        arrPW.length > 11 && arrPW.length < 15 &&
        arrPW.some(element => /[a-zA-Z]/.test(element)) && // 영문자 포함 여부 확인
        arrPW.some(element => /[0-9]/.test(element)) && // 숫자 포함 여부 확인
        arrPW.some(element => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(element)); // 특수 문자 포함 여부 확인


    return (
        <div style={{width: '100%'}}>
            <a className="fontForRegister" style={{paddingLeft: "2%"}}>아이디<span className="fontForRegister"
                                                                                    style={{color: "#FF2929"}}>*</span></a>
            <div style={{paddingLeft: '2%', flexDirection: "column", marginBottom: "2.5rem", display: "flex"}}>
                <input
                    className="inputForRegister fontForRegister"
                    placeholder={"아이디를 입력해 주세요"}
                    style={{height: '2.5rem', paddingLeft: '2%', fontSize: '0.625rem', fontWeight: '300', width: "95%"}}
                    defaultValue={sessionStorage.getItem("user_id")}
                    disabled={true}

                />
            </div>

            <a style={{paddingLeft: '2%'}} className="fontForRegister">비밀번호<span className="fontForRegister"
                                                                                 style={{color: "#FF2929"}}>*</span></a>
            <div className="relative w-full" style={{
                marginLeft: '2%', marginRight: '2%', width: '96%', display: "flex",
                alignItems: "center", marginBottom: "2.5rem", border: '1px solid #D9D9D9'
            }}>
                <input
                    className="inputForRegister fontForRegister pr-10"
                    type={hide[0] ? 'password' : 'text'}
                    placeholder={" 대,소문자,특수기호,숫자 포함 12-14자리"}
                    onChange={onChangePw}
                    style={{
                        paddingLeft: '2%', height: '2.5rem', fontSize: '0.625rem', fontWeight: '300', width: "92%",
                        border: '#FFFFFF'
                    }}

                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    {hide[0] ? (

                        <AiFillEyeInvisible
                            className="text-xl text-gray-700 cursor-pointer"
                            onClick={() => onToggleHide(0)}
                        />
                    ) : (
                        <AiFillEye
                            className="text-xl text-gray-700 cursor-pointer"
                            onClick={() => onToggleHide(0)}
                        />
                    )}
                </div>
            </div>
            {isPasswordValid || pw.length===0 ? null : <p style={{paddingLeft: '2%',
                fontSize: '0.625rem',
                fontWeight: '300',
                marginTop: "-2.5rem",
                marginBottom: "2.5rem"}}>대,소문자,특수기호,숫자 포함 12-14자리를 입력해주세요.</p>}
            <a style={{paddingLeft: '2%'}} className="fontForRegister">비밀번호 확인<span className="fontForRegister"
                                                                                    style={{color: "#FF2929"}}>*</span></a>
            <div className="relative w-full" style={{
                marginLeft: '2%', marginRight: '2%', width: '96%', display: "flex",
                alignItems: "center", marginBottom: "2.5rem", border: '1px solid #D9D9D9'
            }}>
                <input
                    className="inputForRegister fontForRegister pr-10"
                    type={hide[1] ? 'password' : 'text'}
                    placeholder={" 비밀번호를 한 번 더 입력해주세요"}
                    onChange={onChangePwCheck}
                    style={{
                        paddingLeft: '2%', height: '2.5rem', fontSize: '0.625rem', fontWeight: '300', width: "92%",
                        border: '#FFFFFF'
                    }}

                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    {hide[1] ? (
                        <AiFillEyeInvisible
                            className="text-xl text-gray-700 cursor-pointer"
                            onClick={() => onToggleHide(1)}
                        />

                    ) : (
                        <AiFillEye
                            className="text-xl text-gray-700 cursor-pointer"
                            onClick={() => onToggleHide(1)}
                        />
                    )}
                </div>
            </div>
            {isCheckPw === true ? <p style={{
                    paddingLeft: '2%',
                    fontSize: '0.625rem',
                    fontWeight: '300',
                    marginTop: "-2.5rem",
                    marginBottom: "2.5rem"
                }}>비밀번호가 일치합니다</p> :
                (isCheckPw === false ? <p style={{
                    paddingLeft: '2%',
                    fontSize: '0.625rem',
                    fontWeight: '300',
                    marginTop: "-2.5rem",
                    marginBottom: "2.5rem"
                }}>비밀번호가 일치하지 않습니다</p> : null)}
            <a style={{paddingLeft: '2%'}} className="fontForRegister">이름<span className="fontForRegister"
                                                                               style={{color: "#FF2929"}}>*</span></a>
            <div style={{paddingLeft: '2%', flexDirection: "column", marginBottom: "2.5rem", display: "flex"}}>
                <input
                    className="inputForRegister fontForRegister"
                    placeholder={" 이름을 입력해 주세요"}
                    onChange={onChangeName}
                    style={{height: '2.5rem', paddingLeft: '2%', fontSize: '0.625rem', fontWeight: '300', width: "95%"}}
                    defaultValue={sessionStorage.getItem("name")}

                />
            </div>

            <a style={{paddingLeft: '2%'}} className="fontForRegister">이메일<span className="fontForRegister"
                                                                                style={{color: "#FF2929"}}>*</span></a>
            <div style={{
                paddingLeft: '2%',
                flexDirection: "row",
                alignItems: "center",
                marginBottom: "2.5rem",
                display: "flex"
            }}>
                <input
                    className="inputForRegister"
                    defaultValue={email}
                    onChange={onChangeEmail}
                    placeholder={"예: forall@forall.com"}
                    style={{width: "61%", paddingLeft: "2%", fontSize: '0.625rem', fontWeight: '300'}}
                />
                <button onClick={() => checkDuplicatedEmail()} disabled={email === defaultEmail}
                        style={{
                            textAlign: 'center',
                            height: '2.7rem',
                            width: '30%',
                            fontSize: '0.625rem',
                            backgroundColor: "#616161",
                            color: "white"
                        }}
                        className="buttonForRegister">중복 확인
                </button>


            </div>
            {!emailChanged ? null : (<p style={{
                paddingLeft: '2%',
                fontSize: '0.625rem',
                fontWeight: '300',
                marginTop: "-2.5rem",
                marginBottom: "2.5rem"
            }}>{isCheckedDuplicatedEmail ? "중복 확인 완료되었습니다" : "중복 확인 실패했습니다."}</p>)}


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
                    style={{width: "61%", paddingLeft: "2%", fontSize: '0.625rem', fontWeight: '300'}}
                    className="inputForRegister fontForRegister"
                    placeholder={" 숫자만 입력해 주세요"}
                    onChange={onChangePhone}
                    value={phone}

                />
                <button onClick={() => sendCerifiedNum()} className="buttonForRegister"
                        style={{
                            textAlign: 'center',
                            height: '2.7rem',
                            width: '30%',
                            fontSize: '0.625rem',
                            backgroundColor: "#616161",
                            color: "white"
                        }}
                >인증번호 받기
                </button>
            </div>
            <div style={{
                paddingLeft: '2%',
                flexDirection: "row",
                alignItems: "center",
                marginBottom: "2.5rem",
                display: "flex"
            }}>
                <input className="inputForRegister fontForRegister"
                       style={{width: "61%", paddingLeft: "2%", fontSize: '0.625rem', fontWeight: '300'}}
                       placeholder={" 인증번호 입력"}
                       onChange={onChangeCerifiedNum}
                />
                <button onClick={() => checkCerifiedNum()} className="buttonForRegister"
                        style={{
                            textAlign: 'center',
                            height: '2.7rem',
                            width: '30%',
                            fontSize: '0.625rem',
                            backgroundColor: "#616161",
                            color: "white"
                        }}
                >인증번호 확인
                </button>
            </div>
            {!phoneChanged ? null : (<p style={{
                paddingLeft: '2%',
                fontSize: '0.625rem',
                fontWeight: '300',
                marginTop: "-2.5rem",
                marginBottom: "2.5rem"
            }}>{isPhoneCerified ? "인증 완료되었습니다." : "인증 실패했습니다."}</p>)}
            <div>
                <a style={{paddingLeft: "2%"}} className="fontForRegister">생년월일<span className="fontForRegister"
                                                                                     style={{color: "#FF2929"}}>*</span></a>

                <div style={{paddingLeft: "2%", marginBottom: "2.5rem", display: 'flex'}}>

                    <select onChange={onChangeYear} style={{
                        paddingLeft: "2%",
                        marginRight: "3%",
                        height: '2.5rem',
                        border: '1px solid #D9D9D9',
                        width: '30%'
                    }} value={year}>
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
                    }} value={month}>
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
                    }} value={day}>
                        <option value="">일(DD)</option>
                        {days.map(day => (
                            <option key={day} value={day}>
                                {day}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div style={{fontSize: '0.625rem', paddingLeft: '0.5rem', height: '3rem'}}>
                <a className="fontForRegister">성별<span className="fontForRegister"
                                                       style={{color: "#FF2929"}}>*</span></a>
                <div>
                    <input
                        type="radio"
                        name="gender"
                        value="Male"
                        onChange={onChangeGender}
                        id="male"
                        checked={gender === "Male"}
                    />
                    <label for='male'
                           style={{display: 'flex', alignItems: 'center', marginBottom: '0.5rem', marginTop: '0.5rem'}}>
                        <em></em><a className="fontForRegister">남자</a>
                    </label>
                    <input
                        type="radio"
                        name="gender"
                        value="Female"
                        onChange={onChangeGender}
                        id="female"
                        checked={gender === "Female"}
                    />
                    <label for='female' style={{display: 'flex', alignItems: 'center'}}>
                        <em></em>
                        <a className="fontForRegister">여자</a>

                    </label>
                </div>
            </div>
        </div>
    )
};

export default PersonalInfoModifyInputTemplate;