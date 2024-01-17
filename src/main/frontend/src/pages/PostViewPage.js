import {useParams} from "react-router-dom";
import {useCallback, useEffect, useState} from "react";
import axios from "axios";
import {BoardCategory} from "../utils/enums";

const PostViewPage = () => {
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
            writtenAt: new Date().toDateString(),
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
            writtenAt: new Date().toDateString(),
            userId: sessionStorage.getItem("user_id")
        }).then(()=>{
            setRecomment("");
            setWriteRecomment(-1);
            updateData();
        }).catch((err) => console.error(err));
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
            <div>
                {data.category === BoardCategory.Popup ? <p>팝업</p> : null}
                {data.category === BoardCategory.Chat ? <p>잡담</p> : null}
                {data.category === BoardCategory.Recipe ? <p>레시피</p> : null}
                <h1>{data.title}</h1>
                <p>ID: {data.userId}</p>
                <p>댓글수 : {data.comments ? data.comments.length : 0}</p>
                <p>프로필 보기</p> {/*todo : 프로필 연결*/}
                <p>채팅 보내기</p> {/*todo : 채팅 연결*/}
            </div>
            <div>
                <p>{data.content}</p>
                <p>댓글수 : {data.comments ? data.comments.length : 0}</p>
            </div>
            <button onClick={()=>setWriteComment(true)}>댓글을 남겨주세요</button>
            {writeComment ? (
                <div>
                    <input value={comment} onChange={onChangeComment}/>
                    <button onClick={submitComment}>제출</button>
                </div>
            ): null}
            {data.comments ? (<div>
                {data.comments.map((comment, idx) => (
                    <div key={idx}>
                        <p>{comment.userId}</p>
                        <p>{comment.text}</p>
                        <p onClick={() => setWriteRecomment(idx)}>대댓글: {comment.recomments ? comment.recomments.length : 0}</p>
                        { writeRecomment === idx ? (<div>
                            <input value={recomment} onChange={onChangeRecomment}/>
                            <button onClick={() => submitRecomment(idx)}>제출</button>
                        </div>) : null}
                        { comment.recomments ? (<div>
                            {comment.recomments.map((recomment, idx) => (
                                <div key={idx}>
                                    <p>{recomment.userId}</p>
                                    <p>{recomment.text}</p>
                                </div>
                            ))}
                        </div>) : null}
                    </div>
                ))}
            </div>): null}




        </div>
    )
};
export default PostViewPage;