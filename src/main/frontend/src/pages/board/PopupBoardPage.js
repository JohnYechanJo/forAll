import {useEffect, useState} from "react";
import {BoardCategory, MainPageType} from "../../utils/enums";
import axios from "axios";
import Sidebar from "../../components/home/Sidebar";
import HomeTemplate from "../../components/home/HomeTemplate";
import ArticleListTemplate from "../../components/board/ArticleListTemplate";

const PopupBoardPage = () => {
    const [postList, setPostList] = useState([]);
    const updateData = async () => {
        await axios.get("/api/v1/articles/category/" + BoardCategory.Popup)
            .then((res) => setPostList(res.data.sort((a,b) => {
                if(a.writtenAt > b.writtenAt) return -1;
                else return 1;
            })))
            .catch((err) => console.error(err));
    }
    useEffect(() => {
        updateData();
    }, []);
    return(
        <div>
            <div className="header" style={{backgroundColor:"white"}}> {/*헤더에 뒤로가기 버튼 집어넣기*/}
                <button className="button">대관하기</button>
                <button className="button">커뮤니티</button>
            </div>
            <Sidebar/>
            <HomeTemplate />
            <div>
                <h1>팝업</h1>
                <ArticleListTemplate category={BoardCategory.Popup} postList={postList} preview={false} />
            </div>
        </div>
    )
};
export default PopupBoardPage;