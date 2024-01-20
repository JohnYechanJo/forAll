import React, { useEffect, useRef, useState } from "react";
import styles from "../Sidebar.module.css";
import LoginTemplate from "../signup/LoginTemplate";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";
import sidebarIcon from "../../components/icons/sidebar.png";
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
    return (
        <div className={styles.container}>
            <div ref={side} className={styles.sidebar}
                 style={{width: `${width}rem`, height: '52.75rem', transform: `translatex(${-xPosition}rem)`, 
                 fontSize:"0.875rem", fontWeight:"700",flexShrink:"0",textDecorationLine:"underline"
                 }}>
                <button onClick={() => toggleMenu()}
                        className={styles.button}
                        style={{alignItems:"center",backgroundColor:"transparent",border:"none"}}
                >
                    {isOpen ?
                        <span></span> : <div className={styles.openBtn} style={{alignContent:"center",justifyContent:"center", display: "flex", alignItems: "center"}} >
                            <img src={sidebarIcon} alt="sidebar" style={{width:"1.125rem", height:"0.875rem", margin: "auto"}} />
                        </div> //메뉴 아이콘 집어넣어야 함
                    }
                </button>
                <div style={{
                    height: "15.625rem",
                    width: "100%",
                    border:"1px solid rgba(196,196,196,0.2)",
                    boxShadow:"4px -4px 4px 0px rgba(0, 0, 0, 0.25)", inset:"-4px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                }}>
                    <div style={{
                        display: "flex",
                        justifyContent:"flex-end"
                    }}>
                        <button onClick={() => toggleMenu()} className="button"
                                style={{backgroundColor: "transparent", width: "10vw", height: "5vh", fontSize:"20px"}}>X
                        </button>
                    </div>
                    <div>
                        <h3 style={{textAlign: "center"}}>{sessionStorage.getItem("name")}</h3>
                        <h3 style={{textAlign:"center"}}>{sessionStorage.getItem("email")}</h3>
                    </div>
                </div>
                <div style={{display:"flex",flexDirection:"column", justifyContent:"left"}}>
                    <div style={{height:"6.25rem",display:"flex",flexDirection:"row",border:"1px solid rgba(196,196,196,0.2)",
                    boxShadow:"4px -4px 4px 0px rgba(0, 0, 0, 0.25)", inset:"-4px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                    display:"flex",flexDirection:"column",justifyContent:"space-around",gap:"1.37rem"
                }}>
                        <button className="button" style={{textAlign:"left",marginLeft:"2rem"}}>예약 정보</button>
                        <button className="button" style={{textAlign:"left",marginLeft:"2rem"}}>찜한내역</button>
                    </div>
                    <div style={{height:"6.25rem",display:"flex",flexDirection:"row",border:"1px solid rgba(196,196,196,0.2)",
                    boxShadow:"4px -4px 4px 0px rgba(0, 0, 0, 0.25)", inset:"-4px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                    display:"flex",flexDirection:"column",justifyContent:"space-around",gap:"1.37rem"
                }} >
                        <Link to="/guestRegistryStart">
                            <button className="button"  style={{textAlign:"left",marginLeft:"2rem"}}>셰프 등록하기</button>
                        </Link>
                        <Link to="/HostRegistry">
                            <button className="button" style={{textAlign:"left",marginLeft:"2rem"}}>공간 등록하기</button>
                        </Link>
                    </div>
                    <div style={{height:"9.375rem",display:"flex",flexDirection:"row",border:"1px solid rgba(196,196,196,0.2)",
                    boxShadow:"4px -4px 4px 0px rgba(0, 0, 0, 0.25)", inset:"-4px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                    display:"flex",flexDirection:"column",justifyContent:"space-around",gap:"1.37rem"
                }}>
                        <button className="button" style={{textAlign:"left",marginLeft:"2rem"}}>채팅함</button>
                        <button className="button" style={{textAlign:"left",marginLeft:"2rem"}} >고객센터</button>
                        <button className="button" style={{textAlign:"left",marginLeft:"2rem"}} >내가 쓴 글</button>
                    </div>
                    <div style={{height:"9.375rem",display:"flex",flexDirection:"row",border:"1px solid rgba(196,196,196,0.2)",
                    boxShadow:"4px -4px 4px 0px rgba(0, 0, 0, 0.25)", inset:"-4px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                    display:"flex",flexDirection:"column",justifyContent:"space-around",gap:"1.37rem"
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
                </div>
                

            </div>
        </div>
    );
};


export default Sidebar;