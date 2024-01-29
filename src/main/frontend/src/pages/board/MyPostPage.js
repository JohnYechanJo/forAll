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
import updownImg from "../../components/icons/updown.jpg";
import Header from "../../components/home/Header";
const MyPostPage = () => {
    const [postList, setPostList] = useState([]);
    const navigate = useNavigate();
    const [isEraseAll, setIsEraseAll] = useState(false);
    const [isEraseFew, setIsEraseFew] = useState(false);
    const [selectErase, setSelectErase] = useState(false);
    const [selectPost, setSelectPost] = useState();
    const deletePost = (post) => {
        setSelectPost(post);
        setIsEraseFew(true);
    }
    const deleteAll = useCallback(()=>{
        axios.get("/api/v1/articles/deleteAll").then(()=>window.location.reload());
    },[]);
    const deleteSelect = ()=>{
        axios.get("/api/v1/articles/delete/"+selectPost.id).then(()=>window.location.reload());
    };
    useEffect(() => {
        axios.get("/api/v1/articles/user/" + sessionStorage.getItem("user_id"))
            .then((res) => setPostList(res.data))
            .catch((err) => console.error(err));
    }, []);
    return (
        <div>
            <Header/>
            <Sidebar/>
            <HomeTemplate/>
            <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                width: '100%', height: '3.125rem', flexShrink: 0, border: '1px solid #C4C4C4', background: '#FFF'
            }}>
                <h1 style={{
                    fontSize: '0.875rem', fontStyle: 'normal', fontWeight: '700', lineHeight: 'normal',
                    letterSpacing: '-0.01031rem', marginLeft: '0.1rem'
                }}>• 내가 쓴 글</h1>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <Modal
                        isOpen={isEraseAll}
                        style={SmallModalStyles}
                        ariaHideApp={false}
                    >
                        <div style={{
                            justifyContent: "center", alignItems: "center" + "10px",
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
                            <a style={{marginTop: "-30px"}}>전체 삭제 하시겠습니까?</a>
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
                                width: '50%',
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
                                width: '50%',
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
                    <p onClick={() => setIsEraseAll(true)}
                       style={{
                           fontSize: '0.625rem', fontStyle: 'normal', fontWeight: '500',
                           lineHeight: 'normal', letterSpacing: '-0.01031rem', textDecorationLine: 'underline',
                           marginRight: '0.5rem'
                       }}>전체 삭제</p>

                    <Modal isOpen={isEraseFew} style={SmallModalStyles} ariaHideApp={false}>
                        <div style={{
                            justifyContent: "center", alignItems: "center" + "10px",
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
                            <a style={{marginTop: "-30px"}}>선택 삭제 하시겠습니까?</a>
                        </div>
                        <div style={{
                            display: 'flex',
                            width: '100%',
                            margin: '0px',
                            marginTop: '4rem',
                            bottom: '0',
                            position: 'fixed',
                            fontSize: "0.9375rem",
                            fontWeight: "400",

                        }}>
                            <button style={{

                                backgroundColor: "#000",
                                width: '50%',
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
                                width: '50%',
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
                    <p onClick={() => setSelectErase(true)}
                       style={{
                           fontSize: '0.625rem', fontStyle: 'normal', fontWeight: '500',
                           lineHeight: 'normal', letterSpacing: '-0.01031rem', textDecorationLine: 'underline',
                           marginRight: '0.5rem'
                       }}>선택 삭제</p>
                </div>
            </div>

            <ArticleListTemplate postList={postList} userPost={true} isErase={selectErase} deletePost={deletePost}/>
            <div style={{
                display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                width: '8.5625rem', height: '4.3125rem', fontSize: '1rem', fontStyle: 'normal',
                fontWeight: '700', lineHeight: 'normal', letterSpacing: '-0.01031rem',
                marginLeft: '1.5rem', marginTop: '4.5rem'
            }}>
                <a onClick={() => navigate("/")}>• 자주 묻는 질문</a>
                <a onClick={() => navigate("/")}>• 입점 및 제휴 문의</a>
            </div>
            <div style={{
                display: 'flex', flexDirection: 'column', justifyContent: 'flex-start',
                width: '12.4375rem', height: '5rem', fontSize: '0.4375rem', fontStyle: 'normal',
                fontWeight: '700', lineHeight: 'normal', letterSpacing: '-0.01031rem', marginLeft: '1.5rem',
                marginTop: '2.5rem'
            }}>
                <p style={{margin: '0.1rem 0'}}>주식회사 포 올</p>
                <p style={{margin: '0.1rem 0'}}>대표 : 김대원 | 개인정보관리 책임자 : 김대원</p>
                <p style={{margin: '0.1rem 0'}}>이메일 : for.official.all@gmail.com | 대표번호 : 010-9019-7733</p>
                <p style={{margin: '0.1rem 0'}}>주소 : 서울시 관악구 관악로 17길</p>
                <p style={{margin: '0.1rem 0'}}>사업자등록번호 :</p>
            </div>
        </div>
    )
};
export default MyPostPage;