import React, { useEffect, useRef, useState } from "react";
import styles from "./Sidebar.module.css";
import LoginTemplate from "./LoginTemplate";
import { Link } from "react-router-dom";   

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
                        <span>X</span> : <button className={styles.openBtn}>menu</button>
                    }
                </button>
                <div className={styles.content}>{children}</div>
                <Link to="/personalInfoModify">
                    <button>개인정보수정</button>
                </Link>
                <hr style={{width:0}}/>
                <Link to="/placeInfoModify">
                    <button>공간정보수정</button>
                <hr style={{width:0}}/>
                </Link>
                <button>게스트로 전환</button>
            </div>
        </div>
    );
};


export default Sidebar;