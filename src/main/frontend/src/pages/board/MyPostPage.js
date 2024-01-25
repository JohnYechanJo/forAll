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
    const [isEraseAll, setIsEraseAll] = useState(false);
    const [isEraseFew, setIsEraseFew] = useState(false);
    const [selectErase, setSelectErase] = useState(false);
    const [selectPost, setSelectPost] = useState();
    useEffect(() => {
        console.log(selectPost);
    }, [selectPost]);
    const deletePost = (post) => {
        console.log(post);
        setSelectPost(post);
        setIsEraseFew(true);
    }
    const deleteAll = useCallback(()=>{
        axios.get("/api/v1/articles/deleteAll").then(()=>window.location.reload());
    },[]);
    const deleteSelect = ()=>{
        console.log(selectPost);
        axios.get("/api/v1/articles/delete/"+selectPost.id).then(()=>window.location.reload());
    };
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
            <Modal
                isOpen={isEraseAll}
                style={ModalStyles}
                ariaHideApp={false}
            >
                <div style={{
                    justifyContent: "center", alignItems: "center"+"10px",
                    fontFamily: "Noto Sans KR",
                    color: " #000",
                    fontSize: "1.25rem",
                    fontStyle: "normal",
                    fontWeight: "400",
                    lineHeight: "normal",

                    height: "100%",
                    display: "flex",
                    flexDirection: "column",

                }}>
                    <a style={{marginTop:"-30px"}}>전체 삭제 하시겠습니까?</a>
                </div>
                <div style={{
                    display: 'flex',
                    width: '100%',
                    margin: '0px',
                    marginTop: '4rem',
                    bottom: '0',
                    position: 'fixed',
                    fontSize: "0.9375rem",
                    fontWeight: "400"
                }}>
                    <button style={{

                        backgroundColor: "#000",
                        width: '10.9375rem',
                        bottom: '0',
                        height: '3.125rem',
                        color: 'white',
                        border: 'none',
                        lineHeight: '1.875rem',
                        textAlign: 'center'
                    }}
                            onClick={() => setIsEraseAll(false)}
                    >
                        취소
                    </button>
                    <button style={{

                        backgroundColor: "#FF4F4F",
                        width: '10.9375rem',
                        bottom: '0',
                        height: '3.125rem',
                        color: 'white',
                        border: 'none',
                        lineHeight: '1.875rem',
                        textAlign: 'center'
                    }}
                            onClick={() => {
                                deleteAll();
                                setIsEraseAll(false);
                            }}
                    >
                        확인
                    </button>
                </div>
            </Modal>

            <p onClick={() => setIsEraseAll(true)}>전체 삭제</p>
            <Modal
                isOpen={isEraseFew}
                style={ModalStyles}
                ariaHideApp={false}
            >
                <div style={{
                    justifyContent: "center", alignItems: "center"+"10px",
                    fontFamily: "Noto Sans KR",
                    color: " #000",
                    fontSize: "1.25rem",
                    fontStyle: "normal",
                    fontWeight: "400",
                    lineHeight: "normal",

                    height: "100%",
                    display: "flex",
                    flexDirection: "column",

                }}>
                    <a style={{marginTop:"-30px"}}>선택 삭제 하시겠습니까?</a>
                </div>
                <div style={{
                    display: 'flex',
                    width: '100%',
                    margin: '0px',
                    marginTop: '4rem',
                    bottom: '0',
                    position: 'fixed',
                    fontSize: "0.9375rem",
                    fontWeight: "400"
                }}>
                    <button style={{

                        backgroundColor: "#000",
                        width: '10.9375rem',
                        bottom: '0',
                        height: '3.125rem',
                        color: 'white',
                        border: 'none',
                        lineHeight: '1.875rem',
                        textAlign: 'center'
                    }}
                            onClick={() => setIsEraseFew(false)}
                    >
                        취소
                    </button>
                    <button style={{

                        backgroundColor: "#FF4F4F",
                        width: '10.9375rem',
                        bottom: '0',
                        height: '3.125rem',
                        color: 'white',
                        border: 'none',
                        lineHeight: '1.875rem',
                        textAlign: 'center'
                    }}
                            onClick={() => {
                                deleteSelect();
                                setIsEraseFew(false);
                            }}
                    >
                        확인
                    </button>
                </div>
            </Modal>

            <p onClick={() => setSelectErase(!selectErase)}>선택 삭제</p>

            <div>
                {postList ? (
                    <div>
                        {postList.map((post, idx) => (
                            <div key={idx}>
                                <div onClick={() => navigate("/post/" + post.id)}>
                                    <p>{post.title}</p>
                                    <p>{post.content}</p>
                                    <p>{TimeUtil.getDiffStr(post.writtenAt)}</p>
                                    <p>{post.recommend}</p>
                                    <p>댓글:{post.comments ? post.comments.length : 0}</p>
                                </div>
                                {selectErase ? (<p onClick={()=>deletePost(post)}>삭제하기</p>) :
                                    (<p onClick={()=>navigate("/post/edit",{state:post})}>수정하기</p>)}
                            </div>

                        ),
                        )
                        }
                    </div>
                ) : null}
            </div>
        </div>
    )
};
export default MyPostPage;