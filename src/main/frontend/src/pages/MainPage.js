import axios from "axios";
import {BoardCategory} from "../utils/enums";
import HomeTemplate from "../components/home/HomeTemplate";
import Sidebar from "../components/home/Sidebar";
import "../style/mainpage.css";
import {useEffect, useState, useRef} from "react";
import Banner from "../components/./Banner";
import {useLocation, useNavigate} from "react-router-dom";
import ImageViewer from "../components/ImageViewer";
import ArticleListTemplate from "../components/board/ArticleListTemplate";
import ToolBar from "../components/home/ToolBar";
const MainPage = () => {
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
                {/* <button className="button" onClick={() => navigate("/")}>
                    <img src={forAllLogo} alt="forAllLogo" style={{width:"1.875rem", height:"1.875rem"}} />
                </button> */}
                <button className="button" onClick={spaceFocus}>대관하기</button>
                <button className="button" onClick={boardFocus}>커뮤니티</button>
            </div>
            <Sidebar/>
            <ToolBar/>
            <HomeTemplate />
            <div ref={spaceRef}>
                <p onClick={() => navigate("/spaceList")}>모두보기</p>
                <Banner dataSet={spaceData} navigate={navigate}/>
            </div>
            <div ref={boardRef}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    border: '1px solid rgba(196, 196, 196, 0.20)', background: '#FFF',
                    width: '100%', height: '3.125rem', flexShrink: 0}}>
                    <a style={{fontSize: "1.25rem", fontStyle: 'normal', fontWeight: '400',
                        lineHeight: 'normal', letterSpacing: '-0.01031rem'}}>• 팝업</a>
                    <a onClick={() => navigate("/popup")}
                       style={{fontSize: "0.9375rem", textDecorationLine: "underline", fontStyle: 'normal',
                           fontWeight: '400', lineHeight: 'normal', letterSpacing: '-0.01031rem',
                           marginRight: '0.5rem'}}>모두보기</a>
                </div>
                <ArticleListTemplate postList={popupData} preview={true}/>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    border: '1px solid rgba(196, 196, 196, 0.20)', background: '#FFF',
                    width: '100%', height: '3.125rem', flexShrink: 0}}>
                    <a style={{fontSize: "1.25rem", fontStyle: 'normal', fontWeight: '400',
                        lineHeight: 'normal', letterSpacing: '-0.01031rem'}}>• 잡담</a>
                    <a onClick={() => navigate("/chat")}
                       style={{fontSize: "0.9375rem", textDecorationLine: "underline", fontStyle: 'normal',
                           fontWeight: '400', lineHeight: 'normal', letterSpacing: '-0.01031rem',
                           marginRight: '0.5rem'}}>모두보기</a>
                </div>
                <ArticleListTemplate postList={chatData} preview={true}/>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    border: '1px solid rgba(196, 196, 196, 0.20)', background: '#FFF',
                    width: '100%', height: '3.125rem', flexShrink: 0}}>
                    <a style={{fontSize: "1.25rem", fontStyle: 'normal', fontWeight: '400',
                        lineHeight: 'normal', letterSpacing: '-0.01031rem'}}>• 레시피</a>
                    <a onClick={() => navigate("/recipe")}
                       style={{fontSize: "0.9375rem", textDecorationLine: "underline", fontStyle: 'normal',
                           fontWeight: '400', lineHeight: 'normal', letterSpacing: '-0.01031rem',
                           marginRight: '0.5rem'}}>모두보기</a>
                </div>
                <ArticleListTemplate postList={recipeData} preview={true}/>
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                    width: '8.5625rem', height: '4.3125rem', fontSize: '1rem', fontStyle: 'normal',
                    fontWeight: '700', lineHeight: 'normal', letterSpacing: '-0.01031rem',
                    marginLeft: '1.5rem', marginTop: '4.5rem'}}>
                    <a onClick={() => navigate("/")}>• 자주 묻는 질문</a>
                    <a onClick={() => navigate("/")}>• 입점 및 제휴 문의</a>
                </div>
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-start',
                    width: '12.4375rem', height: '5rem', fontSize: '0.4375rem', fontStyle: 'normal',
                    fontWeight: '700', lineHeight: 'normal', letterSpacing: '-0.01031rem', marginLeft: '1.5rem',
                    marginTop: '2.5rem'}}>
                     <p style={{margin: '0.1rem 0'}}>주식회사 포 올</p>
                     <p style={{margin: '0.1rem 0'}}>대표 : 김대원 | 개인정보관리 책임자 : 김대원</p>
                     <p style={{margin: '0.1rem 0'}}>이메일 : for.official.all@gmail.com | 대표번호 : 010-9019-7733</p>
                     <p style={{margin: '0.1rem 0'}}>주소 : 서울시 관악구 관악로 17길</p>
                     <p style={{margin: '0.1rem 0'}}>사업자등록번호 :</p>
                </div>
            </div>
        </div>
    )
};
export default MainPage;