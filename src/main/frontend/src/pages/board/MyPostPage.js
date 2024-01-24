import Sidebar from "../../components/home/Sidebar";
import HomeTemplate from "../../components/home/HomeTemplate";
import {useCallback, useEffect, useState} from "react";
import axios from "axios";
import ArticleListTemplate from "../../components/board/ArticleListTemplate";
import {TimeUtil} from "../../utils/TimeUtil";
import {useNavigate} from "react-router-dom";
const MyPostPage = () => {
    const [postList, setPostList] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        axios.get("/api/v1/articles/user/" + sessionStorage.getItem("user_id"))
            .then((res) => setPostList(res.data))
            .catch((err) => console.error(err));
    }, []);
    return (
        <div>
            <div className="header" style={{backgroundColor:"white"}}> {/*헤더에 뒤로가기 버튼 집어넣기*/}
                <button className="button" onClick={() => navigate("/",{state: {focus: "space"}})}>대관하기</button>
                <button className="button">커뮤니티</button>
            </div>
            <Sidebar/>
            <HomeTemplate />
            <h1>내가 쓴 글</h1>
            <p>전체 삭제</p>
            <p>선택 삭제</p>
            <div>
                {postList ? (
                    <div>
                        {postList.map((post, idx) => (
                            <div>
                                <div key={idx} onClick={() => navigate("/post/"+post.id)}>
                                    <p>{post.title}</p>
                                    <p>{post.content}</p>
                                    <p>{TimeUtil.getDiffStr(post.writtenAt)}</p>
                                    <p>{post.recommend}</p>
                                    <p>댓글:{post.comments ? post.comments.length : 0}</p>
                                </div>
                                <p onClick={()=>navigate("/post/edit",{state:post})}>수정하기</p>
                            </div>

                            )
                        )}
                    </div>
                ) : null}
            </div>
        </div>
    )
};
export default MyPostPage;