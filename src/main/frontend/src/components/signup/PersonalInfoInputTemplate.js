import {useCallback, useEffect, useState} from "react";
import { Gender } from "../../utils/enums";
import axios from "axios";
import "../../components/Styles.css";
import React from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
const PersonalInfoInputTemplate = ({ role, setId, setPw, setPwCheck, setName, setEmail, setPhone, setCerifiedNum, setYear,setMonth,setDay, setGender, checkDuplicatedId, checkDuplicatedEmail, isCheckedDuplicatedId, isCheckedDuplicatedEmail, isCheckPw, sendCerifiedNum, checkCerifiedNum,isPhoneCerified, gender }) => {


    const onChangeId = useCallback((e) => {
        setId(e.target.value);
    }, []);
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
    const years = [...Array(121).keys()].map(i => i + 1900).reverse();
    const months = [...Array(12).keys()].map(i => i + 1);
    const days = [...Array(31).keys()].map(i => i + 1);


    const [hide, setHide] = useState([true, true]);

    const onToggleHide = (idx) => {
        setHide(hide.map((ishide, i)=> idx === i ? !ishide : ishide));
    };

    return (
        <div style={{width:'100%'}} >
            <a style={{paddingLeft: '2%'}} className="fontForRegister" >아이디<span className="fontForRegister" style={{color:"#FF2929"}} >*</span></a>
            <div style={{marginLeft: '2%', marginRight: '2%', flexDirection:"row", alignItems: "center",marginBottom:"2.5rem", display:"flex"}} >
                <input
                    className="inputForRegister fontForRegister "
                    style={{width:"61%", paddingLeft:"2%"}}
                    placeholder={"아이디를 입력해주세요"}
                    onChange={onChangeId}
                />
                <button onClick={() => checkDuplicatedId()} className="buttonForRegister" style={{ textAlign:'center', height: '2.7rem', width: '32%', fontSize: '0.625rem'}}>중복 확인</button>
            </div>
            {isCheckedDuplicatedId === true ? <p style={{paddingLeft:'2%', fontSize:'0.625rem',fontWeight:'300', marginTop:"-2.5rem", marginBottom:"2.5rem"}}>중복 확인 완료되었습니다</p> :
                (isCheckedDuplicatedId === false ? <p style={{paddingLeft:'2%', fontSize:'0.625rem',fontWeight:'300', marginTop:"-2.5rem", marginBottom:"2.5rem"}}>중복되는 아이디가 존재합니다</p> : null)}
            <a style={{paddingLeft: '2%'}} className="fontForRegister"  >비밀번호<span className="fontForRegister" style={{color:"#FF2929"}} >*</span></a>
            <div className="relative w-full" style={{marginLeft: '2%', marginRight: '2%', width: '96%', display: "flex",
                alignItems: "center", marginBottom: "2.5rem", border: '1px solid #D9D9D9'}}>
                <input
                    className="inputForRegister fontForRegister pr-10"
                    type={hide[0] ? 'password' : 'text'}
                    placeholder={" 대,소문자,특수기호,숫자 포함 12-14자리"}
                    onChange={onChangePw}
                    style={{paddingLeft: '2%', height: '2.5rem', fontSize: '0.625rem',fontWeight: '300', width: "92%",
                        border: '#FFFFFF'}}

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
            <a style={{paddingLeft: '2%'}} className="fontForRegister"  >비밀번호 확인<span className="fontForRegister" style={{color:"#FF2929"}} >*</span></a>
            <div className="relative w-full" style={{marginLeft: '2%', marginRight: '2%', width: '96%', display: "flex",
                alignItems: "center", marginBottom: "2.5rem", border: '1px solid #D9D9D9'}}>
                <input
                    className="inputForRegister fontForRegister pr-10"
                    type={hide[1] ? 'password' : 'text'}
                    placeholder={" 비밀번호를 한 번 더 입력해주세요"}
                    onChange={onChangePwCheck}
                    style={{paddingLeft: '2%', height: '2.5rem', fontSize: '0.625rem',fontWeight: '300', width: "92%",
                        border: '#FFFFFF'}}

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
                {isCheckPw === true ? <p style={{paddingLeft:'2%', fontSize:'0.625rem',fontWeight:'300', marginTop:"-2.5rem", marginBottom:"2.5rem"}}>비밀번호가 일치합니다</p> :
                    (isCheckPw === false ? <p style={{paddingLeft:'2%', fontSize:'0.625rem',fontWeight:'300', marginTop:"-2.5rem", marginBottom:"2.5rem"}}>비밀번호가 일치하지 않습니다</p> : null)}

            <a style={{paddingLeft: '2%'}} className="fontForRegister" >이름<span className="fontForRegister" style={{color:"#FF2929"}} >*</span></a>
            <div style={{paddingLeft: '2%', flexDirection: "column", marginBottom:"2.5rem", display:"flex" }}>
                <input
                    className="inputForRegister fontForRegister"
                    placeholder={" 이름을 입력해 주세요"}
                    onChange={onChangeName}
                    style={{height: '2.5rem', paddingLeft:'2%', fontSize:'0.625rem',fontWeight:'300', width: "95%"}}

                />
            </div>
            <a style={{paddingLeft:'2%'}} className="fontForRegister" >이메일<span className="fontForRegister" style={{color:"#FF2929"}} >*</span></a>
            <div style={{paddingLeft: '2%',
                flexDirection: "row",
                alignItems: "center",
                marginBottom: "2.5rem",
                display: "flex"
            }}>
                <input
                    style={{width:"61%", paddingLeft:"2%", fontSize:'0.625rem',fontWeight:'300'}}
                    className="inputForRegister fontForRegister"
                    placeholder={" 예:forall@forall.com"}
                    onChange={onChangeEmail}
                />
                <button onClick={() => checkDuplicatedEmail()} style={{textAlign:'center',height: '2.7rem', width: '32%',fontSize: '0.625rem'}} className="buttonForRegister">중복 확인</button>
            </div>
            {isCheckedDuplicatedEmail === true ? <p style={{paddingLeft:'2%', fontSize:'0.625rem',fontWeight:'300', marginTop:"-2.5rem", marginBottom:"2.5rem"}}>중복 확인 완료되었습니다</p> :
                (isCheckedDuplicatedEmail === false ? <p style={{paddingLeft:'2%', fontSize:'0.625rem',fontWeight:'300', marginTop:"-2.5rem", marginBottom:"2.5rem"}}>중복되는 이메일이 존재합니다</p> : null)}
            <a style={{paddingLeft:'2%'}} className="fontForRegister" >휴대폰<span className="fontForRegister" style={{color:"#FF2929"}} >*</span></a>
            <div style={{paddingLeft: '2%', flexDirection:"row", alignItems: "center",marginBottom:"2.5rem", display:"flex"}} >
                <input
                    style={{width:"61%", paddingLeft:"2%", fontSize:'0.625rem',fontWeight:'300'}}
                    className="inputForRegister fontForRegister"
                    placeholder={" 숫자만 입력해 주세요"}
                    onChange={onChangePhone}
                />
                <button onClick={() => sendCerifiedNum()} className="buttonForRegister"
                        style={{textAlign:'center', height: '2.7rem', width: '32%', fontSize: '0.625rem',  backgroundColor:"#616161",color:"white"}}
                >인증번호 받기</button>
            </div>
            <div style={{
                paddingLeft: '2%',
                flexDirection: "row",
                alignItems: "center",
                marginBottom: "2.5rem",
                display: "flex"
            }}>
                <input className="inputForRegister fontForRegister"
                        style={{width:"61%", paddingLeft:"2%", fontSize:'0.625rem',fontWeight:'300'}}
                        placeholder={" 인증번호 입력"}
                        onChange={onChangeCerifiedNum}
                />
                <button onClick={() => checkCerifiedNum()} className="buttonForRegister"
                        style={{ textAlign:'center', height: '2.7rem', width: '32%', fontSize: '0.625rem', backgroundColor:"#616161",color:"white"}}
                >인증번호 확인</button>
            </div>
            {isPhoneCerified === true ? <p style={{paddingLeft:'2%', fontSize:'0.625rem',fontWeight:'300', marginTop:"-2.5rem", marginBottom:"2.5rem"}}>인증 완료되었습니다</p> :
                (isPhoneCerified === false ? <p style={{paddingLeft:'2%', fontSize:'0.625rem',fontWeight:'300', marginTop:"-2.5rem", marginBottom:"2.5rem"}}>인증 실패했습니다</p> : null)}
            <div>
                <a style={{paddingLeft: "2%"}} className="fontForRegister" >생년월일<span className="fontForRegister" style={{color:"#FF2929"}} >*</span></a>

                <div style={{paddingLeft: "2%", marginBottom:"2.5rem",display:'flex'}}>

                    <select onChange={onChangeYear} style={{paddingLeft: "2%", marginRight: "3%", height:'2.5rem',border:'1px solid #D9D9D9', width:'30%'}} >
                        <option value="">년(YYYY)</option>
                        {years.map(year => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                    <select onChange={onChangeMonth} style={{paddingLeft: "2%", marginRight: "3%",height:'2.5rem',border:'1px solid #D9D9D9', width:'30%'}}>
                        <option value="">월(MM)</option>
                        {months.map(month => (
                            <option key={month} value={month}>
                                {month}
                            </option>
                        ))}
                    </select>
                    <select onChange={onChangeDay} style={{paddingLeft: "2%", marginRight: "3%",height:'2.5rem',border:'1px solid #D9D9D9', width:'30%'}}>
                        <option value="">일(DD)</option>
                        {days.map(day => (
                            <option key={day} value={day}>
                                {day}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <a style={{paddingLeft: "2%"}} className="fontForRegister" >성별<span className="fontForRegister" style={{color:"#FF2929"}} >*</span></a>
            <div style={{height:'3rem'}}>
                <div >
                    <input
                        type="radio"
                        name="gender"
                        value="Male"
                        onChange={onChangeGender}
                        id="male"
                        style={{paddingLeft: "2%"}}
                    />
                    <label for='male' style={{paddingLeft:'2%', display: 'flex', alignItems: 'center', marginBottom: '0.5rem', marginTop: '0.5rem'}}>
                        <em></em><span className="fontForRegister" >남자</span>
                    </label>
                    <input
                        type="radio"
                        name="gender"
                        value="Female"
                        onChange={onChangeGender}
                        id="female"
                        style={{paddingLeft: "2%"}}
                    />
                    <label for='female' style={{paddingLeft: '2%', display: 'flex', alignItems: 'center', marginBottom: '0.5rem', marginTop: '0.5rem'}}>
                        <em></em><span className="fontForRegister" >여자</span>
                    </label>
                </div>
            </div>
        </div>
    )
};

export default PersonalInfoInputTemplate;