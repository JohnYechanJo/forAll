import axios from "axios";
import {BoardCategory, MainPageType} from "../utils/enums";
import HomeTemplate from "../components/home/HomeTemplate";
import Sidebar from "../components/home/Sidebar";
import "../style/mainpage.css";
import {useEffect, useState} from "react";
import Banner from "../components/./Banner";
import {useNavigate} from "react-router-dom";
import ImageViewer from "../components/ImageViewer";
import ArticleListTemplate from "../components/board/ArticleListTemplate";

const MainPage = () => {
    const navigate = useNavigate();
    const [pageType, setPageType] = useState(MainPageType.BASIC);
    const [spaceData, setSpaceData] = useState([]);
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
    // 첫 페이지 랜딩 시에만 공간 정보를 불러옴
    useEffect(() => {
        axios.get("/api/v1/space/isPublic")
            .then((res) => setSpaceData(res.data))
            .catch((err) => console.error(err));
        axios.get("/api/v1/articles/category/" + BoardCategory.Popup)
            .then((res) => setPopupData(res.data.sort((a,b) => {
                if(a.writtenAt > b.writtenAt) return -1;
                else return 1;
            }).slice(0,3)))
            .catch((err) => console.error(err));
        axios.get("/api/v1/articles/category/" + BoardCategory.Chat)
            .then((res) => setChatData(res.data.sort((a,b) => {
                if(a.writtenAt > b.writtenAt) return -1;
                else return 1;
            }).slice(0,3)))
            .catch((err) => console.error(err));
        axios.get("/api/v1/articles/category/" + BoardCategory.Recipe)
            .then((res) => setRecipeData(res.data.sort((a,b) => {
                if(a.writtenAt > b.writtenAt) return -1;
                else return 1;
            }).slice(0,3)))
            .catch((err) => console.error(err));
    }, []);

    return (
        <div>
            <div className="header" style={{backgroundColor:"white"}}> {/*헤더에 뒤로가기 버튼 집어넣기*/}
                <button className="button" onClick={() => setPageType(MainPageType.SPACE)}>대관하기</button>
                <button className="button">커뮤니티</button>
            </div>
            <Sidebar/>
            <HomeTemplate />
            {[MainPageType.BASIC, MainPageType.SPACE].includes(pageType) ?(<div>
                <p onClick={() => setPageType(MainPageType.SPACE)}>모두보기</p>
                <Banner dataSet={spaceData} navigate={navigate}/>
            </div>) : null}
            {pageType === MainPageType.SPACE ? (
                <div>
                    {spaceData.map((data, idx) =>
                        (<div key={idx}>
                            <ImageViewer val={data.mainImage} />
                            <p>{data.priceSet}원</p>
                            <p>{data.address} | {data.name}</p>
                        </div>)
                    )}
                </div>
            ) : null}
            {pageType === MainPageType.BASIC ? (
                <div>
                    <h1>팝업</h1>
                    <p onClick={() => navigate("/popup")}>모두보기</p>
                    <ArticleListTemplate category={BoardCategory.Popup} postList={popupData} preview={true}/>
                    <h1>잡담</h1>
                    <p onClick={() => navigate("/chat")}>모두보기</p>
                    <ArticleListTemplate category={BoardCategory.Chat} postList={chatData} preview={true}/>
                    <h1>레시피</h1>
                    <p onClick={() => navigate("/recipe")}>모두보기</p>
                    <ArticleListTemplate category={BoardCategory.Recipe} postList={recipeData} preview={true}/>
                </div>
            ) : null}
            <button onClick={logOut}>로그아웃</button>
        </div>
    )
};
export default MainPage;