import { useCallback, useEffect, useState } from "react";
import axios from "axios";

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
    return (
        <div style={{width:'100%'}} >
            <a className="fontForRegister" style={{paddingLeft:"0.5rem"}}>아이디<span className="fontForRegister" style={{ color: "#FF2929" }} >*</span></a>
            <div style={{paddingLeft: '0.5rem', display: "flex", marginBottom: "2.5rem", justifyContent: "space-between" }} >
                <input
                    className="inputForRegister"
                    style={{height:'2.5rem', paddingLeft:'1rem', fontSize:'0.625rem',fontWeight:'300', width: "22.375rem" }}
                    placeholder={"아이디를 입력해 주세요"}
                    disabled={true}

                />
            </div>

            <a className="fontForRegister"  style={{paddingLeft:"0.5rem"}}>새 비밀번호<span className="fontForRegister" style={{ color: "#FF2929" }} >*</span></a>
            <div style={{paddingLeft: '0.5rem', marginBottom: "2.5rem", display: "flex" }}>
                <input
                    className="inputForRegister"
                    type="password"
                    placeholder={"대,소문자,특수기호,숫자 포함 12-14자리"}
                    onChange={onChangePw}
                    style={{height:'2.5rem', paddingLeft:'1rem', fontSize:'0.625rem',fontWeight:'300', width: "22.375rem"}}
                />
            </div>

            <a className="fontForRegister" style={{paddingLeft:"0.5rem"}} >새 비밀번호 확인<span className="fontForRegister" style={{ color: "#FF2929" }} >*</span></a>
            <div style={{ paddingLeft: '0.5rem', marginBottom: "2.5rem", display:'flex', flexDirection: 'column' }}>
                <input
                    className="inputForRegister"


                    type="password"
                    placeholder={"비밀번호를 한번 더 입력해주세요"}
                    onChange={onChangePwCheck}
                    style={{height: '2.5rem', paddingLeft:'1rem', fontSize:'0.625rem',fontWeight:'300', width: "22.375rem"}}

                />

                {isCheckPw === true ? <p style={{paddingLeft:'1.5rem', fontSize:'0.625rem',fontWeight:'300'}}>비밀번호가 일치합니다</p> :
                    (isCheckPw === false ? <p style={{paddingLeft:'1.5rem', fontSize:'0.625rem',fontWeight:'300'}}>비밀번호가 일치하지 않습니다</p> : null)}
            </div>
            <a className="fontForRegister" style={{paddingLeft:"0.5rem"}}>이름<span className="fontForRegister" style={{ color: "#FF2929" }} >*</span></a>
            <div style={{paddingLeft: '0.5rem', marginBottom: "2.5rem" }}>
                <input
                    className="inputForRegister"
                    placeholder={"이름을 입력해 주세요"}
                    onChange={onChangeName}
                    defaultValue={sessionStorage.getItem("name")}
                    style={{height: '2.5rem', paddingLeft:'1rem', fontSize:'0.625rem',fontWeight:'300', width: "22.375rem"}}

                />
            </div>
            <a className="fontForRegister" style={{paddingLeft:"0.5rem"}}>이메일<span className="fontForRegister" style={{ color: "#FF2929" }} >*</span></a>
            <div style={{ paddingLeft: '0.5rem', justifyContent: "space-between", display: "flex", marginBottom: 0}}>
                <input

                    className="inputForRegister"
                    defaultValue={email}
                    onChange={onChangeEmail}
                    placeholder={"예: forall@forall.com"}
                    style={{width: "14.22138rem", paddingLeft:'1rem', fontSize:'0.625rem',fontWeight:'300'}}
                />
                <button onClick={() => checkDuplicatedEmail()} disabled={email === prevEmail}
                        className="buttonForRegister"
                        style={{fontSize: '0.625rem', height: '2rem', backgroundColor: "#616161", color: "white"}}
                >중복 확인</button>

            </div>

            {isCheckedDuplicatedEmail === true ? <a style={{paddingLeft: "1.5rem", fontSize:"0.625rem", marginTop: "-5rem"}}>중복 확인 완료되었습니다</a> :
                (isCheckedDuplicatedEmail === false ? <p style={{paddingLeft:'1.5rem', fontSize:'0.625rem',fontWeight:'300'}}>중복되는 이메일이 존재합니다</p> : null)}
            <br/>
            <p className="fontForRegister" style={{paddingLeft:"0.5rem"}}>휴대폰<span className="fontForRegister" style={{color: "#FF2929"}}>*</span></p>

            <div style={{paddingLeft: '0.5rem', justifyContent: "space-between", display: "flex"}}>
            <input
                    style={{height: '2.5rem', paddingLeft:'1rem', fontSize:'0.625rem',fontWeight:'300', width: "14.22138rem", marginBottom: "0.625rem" }}
                    className="inputForRegister"
                    value={phone}
                    placeholder={"숫자만 입력해 주세요"}
                    onChange={onChangePhone}
                />
                <button onClick={() => sendCerifiedNum()} disabled={phone === prevPhone}
                    className="buttonForRegister"
                    style={{fontSize: '0.625rem',height: '2.7rem', backgroundColor: "#616161", color: "white" }}
                >인증번호 받기</button>
            </div>
            <div style={{paddingLeft: '0.5rem', marginBottom: "2.5rem", justifyContent: "space-between", display: "flex" }}>
                <input
                    className="inputForRegister"
                    style={{height: '2.5rem', paddingLeft:'1rem', fontSize:'0.625rem',fontWeight:'300', width: "14.22138rem" }}
                    placeholder={"인증번호 입력"}
                    onChange={onChangeCerifiedNum}
                />
                <button onClick={() => checkCerifiedNum()} disabled={phone === prevPhone}
                    className="buttonForRegister"
                    style={{fontSize: '0.625rem', height: '2.7rem', backgroundColor: "#616161", color: "white" }}
                >
                    인증번호 확인</button>
            </div>
            {isPhoneCerified === true ? <p style={{paddingLeft: "1.5rem", fontSize:"0.625rem", marginTop: "-2rem"}}>인증 완료되었습니다</p> :
                (isPhoneCerified === false ? <p style={{paddingLeft:'1.5rem', fontSize:'0.625rem',marginTop: '-2rem'}}>인증 실패했습니다</p> : null)}
            <div>
                <a className="fontForRegister" style={{paddingLeft:"0.5rem"}}>생년월일<span className="fontForRegister" style={{color: "#FF2929"}}>*</span></a>

                <div style={{justifyContent: "space-between", marginBottom: "2.5rem", display: 'flex'}}>
                    <select onChange={onChangeYear}
                            style={{height: '2.5rem', border: '1px solid #D9D9D9', width: '30%', margin: '0.5rem'}}
                            value={year}>
                        <option style={{fontSize:'0.625rem',fontWeight:'300'}} value="">년(YYYY)</option>


                        {years.map(year => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>

                    <select onChange={onChangeMonth}
                            style={{height: '2.5rem', border: '1px solid #D9D9D9', width: '30%', margin: '0.5rem'}}
                            value={month}>
                        <option style={{fontSize:'0.625rem',fontWeight:'300'}} value="">월(MM)</option>

                        {months.map(month => (
                            <option key={month} value={month}>
                                {month}
                            </option>
                        ))}
                    </select>

                    <select onChange={onChangeDay}
                            style={{height: '2.5rem', border: '1px solid #D9D9D9', width: '30%', margin: '0.5rem'}}
                            value={day}>
                        <option style={{fontSize:'0.625rem',fontWeight:'300'}} value="">일(DD)</option>


                        {days.map(day => (
                            <option key={day} value={day}>
                                {day}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div style={{fontSize: '0.625rem', paddingLeft: '0.5rem', height: '3rem'}}>
                <a className="fontForRegister">성별<span className="fontForRegister" style={{color: "#FF2929"}}>*</span></a>
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