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
    const location = useLocation();
    const data = { ...location.state };

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
                            defaultValue={data.loginId}
                        />
                    </div>

                    <a className="fontForRegister" style={{paddingLeft: "2%"}}>이름<span className="fontForRegister"
                                                                                       style={{color: "#FF2929"}}>*</span></a>
                    <div style={{flexDirection: "column", paddingLeft: '2%', marginBottom: "2.5rem", display: "flex"}}>
                        <input
                            disabled={true}
                            className="inputForRegister fontForRegister"
                            placeholder={" 이름을 입력해 주세요"}
                            style={{
                                height: '2.5rem',
                                paddingLeft: '2%',
                                fontSize: '0.625rem',
                                fontWeight: '300',
                                width: "92%"
                            }}
                            defaultValue={data.name}
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
                        defaultValue={data.email}
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
                            defaultValue={data.phoneNum}
                        />

                    </div>


                        <a style={{paddingLeft: "2%"}} className="fontForRegister">생년월일<span className="fontForRegister"
                                                                                             style={{color: "#FF2929"}}>*</span></a>

                        <div style={{paddingLeft: "2%", marginBottom: "2.5rem", display: 'flex'}}>

                            {data.birthday}
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
                                id="male"
                                checked={data.gender === "Male"}
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
                                id="female"
                                checked={data.gender === "Female"}
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
                        onClick={() => navigate(-1)}
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
                        onClick={() => navigate("/adminchefViewPage2", {state:data})}
                >다음
                </button>
            </div>
        </div>
        </div>
    )
};

export default AdminSignedUp;