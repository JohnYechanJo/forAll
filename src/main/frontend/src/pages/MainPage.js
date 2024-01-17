import Header from "../components/Header";
import axios from "axios";
import {BoardCategory, user_role} from "../utils/enums";
import HomeTemplate from "../components/home/HomeTemplate";
import Sidebar from "../components/home/Sidebar";
import "../style/mainpage.css";
import {useEffect, useState} from "react";
import ArticleListTemplate from "../components/board/ArticleListTemplate";

const MainPage = () => {
    const [popupData, setPopupData] = useState([]);
    const [chatData, setChatData] = useState([]);
    const [recipeData, setRecipeData] = useState([]);
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
    useEffect(() => {
        axios.get("/api/v1/articles/category/" + BoardCategory.Popup)
            .then((res) => setPopupData(res.data))
            .catch((err) => console.error(err));
        axios.get("/api/v1/articles/category/" + BoardCategory.Chat)
            .then((res) => setChatData(res.data))
            .catch((err) => console.error(err));
        axios.get("/api/v1/articles/category/" + BoardCategory.Recipe)
            .then((res) => setRecipeData(res.data))
            .catch((err) => console.error(err));
    }, []);
    return (
        <div>
            <div className="header" style={{backgroundColor:"white"}}> {/*헤더에 뒤로가기 버튼 집어넣기*/}
                <button className="button">대관하기</button>
                <button className="button">크루 열기</button>
                <button className="button">크루지원하기</button>

            </div>
            <HomeTemplate />
            <Sidebar/>
            <div>
                <h1>팝업</h1>
                <p>모두보기</p>
                <ArticleListTemplate category={BoardCategory.Popup} postList={popupData} preview={false}/>
                <h1>잡담</h1>
                <p>모두보기</p>
                <ArticleListTemplate category={BoardCategory.Chat} postList={chatData} preview={true}/>
                <h1>레시피</h1>
                <p>모두보기</p>
                <ArticleListTemplate category={BoardCategory.Recipe} postList={recipeData} preview={true}/>

            </div>
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