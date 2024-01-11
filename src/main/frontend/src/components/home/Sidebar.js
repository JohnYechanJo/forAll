import React, { useEffect, useRef, useState } from "react";
import styles from "../Sidebar.module.css";
import LoginTemplate from "../signup/LoginTemplate";
import { Link } from "react-router-dom";
import {user_role} from "../../utils/enums";

const Sidebar = ({ width = 280, children }) => {
    const [isOpen, setOpen] = useState(false);
    const [xPosition, setX] = useState(-width);
    const side = useRef();

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
                 style={{width: `${width}px`, height: '100%', transform: `translatex(${-xPosition}px)`}}>
                <button onClick={() => toggleMenu()}
                        className={styles.button}>
                    {isOpen ?
                        <span></span> : <div className={styles.openBtn}>ㅡ</div> //메뉴 아이콘 집어넣어야 함
                    }
                </button>
                <div style={{
                    height: "30%",
                    width: "100%",
                    backgroundColor: "crimson",
                    color: "white",
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
                        <h3 style={{textAlign: "center"}}>포 올</h3>
                        <h4 style={{textAlign:"center"}}>email</h4>
                    </div>
                </div>
                <div className={styles.content}>{children}</div>
                <hr style={{width: 0}}/>
                <button className="button" style={{textAlign: "left"}}>찜한 내역</button>
                <hr style={{width: "100%", color: "black"}}/>
                <Link to="/guestRegistryStart">
                    <button className="button" style={{textAlign:"left"}} >프로필 등록하기</button>
                </Link>
                <hr style={{width: 0}}/>
                <Link to="/HostRegistryStart">
                    <button className="button" style={{textAlign:"left", width:"35vw"}}>공간정보 등록하기</button>
                </Link>
                <hr style={{width: "100%", color: "black"}}/>
                <Link to="/placeInfoModify">
                    <button className="button" style={{textAlign:"left"}}>공간정보수정</button>
                </Link>
                <hr style={{width: 0}}/>
                <button className="button" style={{textAlign:"left"}}>프로필정보 수정</button>
                <hr style={{width: 0}}/>
                <Link to="/personalInfoModify">
                    <button className="button" style={{textAlign:"left"}}>개인정보수정</button>
                </Link>
            </div>
        </div>
    );
};


export default Sidebar;