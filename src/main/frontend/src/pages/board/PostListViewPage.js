import {useEffect, useState} from "react";
import axios from "axios";
import {BoardCategory} from "../../utils/enums";
import Sidebar from "../../components/home/Sidebar";
import ToolBar from "../../components/home/ToolBar";
import HomeTemplate from "../../components/home/HomeTemplate";
import ArticleListTemplate from "../../components/board/ArticleListTemplate";
import {useNavigate} from "react-router-dom";
import Headers from "../../components/home/Header";
const PostListViewPage = () => {
    const navigate = useNavigate();
    const [popupData, setPopupData] = useState([]);
    const [chatData, setChatData] = useState([]);
    const [recipeData, setRecipeData] = useState([]);

    useEffect(() => {
        axios.get("/api/v1/articles/category/" + BoardCategory.Popup)
            .then((res) => setPopupData(res.data.sort((a, b) => {
                if (a.writtenAt > b.writtenAt) return -1;
                else return 1;
            }).slice(0, 5)))
            .catch((err) => console.error(err));
        axios.get("/api/v1/articles/category/" + BoardCategory.Chat)
            .then((res) => setChatData(res.data.sort((a, b) => {
                if (a.writtenAt > b.writtenAt) return -1;
                else return 1;
            }).slice(0, 5)))
            .catch((err) => console.error(err));
        axios.get("/api/v1/articles/category/" + BoardCategory.Recipe)
            .then((res) => setRecipeData(res.data.sort((a, b) => {
                if (a.writtenAt > b.writtenAt) return -1;
                else return 1;
            }).slice(0, 5)))
            .catch((err) => console.error(err));
    }, []);

    return(
        <div>
            <Headers />
            <Sidebar />
            <ToolBar />
            <HomeTemplate />
            <div>
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
                <div style={{
                    display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                    width: '8.5625rem', height: '4.3125rem', fontSize: '1rem', fontStyle: 'normal',
                    fontWeight: '700', lineHeight: 'normal', letterSpacing: '-0.01031rem',
                    marginLeft: '1.5rem', marginTop: '4.5rem'
                }}>
                    <a onClick={() => navigate("/FAQ")}>• 자주 묻는 질문</a>
                    <a onClick={() => navigate("/EntryPartnerShip")}>• 입점 및 제휴 문의</a>
                </div>
                <div style={{
                    display: 'flex', flexDirection: 'column', justifyContent: 'flex-start',
                    width: '12.4375rem', height: '5rem', fontSize: '0.4375rem', fontStyle: 'normal',
                    fontWeight: '700', lineHeight: 'normal', letterSpacing: '-0.01031rem', marginLeft: '1.5rem',
                    marginTop: '2.5rem'
                }}>
                    <p style={{ margin: '0.1rem 0' }}>주식회사 포 올</p>
                    <p style={{ margin: '0.1rem 0' }}>대표 : 김대원 | 개인정보관리 책임자 : 김대원</p>
                    <p style={{ margin: '0.1rem 0' }}>이메일 : for.official.all@gmail.com | 대표번호 : 010-9019-7733</p>
                    <p style={{ margin: '0.1rem 0' }}>주소 : 서울시 관악구 관악로 17길</p>
                    <p style={{ margin: '0.1rem 0' }}>사업자등록번호 :</p>
                </div>
            </div>
        </div>
    )
};

export default PostListViewPage;