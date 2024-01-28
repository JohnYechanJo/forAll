import { useNavigate,useLocation } from "react-router-dom";
import '../Styles.css';
import { useRef } from "react";
import "../../style/mainpage.css";
const Header = () => {
    const navigate = useNavigate();
    return (
        <div className="header" style={{ backgroundColor: "white",display:'flex',alignItems:'center' }}>
            <div style={{ position: 'absolute', left: '1rem', top: '0.76rem', backgroundColor: 'white' }}>
                <a style={{ fontFamily: 'Mukta', fontSize: '0.75rem', fontWeight: '700', letterSpacing: '-0.01031rem', border: '2px solid black' }}
                    onClick={() => navigate('/')}
                >For ALL.</a>
            </div>
            <button className="button" onClick={()=>navigate("/spaceList")}>대관하기</button>
            <button className="button" onClick={()=>navigate("/postList")}>커뮤니티</button>
        </div>
    )
};

export default Header;