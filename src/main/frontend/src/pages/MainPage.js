import axios from "axios";
import { BoardCategory } from "../utils/enums";
import HomeTemplate from "../components/home/HomeTemplate";
import Sidebar from "../components/home/Sidebar";
import "../style/mainpage.css";
import { useEffect, useState, useRef } from "react";
import Banner from "../components/./Banner";
import { useLocation, useNavigate } from "react-router-dom";
import ImageViewer from "../components/ImageViewer";
import ArticleListTemplate from "../components/board/ArticleListTemplate";
import ToolBar from "../components/home/ToolBar";
import Header from "../components/home/Header";
import Footer from "../components/home/Footer";
const MainPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const data = { ...location.state };
    const [spaceData, setSpaceData] = useState([]);
    const [popupData, setPopupData] = useState([]);
    const [chatData, setChatData] = useState([]);
    const [recipeData, setRecipeData] = useState([]);
    const spaceRef = useRef();
    const boardRef = useRef();
    const mainPageRef = useRef();
    const spaceFocus = () => { spaceRef.current?.scrollIntoView({ behavior: 'smooth' }) };
    const boardFocus = () => { boardRef.current?.scrollIntoView({ behavior: 'smooth' }) };

    useEffect(() => {
        axios.get("/api/v1/space/isPublic")
            .then((res) => setSpaceData(res.data))
            .catch((err) => console.error(err));
        axios.get("/api/v1/articles/category/" + BoardCategory.Popup)
            .then((res) => setPopupData(res.data.sort((a, b) => {
                if (a.writtenAt > b.writtenAt) return -1;
                else return 1;
            }).slice(0, 3)))
            .catch((err) => console.error(err));
        axios.get("/api/v1/articles/category/" + BoardCategory.Chat)
            .then((res) => setChatData(res.data.sort((a, b) => {
                if (a.writtenAt > b.writtenAt) return -1;
                else return 1;
            }).slice(0, 3)))
            .catch((err) => console.error(err));
        axios.get("/api/v1/articles/category/" + BoardCategory.Recipe)
            .then((res) => setRecipeData(res.data.sort((a, b) => {
                if (a.writtenAt > b.writtenAt) return -1;
                else return 1;
            }).slice(0, 3)))
            .catch((err) => console.error(err));
    }, []);


    useEffect(() => {
        if (data.focus === "space") spaceFocus();
        else if (data.focus === "board") boardFocus();
    }, [mainPageRef]); // 페이지 전환 후 스크롤 이동에 애먹고 있음
    return (
        <div ref={mainPageRef}>
            <Header />
            <Sidebar />
            <ToolBar />
            <HomeTemplate />
            <div ref={spaceRef} >
                <p style={{justifyContent: 'right', display: 'flex', fontSize: "0.9375rem", textDecorationLine: "underline", fontStyle: 'normal',
                    fontWeight: '400', lineHeight: 'normal', letterSpacing: '-0.01031rem',
                    marginRight: '0.5rem'}} onClick={() => navigate("/spaceList")}>모두보기</p>
                <Banner dataSet={spaceData} navigate={navigate} />
            </div>
            <div ref={boardRef}>
                <div style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    border: '1px solid rgba(196, 196, 196, 0.20)', background: '#FFF',
                    width: '100%', height: '3.125rem', flexShrink: 0}}>
                    <a style={{fontSize: "1.25rem", fontStyle: 'normal', fontWeight: '400',
                        lineHeight: 'normal', letterSpacing: '-0.01031rem', marginLeft: '0.1rem'}}>&ensp;• 팝업</a>
                    <a onClick={() => navigate("/popup")}
                        style={{
                            fontSize: "0.9375rem", textDecorationLine: "underline", fontStyle: 'normal',
                            fontWeight: '400', lineHeight: 'normal', letterSpacing: '-0.01031rem',
                            marginRight: '0.5rem'
                        }}>모두보기</a>
                </div>
                <ArticleListTemplate postList={popupData} preview={true} />
                <div style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    border: '1px solid rgba(196, 196, 196, 0.20)', background: '#FFF',
                    width: '100%', height: '3.125rem', flexShrink: 0}}>
                    <a style={{fontSize: "1.25rem", fontStyle: 'normal', fontWeight: '400',
                        lineHeight: 'normal', letterSpacing: '-0.01031rem', marginLeft: '0.1rem'}}>&ensp;• 잡담</a>
                    <a onClick={() => navigate("/chat")}
                        style={{
                            fontSize: "0.9375rem", textDecorationLine: "underline", fontStyle: 'normal',
                            fontWeight: '400', lineHeight: 'normal', letterSpacing: '-0.01031rem',
                            marginRight: '0.5rem'
                        }}>모두보기</a>
                </div>
                <ArticleListTemplate postList={chatData} preview={true} />
                <div style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    border: '1px solid rgba(196, 196, 196, 0.20)', background: '#FFF',
                    width: '100%', height: '3.125rem', flexShrink: 0}}>
                    <a style={{fontSize: "1.25rem", fontStyle: 'normal', fontWeight: '400',
                        lineHeight: 'normal', letterSpacing: '-0.01031rem', marginLeft: '0.1rem'}}>&ensp;• 레시피</a>
                    <a onClick={() => navigate("/recipe")}
                        style={{
                            fontSize: "0.9375rem", textDecorationLine: "underline", fontStyle: 'normal',
                            fontWeight: '400', lineHeight: 'normal', letterSpacing: '-0.01031rem',
                            marginRight: '0.5rem'
                        }}>모두보기</a>
                </div>
                <ArticleListTemplate postList={recipeData} preview={true} />
            </div>
            <Footer />
        </div>
    )
};
export default MainPage;