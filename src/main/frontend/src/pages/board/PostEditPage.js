import Sidebar from "../../components/home/Sidebar";
import HomeTemplate from "../../components/home/HomeTemplate";
import {useNavigate, useLocation} from "react-router-dom";
import {useCallback, useState} from "react";
import {TimeUtil} from "../../utils/TimeUtil";
import axios from "axios";
import ImageInputs from "../../components/ImageInputs";
import ImageUploader from "../../utils/imageUploader";
const PostEditPage = () => {
    const location = useLocation();
    const data = {...location.state};
    console.log(data);
    const navigate = useNavigate();
    const [title, setTitle] = useState(data.title);
    const [content, setContent] = useState(data.content);
    const [imageList, setImageList] = useState(data.postImage);
    const onChangeTitle = useCallback((e) => {
        setTitle(e.target.value);
    }, []);
    const onChangeContent = useCallback((e) => {
        setContent(e.target.value);
    }, []);
    const submit = async () => {
        const postImage = await Promise.all(imageList.map(async (img) => await ImageUploader(img, sessionStorage.getItem("user_id"))));

        axios.put("/api/v1/articles",{
            id:data.id,
            title:title,
            content:content,
            writtenAt:data.writtenAt,
            category:data.category,
            userId: data.userId,
            postImage: postImage
        }).then(()=>navigate(-1))
            .catch((err)=>console.error(err));
    };
    return(
        <div>
            <div className="header" style={{backgroundColor: "white"}}> {/*헤더에 뒤로가기 버튼 집어넣기*/}
                <div style={{
                    position: 'absolute',
                    left: '1rem',
                    top: '0.8rem',
                    width: '5rem',
                    height: '1.25rem',
                    backgroundColor: 'white'
                }}>
                    <a style={{
                        fontFamily: 'Mukta',
                        fontSize: '0.75rem',
                        fontWeight: '700',
                        letterSpacing: '-0.01031rem',
                        border: '2px solid black'
                    }}
                       onClick={() => navigate('/')}
                    >For ALL.</a>
                </div>
                <button className="button" onClick={() => navigate("/", {state: {focus: "space"}})}>대관하기</button>
                <button className="button" onClick={() => navigate("/", {state: {focus: "board"}})}>커뮤니티</button>
            </div>
            <Sidebar/>
            <HomeTemplate/>
            <h1>내가 쓴 글</h1>
            <div>
                <input value={title} onChange={onChangeTitle}/>
                <p>ID: {data.userId}</p>
                <p>{TimeUtil.getDiffStr(data.writtenAt)}</p>
                <p>{data.recommend}</p>
                <p>댓글수 : {data.comments ? data.comments.length : 0}</p>
            </div>
            <div>
                <input value={content} onChange={onChangeContent}/>
                <ImageInputs setImg={setImageList} vals={imageList}/>
                <button onClick={submit}>제출</button>
            </div>
        </div>
    )
};

export default PostEditPage;