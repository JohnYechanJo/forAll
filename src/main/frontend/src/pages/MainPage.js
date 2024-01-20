import Header from "../components/Header";
import axios from "axios";
import {user_role} from "../utils/enums";
import HomeTemplate from "../components/home/HomeTemplate";
import Sidebar from "../components/home/Sidebar";
import "../style/mainpage.css";
import {useNavigate} from "react-router-dom";

const MainPage = () => {
    const navigate = useNavigate();
    if(sessionStorage.getItem("user_id") == null){
        window.location.href = "/login";
    }
    const logOut = () => {
        axios.post("/api/v1/logout")
            .then(() => {
                sessionStorage.clear();
                window.location.href = "/login";
            }).catch((res)=>{
            console.log(res);
        });
    };
    return (
        <div>
            <div className="header" style={{backgroundColor:"white"}}> {/*헤더에 뒤로가기 버튼 집어넣기*/}
                <button className="button">대관하기</button>
                <button className="button">크루 열기</button>
                <button className="button">크루지원하기</button>

            </div>
            <HomeTemplate />
            <Sidebar/>
            <ol>
                <li>a</li>
                <li>b</li>
                <li>c</li>
                <li>d</li>
                <li>e</li>
                <li>f</li>
                <li>g</li>
                <li>h</li>
            </ol>
            <button onClick={logOut}>로그아웃</button>
            <div className="footer">
                <button>검색</button>
                <button>찜</button>
                <button>채팅</button>
                <button>프로필</button>
            </div>
        </div>
    )
};
export default MainPage;