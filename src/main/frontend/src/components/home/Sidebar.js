import React, { useEffect, useRef, useState } from "react";
import styles from "../Sidebar.module.css";
import LoginTemplate from "../signup/LoginTemplate";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import sidebarIcon from "../../components/icons/sidebar.png";
import login from "../../components/icons/login.png";
import logout from "../../components/icons/logout.png";
import xmark from "../../components/icons/xmark.png";
import alarm from "../../components/icons/alarm.png";
import ImageViewer from "../ImageViewer";
import { ChefState, SpaceState } from "../../utils/enums";
const Sidebar = ({ width = 18.75, children }) => {
    const [userData, setUserData] = useState({});
    const [isOpen, setOpen] = useState(false);
    const [xPosition, setX] = useState(-width);
    const side = useRef();
    const navigate = useNavigate();
    const [profileImage, setProfileImage] = useState("");
    const id = sessionStorage.getItem("user_id");

    // button 클릭 시 토글
    const toggleMenu = () => {
        if (xPosition < 0) {
            setX(0);
            setOpen(true);
        } else {
            setX(-width);
            setOpen(false);
        }
    };
    const logIn = () => navigate("/login");
    const logOut = () => {
        axios.post("/api/v1/logout")
            .then(() => {
                sessionStorage.clear();
                window.location.href = "/";
            }).catch((res) => {
                console.error(res);
            });
    };
    const handleReservationList = () => {
        if (id === null) navigate("/login");
        else navigate("/reservationList");
    }
    const handleChatList = () => {
        if (id === null) navigate("/login");
        else navigate("/chatList");
    }
    const handleMyPost = () => {
        if (id === null) navigate("/login");
        else navigate("/mypost");
    }
    const handleChefRegistry = () => {
        if (id === null) navigate("/login");
        else if (userData.chefPending === ChefState.NOTCREATED) navigate("/chefRegistry");
        else {
            navigate("/alreadyChef");
        }
    }
    const handleSpaceRegistry = () => {
        if (id === null) navigate("/login");
        else if(userData.registedSpace) navigate("/placeInfoModifyStart");
        else navigate("/hostRegistry");
    }
    const handlePersonalInfoModify = () => {
        if (id === null) navigate("/login");
        else navigate("/personalInfoModify");
    }
    const handleChefModify = () => {
        if (id === null) navigate("/login");
        else if ([ChefState.PENDING, ChefState.APPROVE].includes(userData.chefPending)) navigate("/chefInfoModify");
        else {
            navigate("/chefRegistryFirst");
        }
    }
    const handleSpaceModify = () => {
        if (id === null) navigate("/login");
        else if (userData.registedSpace) navigate("/placeInfoModifyStart");
        else {
            navigate("/hostRegistryFirst");
        }
    }
    const handleServiceCenter = () => {
        if (id === null) navigate("/login");
        else navigate("/serviceChatRoom");
    }
    useEffect(() => {
        const userId = sessionStorage.getItem("user_id");
        if (userId) {
            axios.get("/api/v1/members/checkSession")
                .then(() => {
                        axios.get("/api/v1/members/public/" + userId)
                            .then((res) => {
                                setUserData(res.data);
                            })
                            .catch((err) => console.error(err));
                        axios.get("/api/v1/profile/" + userId)
                            .then((res) => {
                                setProfileImage(res.data.profilePhoto);
                            })
                            .catch((err) => console.error(err));
                })
                .catch(()=>logOut());

        }
    }, []);

    return (
        <div className={styles.container} style={{ display: "flex" }}>
            <div ref={side} className={styles.sidebar}
                style={{
                    width: `${width}rem`, height: '100vh', transform: `translatex(${-xPosition}rem)`,
                    fontSize: "0.875rem", fontWeight: "700", flexShrink: "0", textDecorationLine: "underline",
                    overflowY: 'auto', overflowX: 'hidden', scrollbarWidth: 'none',
                }}>
                    
                <div style={{
                    height: "15.625rem",
                    width: "100%",
                    border: "1px solid rgba(196,196,196,0.2)",
                    boxShadow: "4px -4px 4px 0px rgba(0, 0, 0, 0.25)", inset: "-4px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                }}>
                    <div style={{
                        display: "flex",
                        justifyContent: "flex-end",
                    }}>
                        <div style={{ backgroundColor: "transparent", marginRight: '1rem', marginTop: '1rem' }}>
                            <img src={alarm} alt="alarm" style={{ width: "0.99931rem", height: "1.5rem", marginRight: '1rem', objectFit: "contain" }} onClick={() => navigate("/allNotifications")} />
                            <img src={xmark} alt="xmark" style={{ width: "1.5rem", height: "1.5rem", objectFit: "contain" }} onClick={() => toggleMenu()} />
                        </div>
                    </div>
                    <div>
                        <div style={{ height: '5.25rem' }}>
                            <ImageViewer val={profileImage} style={{
                                width: '5.25rem', height: '5.25rem', borderRadius: '50%', flexShrink: '0', fill: '#FFF', strokeWidth: '1px', stroke: "#C4C4C4",
                                filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))', alignItems: "center", justifyContent: "center", display: "flex", margin: "auto"
                            }} /></div>
                        <p style={{ textAlign: 'center' }} > {id ? null : '로그인이 필요합니다.'}</p>
                        <p style={{ textAlign: "center" }}>{sessionStorage.getItem("name")}</p>
                        <p style={{ textAlign: "center" }}>{sessionStorage.getItem("email")}</p>
                    </div>
                </div>
                {id ?(<div style={{ display: "flex", flexDirection: "column", justifyContent: "left", }}>
                    <div style={{
                        height: "6.25rem", display: "flex", flexDirection: "row", border: "1px solid rgba(196,196,196,0.2)",
                        boxShadow: "4px -4px 4px 0px rgba(0, 0, 0, 0.25)", inset: "-4px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                        display: "flex", flexDirection: "column", justifyContent: "space-evenly", 
                    }}>
                        <button className="button" onClick={handleReservationList} style={{ textAlign: "left", marginLeft: "2rem" }}>예약 정보</button>
                        <button className="button" style={{ textAlign: "left", marginLeft: "2rem" }}>찜한 내역</button>
                    </div>
                    <div style={{
                        height: "6.25rem", display: "flex", flexDirection: "row", border: "1px solid rgba(196,196,196,0.2)",
                        boxShadow: "4px -4px 4px 0px rgba(0, 0, 0, 0.25)", inset: "-4px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                        display: "flex", flexDirection: "column", justifyContent: "space-evenly",
                    }} >
                        <button className="button" onClick={handleChefRegistry} style={{ textAlign: "left", marginLeft: "2rem" }}>셰프 등록하기</button>
                        <button className="button" onClick={handleSpaceRegistry} style={{ textAlign: "left", marginLeft: "2rem" }}>공간 등록하기</button>
                    </div>
                    <div style={{
                        height: "9.375rem", display: "flex", flexDirection: "row", border: "1px solid rgba(196,196,196,0.2)",
                        boxShadow: "4px -4px 4px 0px rgba(0, 0, 0, 0.25)", inset: "-4px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                        display: "flex", flexDirection: "column", justifyContent: "space-evenly", gap: "1rem"
                    }}>
                        <button className="button" onClick={handleChatList} style={{ textAlign: "left", marginLeft: "2rem" }}>채팅함</button>
                        <button className="button" onClick={handleServiceCenter} style={{ textAlign: "left", marginLeft: "2rem" }} >고객센터</button>
                        <button className="button" onClick={handleMyPost} style={{ textAlign: "left", marginLeft: "2rem" }}>내가 쓴 글</button>
                    </div>
                    <div style={{
                        height: "9.375rem", display: "flex", flexDirection: "row", border: "1px solid rgba(196,196,196,0.2)",
                        boxShadow: "4px -4px 4px 0px rgba(0, 0, 0, 0.25)", inset: "-4px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                        display: "flex", flexDirection: "column", justifyContent: "space-evenly", gap: "1rem"
                    }}>
                        <button className="button" onClick={handlePersonalInfoModify} style={{ textAlign: "left", marginLeft: "2rem" }}>개인정보 수정</button>
                        <button className="button" onClick={handleChefModify} style={{ textAlign: "left", marginLeft: "2rem" }} >셰프 정보수정</button>
                        <button className="button" onClick={handleSpaceModify} style={{ textAlign: "left", marginLeft: "2rem" }}>공간 정보수정</button>
                    </div>
                    <div style={{
                        height: "2rem", display: "flex", flexDirection: "row",
                        boxShadow: "4px -4px 4px 0px rgba(0, 0, 0, 0.25)", inset: "-4px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                        display: "flex", flexDirection: "column", justifyContent: "space-around", gap: "1.37rem", marginBottom: '2rem'
                    }}>
                        {sessionStorage.getItem("user_id") ? (<div onClick={logOut} style={{display:'flex',justifyContent:'flex-start',alignItems:'center',marginTop:'1rem'}}>
                            <img src={logout} alt="logout" style={{ height: "1.125rem", width: "0.875rem",  border: 'none', backgroundColor: 'white', fontSize: '0.875rem', fontWeight: '700', marginLeft: '2rem' }} />
                            <a style={{ marginLeft: '0.5rem' }}>로그아웃</a>
                        </div>) : (<div onClick={logIn} style={{display:'flex',justifyContent:'flex-start',alignItems:'center'}}>
                            <img src={login} alt="login" style={{ height: "1.125rem", width: "0.875rem", margin: "auto", border: 'none', backgroundColor: 'white', fontSize: '0.875rem', fontWeight: '700', marginLeft: '2rem' }} />
                            <a style={{ marginLeft: '0.5rem' }}>로그인 ㅣ 회원가입</a>
                        </div>)}
                    </div>
                </div>) : (<div onClick={logIn} style={{display:'flex',justifyContent:'center',alignItems:'center'}} >
                            <img src={login} alt="login" style={{ height: "1.125rem", width: "0.875rem",marginRight:'0.5rem' ,border: 'none', backgroundColor: 'white', fontSize: '0.875rem', fontWeight: '700' }} />
                            <a >로그인 ㅣ 회원가입</a>
                        </div>)}
            </div>
            <button onClick={() => toggleMenu()}
                className={styles.button + styles.sidebar}
                style={{ alignItems: "center", backgroundColor: "transparent", border: "none", right: '1rem', top: '1rem', position: 'fixed', transition: '0.8s ease', zIndex: '999' }}
            >
                {isOpen ?
                    <span></span> : <div className={styles.openBtn} style={{ alignContent: "center", justifyContent: "center", display: "flex", alignItems: "center" }} >
                        <img src={sidebarIcon} alt="sidebar" style={{ width: "1.125rem", height: "0.875rem", margin: "auto" }} />
                    </div>
                }
            </button>
            
        </div>
    );
};


export default Sidebar;