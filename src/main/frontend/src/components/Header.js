import { useNavigate } from "react-router-dom";
import './Styles.css';
import { useRef } from "react";
import "../style/mainpage.css";
const Header = () => {
    const navigate = useNavigate();
    const spaceRef = useRef();
    const boardRef = useRef();
    const spaceFocus = () => { spaceRef.current?.scrollIntoView({ behavior: 'smooth' }) };
    const boardFocus = () => { boardRef.current?.scrollIntoView({ behavior: 'smooth' }) };
    return (
        <div className="header" style={{ backgroundColor: "white" }}>
            <div style={{ position: 'absolute', left: '1rem', top: '1.1rem', backgroundColor: 'white' }}>
                <a style={{ fontFamily: 'Mukta', fontSize: '0.75rem', fontWeight: '700', letterSpacing: '-0.01031rem', border: '2px solid black' }}
                    onClick={() => navigate('/')}
                >For ALL.</a>
            </div>
            <button className="button" onClick={spaceFocus}>대관하기</button>
            <button className="button" onClick={boardFocus}>커뮤니티</button>
        </div>
    )
};

export default Header;