import Sidebar from "../../src/components/home/Sidebar";
import HomeTemplate from "../../src/components/home/HomeTemplate";
import ArticleListTemplate from "../../src/components/board/ArticleListTemplate";
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useRef, useState} from "react";

import {BoardCategory} from "../utils/enums";
import axios from "axios";


import "../style/mainpage.css";

const EntryPartnership = () => {
    const navigate = useNavigate();

    return(
        <div>
            <div className="header" style={{backgroundColor:"white"}}> {/*헤더에 뒤로가기 버튼 집어넣기*/}
                <button className="button" onClick={() => navigate("/",{state: {focus: "space"}})}>대관하기</button>
                <button className="button">커뮤니티</button>
            </div>
            <Sidebar/>
            <HomeTemplate />
            <div style={{fontFamily: "Noto Sans KR"}}>
                <h1 style={{fontSize: "0.9375rem"}}>• 입점 및 제휴 문의</h1>
                <div>
                    <p style={{fontSize: "0.625rem"}}>• 사업자등록증/영업신고증을 보유한 오너라면 For ALL 공간 등록이 가능합니다.</p>
                    <p style={{fontSize: "0.625rem"}}>• 등록 방법은 <a style={{textDecorationLine: "underline"}}>‘우측 상단 바’ 클릭
                        > ‘공간 등록’</a>에서 공간 등록이 가능하며 절차에 따른 등록이 완료된 후 3~7일 내 반려 또는 승인 처리가 완료됩니다. 승인 처리가 완료되어야 For ALL에서
                        대관이 가능합니다. 반려되었을 경우 For ALL 고객센터에 문의 바랍니다.</p>
                    <p style={{fontSize: "0.625rem"}}>• For ALL은 요식업 공간뿐만 아니라 공유주방, 교육기관 등 다양한 공간 및 기관과도 제휴를 맺어 파트너십을 이어
                        나가고 있습니다.</p>
                    <p style={{fontSize: "0.625rem"}}>• 지금 바로 ‘공간 등록’을 통해 업주님의 공간을 선보이세요!</p>
                    <p style={{fontSize: "0.625rem"}}>• 이외의 문의 사항은 <a style={{textDecorationLine: "underline"}}>‘우측 상단
                        바’ 클릭 > ‘고객 센터’</a> 문의해 주세요.<br/>***문의하실 때, 밑의 정보를 미리 입력해 주시면, 더욱 원활한 상담을 진행할 수 있습니다!</p>
                    <p style={{fontSize: "0.625rem"}}>
                        업체명/업종:<br/>
                        성함:<br/>
                        연락처:<br/>
                        이메일:<br/>
                        문의 사항:</p>
                    <p style={{fontSize: "0.4375rem"}}>본인 확인 및 예약 사항 전달, 파트너 상담 목적으로 이름과 연락처를 수집 · 이용합니다. 톡을 보낸 시점으로부터 최대 1년 보관 후 지체 없이 파기합니다.</p>
                </div>
            </div>
        </div>
    )
};
export default EntryPartnership;