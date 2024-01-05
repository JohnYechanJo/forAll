import Header from "../components/Header";
import HostSidebar from "../components/HostSidebar";
import axios from "axios";
import {user_role} from "../utils/enums";
import GuestHomeTemplate from "../components/GuestHomeTemplate";
import HostHomeTemplate from "../components/HostHomeTemplate";
import GuestSidebar from "../components/GuestSidebar";

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
            <Header PageName={"홈화면"} />
            {role === user_role.GUEST ? <GuestHomeTemplate />: <HostHomeTemplate />}
            {role === user_role.GUEST ? <GuestSidebar/>: <HostSidebar />}
            <button onClick={() => logOut()}>로그아웃</button>
        </div>
    )
};
export default MainPage;