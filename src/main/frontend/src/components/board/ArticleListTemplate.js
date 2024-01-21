import {useCallback, useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {TimeUtil} from "../../utils/TimeUtil";

const ArticleListTemplate = ({postList, preview=false}) => {
    const navigate = useNavigate();
    return (
        <div>
            <div>
                {postList ? (
                    <div>
                        {postList.map((post, idx) => (
                                <div key={idx} onClick={() => navigate("/post/"+post.id)}>
                                    <p>{post.title}</p>
                                    {!preview ? <p>{post.content}</p> : null}
                                    <p>{TimeUtil.getDiffStr(post.writtenAt)}</p>
                                    <p>{post.recommend}</p>
                                    <p>댓글:{post.comments ? post.comments.length : 0}</p>

                                </div>
                            )
                        )}
                    </div>
                ) : null}
            </div>
        </div>
    )
};

export default ArticleListTemplate;