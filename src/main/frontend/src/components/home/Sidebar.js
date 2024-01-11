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
            <div ref={side} className={styles.sidebar} style={{ width: `${width}px`, height: '100%', transform: `translatex(${-xPosition}px)` }}>
                <button onClick={() => toggleMenu()}
                        className={styles.button} >
                    {isOpen ?
                        <span>X</span> : <div className={styles.openBtn}>menu</div>
                    }
                </button>
                <div className={styles.content}>{children}</div>
                <Link to="/personalInfoModify">
                    <button>개인정보수정</button>
                </Link>
                <hr style={{width: 0}}/>
                <button>찜한 내역</button>
                <hr style={{width: "100%", color: "black"}}/>
                <Link to="/guestRegistryStart">
                    <button>프로필 등록하기</button>
                </Link>
                <hr style={{width:0}}/>
                <Link to="/HostRegistryStart">
                    <button>공간정보 등록하기</button>
                </Link>
                <hr style={{width:"100%", color:"black"}}/>
                <Link to="/placeInfoModify">
                    <button>공간정보수정</button>
                </Link>
            </div>
        </div>
    );
};


export default Sidebar;