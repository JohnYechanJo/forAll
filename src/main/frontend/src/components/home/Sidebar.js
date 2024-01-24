import React, { useEffect, useRef, useState } from "react";
import styles from "../Sidebar.module.css";
import LoginTemplate from "../signup/LoginTemplate";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";
import sidebarIcon from "../../components/icons/sidebar.png";
import login from "../../components/icons/login.png";
import logout from "../../components/icons/logout.png";
import xmark from "../../components/icons/xmark.png";
import alarm from "../../components/icons/alarm.png";
const Sidebar = ({ width = 18.75, children }) => {
    const [isOpen, setOpen] = useState(false);
    const [xPosition, setX] = useState(-width);
    const side = useRef();
    const navigate = useNavigate();
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
            }).catch((res)=>{
            console.error(res);
        });
    };
    // 대표이미지 불러와서 띄우기

    return (
        <div className={styles.container}>
            <div ref={side} className={styles.sidebar}
                 style={{width: `${width}rem`, height: '100vh', transform: `translatex(${-xPosition}rem)`, 
                 fontSize:"0.875rem", fontWeight:"700",flexShrink:"0",textDecorationLine:"underline"
                 }}>
                <button onClick={() => toggleMenu()}
                        className={styles.button}
                        style={{alignItems:"center",backgroundColor:"transparent",border:"none"}}
                >
                    {isOpen ?
                        <span></span> : <div className={styles.openBtn} style={{alignContent:"center",justifyContent:"center", display: "flex", alignItems: "center"}} >
                            <img src={sidebarIcon} alt="sidebar" style={{width:"1.125rem", height:"0.875rem", margin: "auto"}} />
                        </div>
                    }
                </button>
                <div style={{
                    height: "13.625rem",
                    width: "100%",
                    border:"1px solid rgba(196,196,196,0.2)",
                    boxShadow:"4px -4px 4px 0px rgba(0, 0, 0, 0.25)", inset:"-4px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                }}>
                    <div style={{
                        display: "flex",
                        justifyContent:"flex-end",
                    }}>
                        <div style={{backgroundColor: "transparent",marginRight:'1rem'}}>
                            <img src={alarm} alt="alarm" style={{width: "0.99931rem", height: "1.5rem",marginRight:'1rem', objectFit: "contain"}} />
                            <img src={xmark} alt="xmark" style={{width:"1.5rem", height:"1.5rem", objectFit: "contain"}} onClick={() => toggleMenu()}  />
                        </div>
                    </div>
                    <div>
                        <div style={{width:'5.25rem',height:'5.25rem',borderRadius:'50%',flexShrink:'0',fill:'#FFF',strokeWidth:'1px',stroke:"#C4C4C4",
                    filter:'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',alignItems:"center",justifyContent:"center", display: "flex", margin: "auto"
                    }}>
                        {/* 이 자리에 불러온 대표이미지를 넣으면 됨 */}
                        </div>
                        <p style={{textAlign: "center"}}>{sessionStorage.getItem("name")}</p>
                        <p style={{textAlign:"center"}}>{sessionStorage.getItem("email")}</p>
                    </div>
                </div>
                <div style={{display:"flex",flexDirection:"column", justifyContent:"left"}}>
                    <div style={{height:"5.25rem",display:"flex",flexDirection:"row",border:"1px solid rgba(196,196,196,0.2)",
                    boxShadow:"4px -4px 4px 0px rgba(0, 0, 0, 0.25)", inset:"-4px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                    display:"flex",flexDirection:"column",justifyContent:"space-around",gap:"1rem"
                }}>
                        <button className="button" style={{textAlign:"left",marginLeft:"2rem"}}>예약 정보</button>
                        <button className="button" style={{textAlign:"left",marginLeft:"2rem"}}>찜한내역</button>
                    </div>
                    <div style={{height:"5.25rem",display:"flex",flexDirection:"row",border:"1px solid rgba(196,196,196,0.2)",
                    boxShadow:"4px -4px 4px 0px rgba(0, 0, 0, 0.25)", inset:"-4px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                    display:"flex",flexDirection:"column",justifyContent:"space-around",gap:"rem"
                }} >
                        <Link to="/chefRegistry">
                            <button className="button"  style={{textAlign:"left",marginLeft:"2rem"}}>셰프 등록하기</button>
                        </Link>
                        <Link to="/hostRegistry">
                            <button className="button" style={{textAlign:"left",marginLeft:"2rem"}}>공간 등록하기</button>
                        </Link>
                    </div>
                    <div style={{height:"7.375rem",display:"flex",flexDirection:"row",border:"1px solid rgba(196,196,196,0.2)",
                    boxShadow:"4px -4px 4px 0px rgba(0, 0, 0, 0.25)", inset:"-4px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                    display:"flex",flexDirection:"column",justifyContent:"space-around",gap:"1rem"
                }}>
                        <Link to="/chatList">
                            <button className="button" style={{textAlign:"left",marginLeft:"2rem"}}>채팅함</button>
                        </Link>
                            <button className="button" style={{textAlign:"left",marginLeft:"2rem"}} >고객센터</button>
                        <Link to="/mypost">
                            <button className="button" style={{textAlign:"left",marginLeft:"2rem"}} >내가 쓴 글</button>
                        </Link>
                    </div>
                    <div style={{height:"7.375rem",display:"flex",flexDirection:"row",border:"1px solid rgba(196,196,196,0.2)",
                    boxShadow:"4px -4px 4px 0px rgba(0, 0, 0, 0.25)", inset:"-4px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                    display:"flex",flexDirection:"column",justifyContent:"space-around",gap:"1rem"
                }}>
                        <Link to="/personalInfoModify">
                            <button className="button" style={{textAlign:"left",marginLeft:"2rem"}}>개인 정보수정</button>
                        </Link>
                        <Link to="/chefInfoModify">
                            <button className="button"style={{textAlign:"left",marginLeft:"2rem"}} >셰프 정보수정</button>
                        </Link>
                        <Link to="/placeInfoModifyStart">
                            <button className="button" style={{textAlign:"left",marginLeft:"2rem"}}>공간 정보수정</button>
                        </Link>
                    </div>
                    <div style={{height:"2rem",display:"flex",flexDirection:"row",border:"1px solid rgba(196,196,196,0.2)",
                    boxShadow:"4px -4px 4px 0px rgba(0, 0, 0, 0.25)", inset:"-4px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                    display:"flex",flexDirection:"column",justifyContent:"space-around",gap:"1.37rem"
                }}>
                    {sessionStorage.getItem("user_id") ? (<div onClick={logOut}>
                        <img src={logout} alt="logout" style={{height:"1.125rem", width:"0.875rem", margin: "auto",border:'none',backgroundColor:'white',fontSize:'0.875rem',fontWeight:'700',marginLeft:'2rem'}} />
                        <a style={{marginLeft:'0.5rem'}}>로그아웃</a>
                        </div>) : (<div onClick={logIn}>
                        <img src={login}alt="login" style={{height:"1.125rem", width:"0.875rem", margin: "auto",border:'none',backgroundColor:'white',fontSize:'0.875rem',fontWeight:'700',marginLeft:'2rem'}} />
                        <a style={{marginLeft:'0.5rem'}}>로그인 ㅣ 회원가입</a>
                        </div>)}
                </div>
                </div>
                

            </div>
        </div>
    );
};


export default Sidebar;