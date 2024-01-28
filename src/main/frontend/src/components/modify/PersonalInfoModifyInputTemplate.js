import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import {AiFillEye, AiFillEyeInvisible} from "react-icons/ai";


const PersonalInfoModifyInputTemplate = ({ name, phone, email, year, month, day, cerifiedNum, setPw, setPwCheck, setName, setEmail, setPhone, setCerifiedNum, setYear, setMonth, setDay, setGender, isCheckPw, setIsCheckedDuplicatedEmail, isCheckedDuplicatedEmail, sendCerifiedNum, gender, isPhoneCerified, setIsPhoneCerified }) => {
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
    const checkDuplicatedEmail = () => {

        if (email === prevEmail) {
            setIsCheckedDuplicatedEmail(true);
        }
        else {
            axios.get("/api/v1/members/checkEmail/" + email)
                .then((response) => {
                    setIsCheckedDuplicatedEmail(true);
                }).catch((response) => {
                    setIsCheckedDuplicatedEmail(false);
                });
        }
    };
    const checkCerifiedNum = () => {
        if (phone === prevPhone) {
            setIsPhoneCerified(true);
        }
        else {
            axios.get("/api/v1/checkSms/" + phone + "/" + cerifiedNum)
                .then((response) => {
                    setIsPhoneCerified(true);
                }).catch((response) => {
                    setIsPhoneCerified(false);
                });


        }
    };
    const [prevEmail, setPrevEmail] = useState(email);
    const [prevPhone, setPrevPhone] = useState(phone);
    const years = [...Array(121).keys()].map(i => i + 1900).reverse();
    const months = [...Array(12).keys()].map(i => i + 1);
    const days = [...Array(31).keys()].map(i => i + 1);
    const id = sessionStorage.getItem("user_id");
    setIsCheckedDuplicatedEmail(true);
    setIsPhoneCerified(true);

    const [hide, setHide] = useState([true, true]);

    const onToggleHide = (idx) => {
        setHide(hide.map((ishide, i)=> idx === i ? !ishide : ishide));
    };

    return (
        <div style={{width: '100%'}}>
            <a className="fontForRegister" style={{paddingLeft: "2%"}}>아이디<span className="fontForRegister"
                                                                                style={{color: "#FF2929"}}>*</span></a>
            <div style={{flexDirection: "column", paddingLeft: '2%', marginBottom: "2.5rem", display: "flex"}}>
                <input
                    className="inputForRegister"
                    style={{height: '2.5rem', paddingLeft: '2%', fontSize: '0.625rem', fontWeight: '300', width: "92%"}}
                    placeholder={"아이디를 입력해 주세요"}
                    disabled={true}
                    defaultValue={sessionStorage.getItem("user_id")}
                />
            </div>

            <a className="fontForRegister" style={{paddingLeft: "2%"}}>새 비밀번호<span className="fontForRegister"
                                                                                   style={{color: "#FF2929"}}>*</span></a>
            <div className="relative w-full" style={{
                paddingLeft: '2%',
                flexDirection: "row",
                alignItems: "center",
                marginBottom: "2.5rem",
                display: "flex"
            }}>
                <input
                    className="inputForRegister fontForRegister pr-10"
                    type={hide[0] ? 'password' : 'text'}
                    placeholder={" 대,소문자,특수기호,숫자 포함 12-14자리"}
                    onChange={onChangePw}
                    style={{paddingLeft: '2%', height: '2.5rem', fontSize: '0.625rem', fontWeight: '300', width: "92%"}}

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
            <a className="fontForRegister" style={{paddingLeft: "2%"}}>새 비밀번호 확인<span className="fontForRegister"
                                                                                      style={{color: "#FF2929"}}>*</span></a>
            <div className="relative w-full" style={{
                paddingLeft: '2%',
                flexDirection: "row",
                alignItems: "center",
                marginBottom: "2.5rem",
                display: "flex"
            }}>
                <input
                    className="inputForRegister fontForRegister pr-10"
                    type={hide[1] ? 'password' : 'text'}
                    placeholder={" 비밀번호를 한 번 더 입력해주세요"}
                    onChange={onChangePwCheck}
                    style={{height: '2.5rem', paddingLeft: '2%', fontSize: '0.625rem', fontWeight: '300', width: "92%"}}

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
            {isCheckPw === true ?
                <p style={{paddingLeft: '2%', fontSize: '0.625rem', fontWeight: '300', marginTop:"-2.5rem", marginBottom:"2.5rem"}}>비밀번호가 일치합니다</p> :
                (isCheckPw === false ?
                    <p style={{paddingLeft: '2%', fontSize: '0.625rem', fontWeight: '300', marginTop:"-2.5rem", marginBottom:"2.5rem"}}>비밀번호가 일치하지
                        않습니다</p> : null)}

            <a className="fontForRegister" style={{paddingLeft: "2%"}}>이름<span className="fontForRegister"
                                                                                   style={{color: "#FF2929"}}>*</span></a>
            <div style={{flexDirection: "column", paddingLeft:'2%',marginBottom: "2.5rem", display: "flex"}}>
                <input
                    className="inputForRegister fontForRegister"
                    placeholder={" 이름을 입력해 주세요"}
                    onChange={onChangeName}
                    style={{height: '2.5rem', paddingLeft: '2%', fontSize: '0.625rem', fontWeight: '300', width: "92%"}}

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
                className="inputForRegister fontForRegister"
                defaultValue={email}
                onChange={onChangeEmail}
                placeholder={"예: forall@forall.com"}
                style={{width: "70%", paddingLeft: "2%", fontSize: '0.625rem', fontWeight: '300'}}
            />
                <button onClick={() => checkDuplicatedEmail()} disabled={email === prevEmail}
                        className="buttonForRegister"
                        style={{fontSize: '0.625rem', textAlign:'center',height: '2.7rem', width: '21%',backgroundColor: "#616161", color: "white"}}
                >중복 확인
                </button>

            </div>

            {isCheckedDuplicatedEmail === true ?
                <p style={{paddingLeft: "2%", fontSize: "0.625rem", marginTop: "-2.5rem", marginBottom:"2.5rem"}}>중복 확인 완료되었습니다</p> :
                (isCheckedDuplicatedEmail === false ? <p style={{paddingLeft: '2%', fontSize: '0.625rem', marginTop: "-2.5rem", marginBottom:"2.5rem"}}>중복되는 이메일이
                        존재합니다</p> : null)}
            <br/>
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
                    style={{width: "70%", paddingLeft: "2%", fontSize: '0.625rem', fontWeight: '300'}}
                    className="inputForRegister fontForRegister"
                    placeholder={" 숫자만 입력해 주세요"}
                    onChange={onChangePhone}
                />
                <button onClick={() => sendCerifiedNum()} className="buttonForRegister"
                        style={{
                            textAlign: 'center',
                            height: '2.7rem',
                            width: '21%',
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
                       style={{width: "70%", paddingLeft: "2%", fontSize: '0.625rem', fontWeight: '300'}}
                       placeholder={" 인증번호 입력"}
                       onChange={onChangeCerifiedNum}
                />
                <button onClick={() => checkCerifiedNum()} className="buttonForRegister"
                        style={{
                            textAlign: 'center',
                            height: '2.7rem',
                            width: '21%',
                            fontSize: '0.625rem',
                            backgroundColor: "#616161",
                            color: "white"
                        }}
                >인증번호 확인
                </button>
            </div>
            {isPhoneCerified === true ?
                <p style={{paddingLeft: '2%', fontSize: '0.625rem', fontWeight: '300', marginTop:"-2.5rem", marginBottom:"2.5rem"}}>인증 완료되었습니다</p> :
                (isPhoneCerified === false ?
                    <p style={{paddingLeft: '2%', fontSize: '0.625rem', fontWeight: '300', marginTop:"-2.5rem", marginBottom: '2.5rem'}}>인증 실패했습니다</p> : null)}
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