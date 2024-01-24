import Sidebar from "../../src/components/home/Sidebar";
import HomeTemplate from "../../src/components/home/HomeTemplate";
import ArticleListTemplate from "../../src/components/board/ArticleListTemplate";
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useRef, useState} from "react";

import {BoardCategory} from "../utils/enums";
import axios from "axios";


import "../style/mainpage.css";



const FAQ = () => {
    const navigate = useNavigate();
    const [postList, setPostList] = useState([]);

    return(
        <div>
            <div className="header" style={{backgroundColor:"white"}}> {/*헤더에 뒤로가기 버튼 집어넣기*/}
                <button className="button" onClick={() => navigate("/",{state: {focus: "space"}})}>대관하기</button>
                <button className="button">커뮤니티</button>
            </div>
            <Sidebar/>
            <HomeTemplate />
            <div style={{color: "#000", fontStyle: "normal", fontFamily: "Noto Sans KR", lineHeight: "normal", letterSpacing: "-0.0255rem"}}>
                <h1 style={{fontWeight: "700", fontSize: "0.9375rem"}}>• 자주 묻는 질문</h1>
                <div>
                    <p style={{fontSize: "0.625rem"}}>
                        <a style={{fontWeight: "700", textDecorationLine: "underline"}}>• Q1. 공간 등록 시 대관료 설정 기준이 있을까요?
                            (오너)</a>
                        <br/>
                        <a style={{fontWeight: "400", textDecorationLine: "none"}}>• A. 공간 등록 시 대관료는 오너께서 직접 가격을 설정하여 등록해주시면 됩니다. 하지만 대관료가
                            높을수록 대관하는
                            셰프에게 부담이 되어 공간 채택율이 낮아질 수 있습니다. 따라서 For ALL은 오너 공간의 대관료 Max를 좌석 수 기준 곱하기 1.5만원으로 권장 드리고 있으며
                            이를
                            참고하여 자유롭게 대관료를 설정해주시면 됩니다.</a></p>
                </div>
                <div>
                    <p style={{fontSize: "0.625rem"}}>
                        <a style={{fontWeight: "700", textDecorationLine: "underline"}}>• Q2. 대관은 주로 어떤 목적으로 진행되나요?
                            (오너/셰프)</a>
                        <br/>
                        <a style={{fontWeight: "400", textDecorationLine: "none"}}>• A. For ALL 대관 서비스는 주방사용까지 가능한 대관을 매칭시켜드리고 있으며 주로 팝업
                            레스토랑, 쿠킹
                            클래스, 요식업 강연 등 다양한 목적으로 대관이 이루어집니다. 대관 전 채팅을 통해 셰프의 대관 목적에 대해 파악하실 수 있습니다.</a></p>
                </div>
                <div>
                    <p style={{fontSize: "0.625rem"}}>
                        <a style={{fontWeight: "700", textDecorationLine: "underline"}}>• Q3. 대관 당일 제가 공간에 있어야 하나요? (오너)</a>
                        <br/>
                        <a style={{fontWeight: "400", textDecorationLine: "none"}}>• A. For ALL의 공간 대관은 휴무일에 공간을 내놓는 사장님들에게 안전성과 수익성 보장해 드리기 때문에 오너께서 공간만 비워 주시면 되며 해당 공간에서 머무르지 않으셔도 됩니다.</a></p>
                </div>
                <div>
                    <p style={{fontSize: "0.625rem"}}>
                        <a style={{fontWeight: "700", textDecorationLine: "underline"}}>• Q4. 기물파손이나 서비스 이용 안정성에 대해서는 어떻게 보장이 되나요? (오너)</a>
                        <br/>
                        <a style={{fontWeight: "400", textDecorationLine: "none"}}>• A. 모든 회원은 For ALL 서비스를 이용하기 전에 이용약관에 동의하고 계약을 체결하게 됩니다. 이용약관에 사고 발생 시 대처 방안 및 손해 보상 제도가 마련되어 있으므로 이와 관련해서 이용약관에서 자세한 확인이 가능합니다.</a></p>
                </div>
                <div>
                    <p style={{fontSize: "0.625rem"}}>
                        <a style={{fontWeight: "700", textDecorationLine: "underline"}}>• Q5. 대관 수수료가 어떻게 되나요? (오너/셰프)</a>
                        <br/>
                        <a style={{fontWeight: "400", textDecorationLine: "none"}}>• A. For ALL은 대관 매칭 시 오너로부터 대관료 15%, 셰프로부터 대관료 18% 수수료가 발생합니다.</a></p>
                </div>
                <div>
                    <p style={{fontSize: "0.625rem"}}>
                        <a style={{fontWeight: "700", textDecorationLine: "underline"}}>• Q6. 셰프이도 한데 오너이기도 합니다. 동시 등록이 가능하나요?</a>
                        <br/>
                        <a style={{fontWeight: "400", textDecorationLine: "none"}}>• A. 물론입니다. 나의 정보에서 ‘셰프 등록’ 및 ‘공간 등록’이 가능하며 조건이 충족된다면 동시 등록도 가능합니다.</a></p>
                </div>
                <div>
                    <p style={{fontSize: "0.625rem"}}>
                        <a style={{fontWeight: "700", textDecorationLine: "underline"}}>• Q7. 공간을 등록한 지 한 달이 넘었는데 아직 아무런 대관 요청이 들어오지 않았어요. 수요가 없는 걸까요?</a>
                        <br/>
                        <a style={{color: "#000", fontStyle: "normal", fontWeight: "740", textDecorationLine: "none"}}>• A. 아직 대관 매칭이 이루어지지 않았다면 대관료 하향 조정을 권장해 드립니다. 포올 권장 대관료(좌석 수*1.5만원) 범위에 해당하는지 확인해 보시고 그럼에도 불구하고 공간 매칭이 이루어지지 않았다면 공간을 어필할 수 있는 사진으로 공간 정보 변경하는 것을 권장해 드립니다. 또한 광고 상단 노출을 통해 공간 채택률을 높이는 것도 하나의 방법이 될 수 있습니다.</a></p>
                </div>
                <div>
                    <p style={{fontSize: "0.625rem"}}>
                        <a style={{fontWeight: "700", textDecorationLine: "underline"}}>• Q8. 팝업을 진행하고 싶은데 크루가 없어요. For ALL에서 크루 모집이 가능하나요?</a>
                        <br/>
                        <a style={{fontWeight: "400", textDecorationLine: "none"}}>• A. 커뮤니티 게시판을 이용하여 팝업 크루 모집이 가능합니다. 게시물을 업로드 하여 개인 채팅을 통해 원하는 팝업 크루를 모집하세요.</a></p>

                </div>
                <ArticleListTemplate postList={postList}/>
            </div>
        </div>
    )
};
export default FAQ;