import Sidebar from "../../components/home/Sidebar";
import HomeTemplate from "../../components/home/HomeTemplate";
import {useCallback, useEffect, useState} from "react";
import axios from "axios";
import ArticleListTemplate from "../../components/board/ArticleListTemplate";
import {TimeUtil} from "../../utils/TimeUtil";
import {useNavigate} from "react-router-dom";
import {ExplanationModalStyles} from "../../components/ExplanationModalStyles";
import Modal from "react-modal";
import {ModalStyles} from "../../components/ModalStyles";
import {SmallModalStyles} from "../../components/SmallModalStyles";
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
            <Modal isOpen={isModalOpen2} style={ModalStyles} ariaHideApp={false}>
                <div style={{
                    fontFamily: "Noto Sans KR",
                    fontStyle: "normal",
                    fontWeight: "400",
                    lineHeight: "normal"
                }}>
                    <a style={{ color: " #000",fontSize: "1.25rem", textAlign: "left"}}>전체 삭제 하시겠습니까?</a>
                    <SmallModalStyles style={{background: "#000"}}>
                    <a style={{
                        color: " #FFF",
                        fontSize: "0.9375rem",
                        textAlign: 'left',
                        paddingLeft: "1rem",
                        paddingRight: "1rem"
                    }}>취소</a>
                    </SmallModalStyles>
                    <SmallModalStyles style={{background: "#000"}}>
                    <a style={{
                        color: " #FFF",
                        fontSize: "0.9375rem",
                        textAlign: 'left',
                        paddingLeft: "1rem",
                        paddingRight: "1rem"
                    }}>확인</a>
                    </SmallModalStyles>

                    <div className="bottom_button_fixed">
                        <a style={{fontSize: "0.8rem"}} onClick={() => setIsModalOpen2(false)}>닫기</a>
                    </div>

                </div>
            </Modal>
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