import Header from "../components/Header";
import HostSidebar from "../components/home/HostSidebar";
import axios from "axios";
import {user_role} from "../utils/enums";
import GuestHomeTemplate from "../components/home/GuestHomeTemplate";
import HostHomeTemplate from "../components/home/HostHomeTemplate";
import GuestSidebar from "../components/home/GuestSidebar";
import "../style/mainpage.css";

const MainPage = () => {
    if(sessionStorage.getItem("user_id") == null){
        window.location.href = "/login";
    }
    const role = sessionStorage.getItem("role");
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
            <div className={"header"}>
                <button>대관하기</button>
                <button>크루 열기</button>
                <button>크루지원하기</button>
            </div>
            {role === user_role.GUEST ? <GuestHomeTemplate />: <HostHomeTemplate />}
            {role === user_role.GUEST ? <GuestSidebar/>: <HostSidebar />}
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
            <button onClick={() => logOut()}>로그아웃</button>
            <div className={"footer"}>
                <button>검색</button>
                <button>찜</button>
                <button>채팅</button>
                <button>프로필</button>
            </div>
        </div>
    )
};
export default MainPage;