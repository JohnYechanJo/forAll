import {useNavigate, useParams} from "react-router-dom";
import React, {useCallback, useEffect, useState} from "react";
import axios from "axios";
import {BoardCategory, ChatRoomCategory} from "../../utils/enums";
import Sidebar from "../../components/home/Sidebar";
import {TimeUtil} from "../../utils/TimeUtil";
import ImageSlider from "../../components/ImageSlider";
import clockImg from "../../components/icons/clock.jpg";
import likeImg from "../../components/icons/like.jpg";
import commentImg from "../../components/icons/comment.jpg";
import pencilImg from "../../components/icons/pencil.jpg";
import ImageViewer from "../../components/ImageViewer";
import Header from "../../components/home/Header";
import Alert from "../../components/Alert";
const PostViewPage = ({postList}) => {
    const navigate = useNavigate();

    const params = useParams();
    const [data, setData] = useState([]);
    const [writerProfileImg, setWriterProfileImg] = useState("");
    const [writeComment, setWriteComment] = useState(false);
    const [writeRecomment, setWriteRecomment] = useState(-1); //idx에 해당하는 댓글에 작성중
    const [comment, setComment] = useState("");
    const [recomment, setRecomment] = useState("");
    const onChangeComment = useCallback((e) => {setComment(e.target.value);}, []);
    const onChangeRecomment = useCallback((e) => {setRecomment(e.target.value);}, []);
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [alertContent, setAlertContent] = useState("");

    const openAlert = (string) => {
        setAlertContent(string);
        setIsAlertOpen(true);
    };



    const submitComment = () => {
        axios.post("/api/v1/comments",{
            articleId: data.id,
            text: comment,
            writtenAt: TimeUtil.now(),
            userId: sessionStorage.getItem("user_id")
        }).then(()=>{
            setComment("");
            setWriteComment(false);
            updateData();
        }).catch((err) => console.error(err));
    };
    const submitRecomment = (commentIdx) => {
        axios.post("/api/v1/recomments",{
            commentId: data.comments[commentIdx].id,
            text: recomment,
            writtenAt: TimeUtil.now(),
            userId: sessionStorage.getItem("user_id")
        }).then(()=>{
            setRecomment("");
            setWriteRecomment(-1);
            updateData();
        }).catch((err) => console.error(err));
    }
    const handleRecommendArticle = () => {
        const userId = sessionStorage.getItem("user_id");
        if (!userId) return;
        axios.get("/api/v1/articles/recommend",{
            params:{
                articleId: data.id,
                userId: userId
            }
        }).then((res) => {
            updateData();
        });
    }
    const handleRecommendComment = (id) => {
        const userId = sessionStorage.getItem("user_id");
        if (!userId) return;
        axios.get("/api/v1/comments/recommend",{
            params:{
                commentId: id,
                userId: userId
            }
        }).then((res) => {
            updateData();
        });
    }
    const handleRecommendRecomment = (id) => {
        const userId = sessionStorage.getItem("user_id");
        if (!userId) return;
        axios.get("/api/v1/recomments/recommend",{
            params:{
                recommentId: id,
                userId: userId
            }
        }).then((res) => {
            updateData();
        });
    }
    const handleProfile = () => {
        if (!sessionStorage.getItem("user_id")) {
            navigate("/login");
        }
        else {
            navigate("/profile/"+data.userId);
        }
    };
    const handleChat = () => {
        if (!sessionStorage.getItem("user_id")) {
            navigate("/login");
        }
        else if (sessionStorage.getItem("user_id") === data.userId) {
            openAlert("본인과는 채팅할 수 없습니다!");
        }
        else {
            navigate("/chatRoom", {
                state: {
                    partner: data.userId,
                    category: ChatRoomCategory.Board
                }
            })
        }
    };
    const updateData = async () => {
        await axios.get("/api/v1/articles/" + params.id)
            .then((res) => {
                setData(res.data);
                axios.get("/api/v1/profile/image/"+res.data.userId)
                    .then((res) => setWriterProfileImg(res.data))
                    .catch((err)=>console.error(err));
            })
            .catch((err) => console.error(err));
    };
    useEffect(() => {
        updateData();
    }, []);

    return(
        <div>
            <Header/>
            <Sidebar />
            <div style={{
                display: 'flex', width: '96%', flexDirection: 'column', gap: '0.5rem', marginLeft: '1rem',
                marginTop: '4.3rem'
            }}>
                <h1 style={{
                    fontSize: '1.25rem', fontStyle: 'normal', fontWeight: '400',
                    lineHeight: 'normal', letterSpacing: '-0.01031rem', margin: 0
                }}>{data.title}</h1>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <div style={{width:"1.5rem", height:"1.5rem", borderRadius:"1.5rem", overflow:"hidden"}}>
                        <ImageViewer val={writerProfileImg}/>
                    </div>
                    <p style={{
                        fontSize: '0.625rem', fontStyle: 'normal', fontWeight: '400', lineHeight: 'normal',
                        letterSpacing: '-0.01031rem', margin: 0, color:"#0788FF"
                    }}>{data.userId}</p>
                </div>
                <div style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    fontSize: '0.75rem', fontStyle: 'normal', fontWeight: '400',
                    lineHeight: 'normal', letterSpacing: '-0.01031rem', marginTop: 0
                }}>
                    <div style={{display: 'flex', alignItems: 'center', margin: 0}}>
                        <img src={clockImg} alt="clockImg"
                             style={{width: '0.45006rem', height: '0.4375rem', flexShrink: 0}}/>
                        <p style={{margin: '0 0.51rem 0 0'}}>{TimeUtil.getDiffStr(data.writtenAt)}</p>
                        <div style={{display: 'flex', alignItems: 'center'}} onClick={() => handleRecommendArticle()}>
                            <img src={likeImg} alt="likeImg"
                                 style={{width: '0.45006rem', height: '0.4375rem', flexShrink: 0, padding: 0}}/>
                            <p style={{margin: '0 0.51rem 0 0'}}>{data.recommend != 0 ? data.recommend : "좋아요"}</p>
                        </div>

                        <img src={commentImg} alt="commentImg"
                             style={{width: '0.45006rem', height: '0.4375rem', flexShrink: 0}}/>
                        <p style={{margin: '0 0.51rem 0 0'}}>{data.comments ? data.comments.length : 0}</p>
                    </div>
                    <div style={{display: 'flex', alignItems: 'center', margin: 0, padding: 0}}>
                        <p onClick={handleProfile}
                           style={{margin: '0 0.51rem 0 0', marginTop: 0, textDecorationLine: 'underline'}}>프로필 보기</p>
                        <p onClick={handleChat} style={{margin: '0 0.51rem 0 0', textDecorationLine: 'underline'}}>채팅 보내기</p>
                    </div>
                    <Alert isOpen={isAlertOpen} setIsOpen={setIsAlertOpen} content={alertContent} />
                </div>
                <ImageSlider images={data.postImage}/>
                <p style={{fontSize: '0.75rem', fontStyle: 'normal', fontWeight: '400', lineHeight: 'normal',
                    letterSpacing: '-0.01031rem',wordBreak:'break-all',marginRight:'1rem'}}>{data.content}</p>
            </div>
            <div style={{
                width: '100%', height: '3.125rem', flexShrink: 0, border: '1px solid #C4C4C4',
                background: '#FFF', display: 'flex', justifyContent: 'center', alignItems: 'center'
            }}>
                <div onClick={() => {
                    if(!sessionStorage.getItem("user_id")) return;
                    setWriteComment(!writeComment);
                }}
                     style={{width: '95%', height: '1.875rem', flexShrink: 0, border: '1px solid #C4C4C4',
                         background: '#FFF', display: 'flex', alignItems: 'center'}}>
                    <p style={{
                         fontSize: '0.75rem', fontStyle: 'normal', fontWeight: '500',
                         lineHeight: 'normal', letterSpacing: '-0.01031rem', marginLeft: '0.64rem'
                    }}>댓글을 남겨주세요.</p>
                </div>
            </div>
            {writeComment ? (
                <div style={{width:"100%", display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                    <textarea style={{width:"90vw",height:"7.5rem", margin:'3vw 3vw 0 3vw',
                        padding:"0.5rem", border: "1px solid #C4C4C4"}}
                              value={comment} onChange={onChangeComment}/>
                    <div style={{display:"flex", flexDirection:"row-reverse", alignItems:"center", width:"95vw",
                        height:"1.875rem", padding:"0.5rem", paddingTop:"0",}}>
                        <div onClick={submitComment} style={{textAlign:"right"}}>
                            <img src={pencilImg} alt="pencilImg"
                                 style={{width: '0.8rem', height: '0.8rem', flexShrink: 0}}/>
                        </div>
                    </div>
                </div>
            ): null}
            <div>
                {data.comments ? (
                    <div>
                        {data.comments.sort(((a, b) => {
                            if (a.writtenAt > b.writtenAt) return -1;
                            else return 1;
                        })).map((comment, idx) => (
                            <div key={idx}>
                                <div style={{
                                    display: 'flex', flexDirection: 'column', justifyContent: 'center',
                                    alignItems: 'flex-start', margin: 0, width: '100%',
                                    flexShrink: 0, border: '1px solid rgba(196, 196, 196, 0.20)',
                                    background: '#FFF'
                                }}>
                                    <p style={{
                                        fontSize: '0.75rem', fontStyle: 'normal', fontWeight: '400',
                                        lineHeight: 'normal', letterSpacing: '-0.01031rem',
                                        margin: '0.31rem 0 0 1rem', color: '#0788FF'
                                    }}>{comment.userId}{comment.userId === data.userId ? (<span style={{color: "#FF2929"}}> 작성자</span>) : null}</p>
                                    <p style={{
                                        fontSize: '0.75rem', fontStyle: 'normal',
                                        fontWeight: '400', lineHeight: 'normal', letterSpacing: '-0.01031rem',
                                        margin: '0 0 0 1rem',wordBreak:'break-all',marginRight:'1rem'
                                    }}>{comment.text}</p>
                                    <div style={{
                                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                        fontSize: '0.75rem', fontStyle: 'normal', fontWeight: '400',
                                        lineHeight: 'normal', letterSpacing: '-0.01031rem', margin: '0 0 0.31rem 1rem'
                                    }}>
                                        <div style={{display: 'flex', alignItems: 'center', padding: 0}}>
                                            <img src={clockImg} alt="clockImg"
                                                 style={{width: '0.75rem', height: '0.75rem', flexShrink: 0,
                                                     padding: 0}}/>
                                            <p style={{margin: '0 0.51rem 0 0'}}>{TimeUtil.getDiffStr(comment.writtenAt)}</p>
                                        </div>
                                        <div style={{display: 'flex', alignItems: 'center'}} onClick={() => handleRecommendComment(comment.id)}>
                                            <img src={likeImg} alt="likeImg"
                                                 style={{width: '0.75rem', height: '0.75rem', flexShrink: 0,
                                                     padding: 0}}/>
                                            <p style={{margin: '0 0.51rem 0 0'}}>{comment.recommend != 0 ? comment.recommend : "좋아요"}</p>
                                        </div>
                                        <div style={{display: 'flex', alignItems: 'center'}}>
                                            <img src={commentImg} alt="commentImg"
                                                 style={{width: '0.75rem', height: '0.75rem', flexShrink: 0,
                                                     padding: 0}}/>
                                            <p onClick={() => {
                                                if (!sessionStorage.getItem("user_id")) return;
                                                setWriteRecomment(idx);}}
                                               style={{margin: '0 0.51rem 0 0'}}>{comment.recomments ?
                                                comment.recomments.length : 0}</p>
                                        </div>
                                    </div>
                                </div>
                                {writeRecomment === idx ? (
                                    <div style={{width:"100%", display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                                        <textarea style={{width: '90vw', height: '1.5rem', flexShrink: 0, margin:'3vw 3vw 0 3vw',
                                            padding:"0.5rem", border: '1px solid rgba(196, 196, 196, 0.50)', background: '#FFF'}}
                                                  value={recomment} onChange={onChangeRecomment}/>
                                        <div style={{display:"flex", flexDirection:"row-reverse", alignItems:"center", width:"90vw",
                                            height:"1.875rem", marginLeft:"1.25rem", padding:"0.5rem", paddingTop:"0"}}>
                                            <div onClick={() => submitRecomment(idx)} style={{textAlign:"right"}}>
                                                <img src={pencilImg} alt="pencilImg"
                                                     style={{width: '0.8rem', height: '0.8rem', flexShrink: 0}}/>
                                            </div>
                                        </div>
                                    </div>
                                    ) : null}
                                {comment.recomments ? (<div>
                                    {comment.recomments.sort(((a, b) => {
                                        if (a.writtenAt > b.writtenAt) return -1;
                                        else return 1;
                                    })).map((recomment, idx) => (
                                        <div key={idx} style={{background:"rgba(196, 196, 196, 0.30)",
                                            border: '1px solid rgba(196, 196, 196, 0.20)'}}>
                                            <div style={{
                                                display: 'flex', flexDirection: 'column', justifyContent: 'center',
                                                alignItems: 'flex-start', marginLeft: '2rem', wordBreak:"break-all"
                                            }}>
                                                <p style={{
                                                    fontSize: '0.75rem', fontStyle: 'normal', fontWeight: '400',
                                                    lineHeight: 'normal', letterSpacing: '-0.01031rem',
                                                    margin: '0.31rem 0 0 0', color: '#0788FF'
                                                }}>{recomment.userId}{recomment.userId === data.userId ? (<span style={{color: "#FF2929"}}> 작성자</span>) : null}</p>
                                                <a style={{
                                                    fontSize: '0.75rem', fontStyle: 'normal',
                                                    fontWeight: '400', lineHeight: 'normal', letterSpacing: '-0.01031rem',
                                                    margin: 0, marginRight:"1rem"
                                                }}>{recomment.text}</a>
                                                <div style={{
                                                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                                    fontSize: '0.75rem', fontStyle: 'normal', fontWeight: '400',
                                                    lineHeight: 'normal', letterSpacing: '-0.01031rem', margin: '0 0 0.31rem 0'
                                                }}>
                                                    <div style={{display: 'flex', alignItems: 'center', padding: 0}}>
                                                        <img src={clockImg} alt="clockImg"
                                                             style={{width: '0.75rem', height: '0.4375rem', flexShrink: 0,
                                                                 padding: 0}}/>
                                                        <p style={{margin: '0 0.51rem 0 0'}}>{TimeUtil.getDiffStr(recomment.writtenAt)}</p>
                                                    </div>
                                                    <div style={{display: 'flex', alignItems: 'center'}} onClick={() => handleRecommendRecomment(recomment.id)}>
                                                        <img src={likeImg} alt="likeImg"
                                                             style={{width: '0.75rem', height: '0.75rem', flexShrink: 0,
                                                                 padding: 0}}/>
                                                        <p style={{margin: '0 0.51rem 0 0'}}>{recomment.recommend != 0 ? recomment.recommend : "좋아요"}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>) : null}
                            </div>
                        ))}
                    </div>) : null}
            </div>
        </div>
    )
};
export default PostViewPage;