import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import axios from "axios";

const MainPage = () => {
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
            <Header PageName={"홈화면"} />
            <Sidebar />
            <button onClick={() => logOut()}>로그아웃</button>
        </div>
    )
};
export default MainPage;