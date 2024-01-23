
import Sidebar from "../../src/components/home/Sidebar";
import HomeTemplate from "../../src/components/home/HomeTemplate";
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import axios from "axios";
import {BoardCategory} from "../utils/enums";


const EntryPartnership = () => {
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
    return(
        <div>
            <div className="header" style={{backgroundColor:"white"}}> {/*헤더에 뒤로가기 버튼 집어넣기*/}
                <button className="button" onClick={() => navigate("/",{state: {focus: "space"}})}>대관하기</button>
                <button className="button">커뮤니티</button>
            </div>
            <Sidebar/>
            <HomeTemplate />
            <div>
                <h1 style={{fontSize: "0.9375rem"}}>• 입점 및 제휴 문의</h1>
                <div>
                    <p style={{fontSize: "0.625rem", textDecorationLine: "underline"}}>• Q1. 공간 등록 시 대관료 설정 기준이 있을까요?
                        (오너)</p>
                    <p style={{fontSize: "0.625rem"}}>• A. 공간 등록 시 대관료는 오너께서 직접 가격을 설정하여 등록해주시면 됩니다. 하지만 대관료가 높을수록 대관하는
                        셰프에게 부담이 되어 공간 채택율이 낮아질 수 있습니다. 따라서 For ALL은 오너 공간의 대관료 Max를 좌석 수 기준 곱하기 1.5만원으로 권장 드리고 있으며 이를
                        참고하여 자유롭게 대관료를 설정해주시면 됩니다.</p>
                </div>
            </div>
        </div>
    )
};
export default EntryPartnership;