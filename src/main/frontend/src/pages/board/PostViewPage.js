import {useNavigate, useParams} from "react-router-dom";
import {useCallback, useEffect, useState} from "react";
import axios from "axios";
import {BoardCategory, ChatRoomCategory} from "../../utils/enums";

import {TimeUtil} from "../../utils/TimeUtil";
import ImageSlider from "../../components/ImageSlider";
import clockImg from "../../components/icons/clock.jpg";
import likeImg from "../../components/icons/like.jpg";
import commentImg from "../../components/icons/comment.jpg";

const PostViewPage = ({postList}) => {
    const navigate = useNavigate();

    const params = useParams();
    const [data, setData] = useState([]);
    const [writeComment, setWriteComment] = useState(false);
    const [writeRecomment, setWriteRecomment] = useState(-1); //idx에 해당하는 댓글에 작성중
    const [comment, setComment] = useState("");
    const [recomment, setRecomment] = useState("");
    const onChangeComment = useCallback((e) => {setComment(e.target.value);}, []);
    const onChangeRecomment = useCallback((e) => {setRecomment(e.target.value);}, []);
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
    const updateData = async () => {
        await axios.get("/api/v1/articles/" + params.id)
            .then((res) => setData(res.data))
            .catch((err) => console.error(err));
    };
    useEffect(() => {
        updateData();
    }, []);

    return(
        <div>
            <div className="header" style={{backgroundColor: "white"}}> {/*헤더에 뒤로가기 버튼 집어넣기*/}
                <button className="button" onClick={() => navigate("/", {state: {focus: "space"}})}>대관하기</button>
                <button className="button">커뮤니티</button>
            </div>
            <div style={{
                display: 'flex', width: '22.375rem', flexDirection: 'column', gap: '0.5rem', marginLeft: '1rem',
                marginTop: '4.3rem'
            }}>
                <h1 style={{
                    fontSize: '1.25rem', fontStyle: 'normal', fontWeight: '400',
                    lineHeight: 'normal', letterSpacing: '-0.01031rem', margin: 0
                }}>{data.title}</h1>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    {/*프로필 사진*/}
                    <p style={{
                        fontSize: '0.625rem', fontStyle: 'normal', fontWeight: '400', lineHeight: 'normal',
                        letterSpacing: '-0.01031rem', margin: 0
                    }}>{data.userId}</p>
                </div>
                <div style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    fontSize: '0.625rem', fontStyle: 'normal', fontWeight: '400',
                    lineHeight: 'normal', letterSpacing: '-0.01031rem', marginTop: 0
                }}>
                    <div style={{display: 'flex', alignItems: 'center', margin: 0}}>
                        <img src={clockImg} alt="clockImg"
                             style={{width: '0.45006rem', height: '0.4375rem', flexShrink: 0}}/>
                        <p style={{margin: '0 0.51rem 0 0'}}>{TimeUtil.getDiffStr(data.writtenAt)}</p>
                        <img src={likeImg} alt="likeImg"
                             style={{width: '0.45006rem', height: '0.4375rem', flexShrink: 0, padding: 0}}/>
                        <p style={{margin: '0 0.51rem 0 0'}}>{data.recommend}</p>
                        <img src={commentImg} alt="commentImg"
                             style={{width: '0.45006rem', height: '0.4375rem', flexShrink: 0}}/>
                        <p style={{margin: '0 0.51rem 0 0'}}>{data.comments ? data.comments.length : 0}</p>
                    </div>
                    <div style={{display: 'flex', alignItems: 'center', margin: 0, padding: 0}}>
                        <p onClick={() => navigate("/profile/" + data.userId)}
                           style={{margin: '0 0.51rem 0 0', marginTop: 0}}>프로필 보기</p>
                        <p onClick={() => {
                            if (!sessionStorage.getItem("user_id")) return;
                            navigate("/chatRoom", {
                                state: {
                                    partner: data.userId,
                                    category: ChatRoomCategory.Board
                                }
                            })
                        }} style={{margin: '0 0.51rem 0 0'}}>채팅 보내기</p>
                    </div>
                </div>
                <ImageSlider images={data.postImage}/>
                <p>{data.content}</p>
            </div>
            <div style={{
                width: '24.375rem', height: '3.125rem', flexShrink: 0, border: '1px solid #C4C4C4',
                background: '#FFF', display: 'flex', justifyContent: 'center', alignItems: 'center'
            }}>
                <div onClick={() => setWriteComment(true)}
                     style={{width: '22.375rem', height: '1.875rem', flexShrink: 0, border: '1px solid #C4C4C4',
                         background: '#FFF', display: 'flex', alignItems: 'center'}}>
                    <p style={{
                         fontSize: '0.625rem', fontStyle: 'normal', fontWeight: '500',
                         lineHeight: 'normal', letterSpacing: '-0.01031rem', marginLeft: '0.64rem'
                    }}>댓글을 남겨주세요.</p>
                </div>
                {/*<button onClick={() => setWriteComment(true)}*/}
                {/*        disabled={!sessionStorage.getItem("user_id")}*/}
                {/*        style={{}}>댓글을 남겨주세요*/}
                {/*</button>*/}
            </div>
            <div>
                {data.comments ? (
                    <div>
                        {data.comments.sort(((a, b) => {
                            if (a.writtenAt > b.writtenAt) return -1;
                            else return 1;
                        })).map((comment, idx) => (
                            <div key={idx} style={{display: 'flex', justifyContent: 'space-between',
                                alignItems: 'center', border: '1px solid rgba(196, 196, 196, 0.20)',
                                background: '#FFF', width: '100%', flexShrink: 0}}>>
                                <div style={{
                                    display: 'flex', flexDirection: 'column', justifyContent: 'center',
                                    alignItems: 'flex-start', margin: '1.19rem 0 1.19rem 1.5rem'
                                }}>
                                    <p style={{
                                        fontSize: '0.5rem', fontStyle: 'normal', fontWeight: '400',
                                        lineHeight: 'normal', letterSpacing: '-0.01031rem',
                                        margin: 0, color: '#0788FF'
                                    }}>{comment.userId}</p>
                                    <p style={{
                                        fontSize: '0.5rem', fontStyle: 'normal',
                                        fontWeight: '400', lineHeight: 'normal', letterSpacing: '-0.01031rem',
                                        margin: 0
                                    }}>{comment.text}</p>
                                    <div style={{
                                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                        fontSize: '0.625rem', fontStyle: 'normal', fontWeight: '400',
                                        lineHeight: 'normal', letterSpacing: '-0.01031rem', marginTop: '0.1rem'
                                    }}>
                                        <div style={{display: 'flex', alignItems: 'center', padding: 0}}>
                                            <img src={clockImg} alt="clockImg"
                                                 style={{width: '0.4375rem', height: '0.4375rem', flexShrink: 0,
                                                     padding: 0}}/>
                                            <p style={{margin: '0 0.51rem 0 0'}}>{TimeUtil.getDiffStr(comment.writtenAt)}</p>
                                        </div>
                                        <div style={{display: 'flex', alignItems: 'center'}}>
                                            <img src={likeImg} alt="likeImg"
                                                 style={{width: '0.4375rem', height: '0.4375rem', flexShrink: 0,
                                                     padding: 0}}/>
                                            <p style={{margin: '0 0.51rem 0 0'}}>{comment.recommend}</p>
                                        </div>
                                        <div style={{display: 'flex', alignItems: 'center'}}>
                                            <img src={commentImg} alt="commentImg"
                                                 style={{width: '0.4375rem', height: '0.4375rem', flexShrink: 0,
                                                     padding: 0}}/>
                                            <p onClick={() => {
                                                if (!sessionStorage.getItem("user_id")) return;
                                                setWriteRecomment(idx);}}
                                                style={{margin: '0 0.51rem 0 0'}}>{comment.recomments ?
                                                comment.recomments.length : 0}</p>
                                        </div>
                                    </div>
                                </div>
                                    <p>{TimeUtil.getDiffStr(comment.writtenAt)}</p>
                                    <p onClick={() => handleRecommendComment(comment.id)}>{comment.recommend}</p>
                                    <p onClick={() => {
                                        if (!sessionStorage.getItem("user_id")) return;
                                        setWriteRecomment(idx);
                                    }}>대댓글: {comment.recomments ? comment.recomments.length : 0}</p>
                                    {writeRecomment === idx ? (<div>
                                        <input value={recomment} onChange={onChangeRecomment}/>
                                        <button onClick={() => submitRecomment(idx)}>제출</button>
                                    </div>) : null}
                                    {comment.recomments ? (<div>
                                        {comment.recomments.sort(((a, b) => {
                                            if (a.writtenAt > b.writtenAt) return -1;
                                            else return 1;
                                        })).map((recomment, idx) => (
                                            <div key={idx}>
                                                <p>{recomment.userId}</p>
                                                <p>{recomment.text}</p>\
                                                <p onClick={() => handleRecommendRecomment(recomment.id)}>{recomment.recommend}</p>
                                                <p>{TimeUtil.getDiffStr(recomment.writtenAt)}</p>
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