import {Link, useLocation, useNavigate} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import axios from "axios";
import {BoardCategory} from "../utils/enums";
import Sidebar from "../components/home/Sidebar";
import HomeTemplate from "../components/home/HomeTemplate";
import Banner from "../components/Banner";
import ArticleListTemplate from "../components/board/ArticleListTemplate";

const Home = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const data = {...location.state};
    const [spaceData, setSpaceData] = useState([]);
    const [popupData, setPopupData] = useState([]);
    const [chatData, setChatData] = useState([]);
    const [recipeData, setRecipeData] = useState([]);
    const spaceRef = useRef();
    const boardRef = useRef();
    const mainPageRef = useRef();
    if(sessionStorage.getItem("user_id") == null){
        window.location.href = "/login";
    }
    const logOut = () => {
        axios.post("/api/v1/logout")
            .then(() => {
                sessionStorage.clear();
                window.location.href = "/login";
            }).catch((res)=>{
            console.error(res);
        });
    };
    const spaceFocus = () => { spaceRef.current?.scrollIntoView({ behavior: 'smooth' })};
    const boardFocus = () => { boardRef.current?.scrollIntoView({ behavior: 'smooth' })};

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
    useEffect(() => {
        if (data.focus === "space") spaceFocus();
        else if (data.focus === "board") boardFocus();
    }, [mainPageRef]); // 페이지 전환 후 스크롤 이동에 애먹고 있음
    return (
        <div ref={mainPageRef}>
            <div className="header" style={{backgroundColor:"white"}}> {/*헤더에 뒤로가기 버튼 집어넣기*/}
                <button className="button" onClick={spaceFocus}>대관하기</button>
                <button className="button" onClick={boardFocus}>커뮤니티</button>
            </div>
            <Sidebar/>
            <HomeTemplate />
            <div ref={spaceRef}>
                <p onClick={() => navigate("/spaceList")}>모두보기</p>
                <Banner dataSet={spaceData} navigate={navigate}/>
            </div>
            <div ref={boardRef}>
                <h1>팝업</h1>
                <p onClick={() => navigate("/popup")}>모두보기</p>
                <ArticleListTemplate postList={popupData} preview={true}/>
                <h1>잡담</h1>
                <p onClick={() => navigate("/chat")}>모두보기</p>
                <ArticleListTemplate postList={chatData} preview={true}/>
                <h1>레시피</h1>
                <p onClick={() => navigate("/recipe")}>모두보기</p>
                <ArticleListTemplate postList={recipeData} preview={true}/>
            </div>
            <button onClick={logOut}>로그아웃</button>
        </div>
    )
};const MainPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const data = {...location.state};
    const [spaceData, setSpaceData] = useState([]);
    const [popupData, setPopupData] = useState([]);
    const [chatData, setChatData] = useState([]);
    const [recipeData, setRecipeData] = useState([]);
    const spaceRef = useRef();
    const boardRef = useRef();
    const mainPageRef = useRef();
    if(sessionStorage.getItem("user_id") == null){
        window.location.href = "/login";
    }
    const logOut = () => {
        axios.post("/api/v1/logout")
            .then(() => {
                sessionStorage.clear();
                window.location.href = "/login";
            }).catch((res)=>{
            console.error(res);
        });
    };
    const spaceFocus = () => { spaceRef.current?.scrollIntoView({ behavior: 'smooth' })};
    const boardFocus = () => { boardRef.current?.scrollIntoView({ behavior: 'smooth' })};

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
    useEffect(() => {
        if (data.focus === "space") spaceFocus();
        else if (data.focus === "board") boardFocus();
    }, [mainPageRef]); // 페이지 전환 후 스크롤 이동에 애먹고 있음
    return (
        <div ref={mainPageRef}>
            <div className="header" style={{backgroundColor:"white"}}> {/*헤더에 뒤로가기 버튼 집어넣기*/}
                <button className="button" onClick={spaceFocus}>대관하기</button>
                <button className="button" onClick={boardFocus}>커뮤니티</button>
            </div>
            <Sidebar/>
            <HomeTemplate />
            <div ref={spaceRef}>
                <p onClick={() => navigate("/spaceList")}>모두보기</p>
                <Banner dataSet={spaceData} navigate={navigate}/>
            </div>
            <div ref={boardRef}>
                <h1>팝업</h1>
                <p onClick={() => navigate("/popup")}>모두보기</p>
                <ArticleListTemplate postList={popupData} preview={true}/>
                <h1>잡담</h1>
                <p onClick={() => navigate("/chat")}>모두보기</p>
                <ArticleListTemplate postList={chatData} preview={true}/>
                <h1>레시피</h1>
                <p onClick={() => navigate("/recipe")}>모두보기</p>
                <ArticleListTemplate postList={recipeData} preview={true}/>
            </div>
            <button onClick={logOut}>로그아웃</button>
        </div>
    )
};

export default Home;