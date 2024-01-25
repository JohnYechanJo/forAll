import {useCallback, useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {TimeUtil} from "../../utils/TimeUtil";
import clockImg from "../../components/icons/clock.jpg";
import likeImg from "../../components/icons/like.jpg"
import commentImg from "../../components/icons/comment.jpg"

const ArticleListTemplate = ({postList, preview=false}) => {
    const navigate = useNavigate();
    return (
        <div>
            {postList ? (
                <div>
                    {postList.map((post, idx) => (
                            <div key={idx} onClick={() => navigate("/post/" + post.id)}
                                style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                border: '1px solid rgba(196, 196, 196, 0.20)', background: '#FFF',
                                width: '100%', flexShrink: 0}}>
                                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center',
                                    alignItems: 'flex-start', margin: '1.19rem 0 1.19rem 1.5rem'}}>
                                    <p style={{fontSize: '0.625rem', fontStyle: 'normal', fontWeight: '700',
                                        lineHeight: 'normal', letterSpacing: '-0.01031rem',
                                        margin: 0}}>{post.title}</p>
                                    {!preview ? <p style={{fontSize: '0.625rem', fontStyle: 'normal',
                                        fontWeight: '400', lineHeight: 'normal', letterSpacing: '-0.01031rem',
                                        margin: 0}}>{post.content}</p> : null}
                                    {!preview ? <p style={{fontSize: '0.625rem', fontStyle: 'normal',
                                        fontWeight: '400', lineHeight: 'normal', letterSpacing: '-0.01031rem',
                                        color: '#0788FF', margin: 0}}>{post.userId}</p> : null}
                                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                        fontSize: '0.625rem', fontStyle: 'normal', fontWeight: '400',
                                        lineHeight: 'normal', letterSpacing: '-0.01031rem', marginTop: '0.1rem'}}>
                                        <div style={{display: 'flex', alignItems: 'center', padding: 0}}>
                                            <img src={clockImg} alt="clockImg"
                                                 style={{width: '0.45006rem', height: '0.4375rem', flexShrink: 0}}/>
                                            <p style={{margin: '0 0.51rem 0 0'}}>{TimeUtil.getDiffStr(post.writtenAt)}</p>
                                        </div>
                                        <div style={{display: 'flex', alignItems: 'center'}}>
                                            <img src={likeImg} alt="likeImg"
                                                 style={{width: '0.45006rem', height: '0.4375rem', flexShrink: 0, padding: 0}}/>
                                            <p style={{margin: '0 0.51rem 0 0'}}>{post.recommend}</p>
                                        </div>
                                        <div style={{display: 'flex', alignItems: 'center'}}>
                                            <img src={commentImg} alt="commentImg"
                                                  style={{width: '0.45006rem', height: '0.4375rem', flexShrink: 0}}/>
                                            <p style={{margin: '0 0.51rem 0 0'}}>{post.comments ? post.comments.length : 0}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    )
                    )}
                </div>
            ) : null}
        </div>
    )
};

export default ArticleListTemplate;