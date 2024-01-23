import {useCallback, useEffect, useState} from "react";
import {BoardCategory, MainPageType} from "../../utils/enums";
import axios from "axios";
import Sidebar from "../../components/home/Sidebar";
import HomeTemplate from "../../components/home/HomeTemplate";
import ArticleListTemplate from "../../components/board/ArticleListTemplate";
import {TimeUtil} from "../../utils/TimeUtil";
import ImageUploader from "../../utils/imageUploader";
import {useNavigate} from "react-router-dom";
import ImageViewer from "../../components/ImageViewer";
import ImagePreView from "../../components/ImagePreView";

const EntryPartnership = () => {
    const navigate = useNavigate();
    const [postList, setPostList] = useState([]);
    const [newPost, setNewPost] = useState(false);
    const [postTitle, setPostTitle] = useState("");
    const [postContent, setPostContent] = useState("");
    const [postImage, setPostImage] = useState([]);

    const postContentPlaceholder = "포 올은 누구나 기분 좋게 참여할 수 있는 커뮤니티를 만들기 위해 커뮤니티 이용규칙을 제정하여 운영하고 있습니다. 위반 시 게시물이 삭제되고 서비스 이용이 일정 기간 제한될 수 있습니다.\n\n 아래는 이 게시판에 해당하는 핵심 내용에 대한 요약 사항이며, 게시물 작성 전 커뮤니티 이용규칙 전문을 반드시 확인하시기 바랍니다.\n\n※ 정치, 사회 관련 행위 금지\n-국가기관, 정치 관련 단체, 언론, 시민단체에 대한 언급 혹인 이와 관련한 행위\n-정책, 외교 또는 정책, 정파에 대한 의견, 주장 및 이념, 가치관을 드러내는 행위\n-성별, 종교, 인종, 출신, 지역, 직업, 이념 등 사회적 이유에 대한 언급 혹은 이와 관련한 행위\n,-위와 같은 내용으로 유추될 수 있는 비유, 은어 사용 행위\n*해당 게시물은 시사, 이슈 게시판에만 작성 가능합니다.";
    const onChangePostTitle = useCallback((e)=>setPostTitle(e.target.value),[]);
    const onChangePostContent = useCallback((e)=>setPostContent(e.target.value),[]);

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