import {useCallback, useEffect, useState} from "react";
import {BoardCategory, MainPageType} from "../../utils/enums";
import axios from "axios";
import Sidebar from "../../components/home/Sidebar";
import HomeTemplate from "../../components/home/HomeTemplate";
import ArticleListTemplate from "../../components/board/ArticleListTemplate";
import {TimeUtil} from "../../utils/TimeUtil";
import ImageUploader from "../../utils/imageUploader";
import {useNavigate} from "react-router-dom";
import ImageViewer from "../../components/ImageViewer";
import ImagePreView from "../../components/ImagePreView";
import updownImg from "../../components/icons/updown.jpg";
import pencilImg from "../../components/icons/pencil.jpg";

const PopupBoardPage = () => {
    const navigate = useNavigate();
    const [postList, setPostList] = useState([]);
    const [newPost, setNewPost] = useState(false);
    const [postTitle, setPostTitle] = useState("");
    const [postContent, setPostContent] = useState("");
    const [postImage, setPostImage] = useState([]);

    const postContentPlaceholder = "포 올은 누구나 기분 좋게 참여할 수 있는 커뮤니티를 만들기 위해 커뮤니티 이용규칙을 제정하여 운영하고 있습니다. 위반 시 게시물이 삭제되고 서비스 이용이 일정 기간 제한될 수 있습니다.\n\n 아래는 이 게시판에 해당하는 핵심 내용에 대한 요약 사항이며, 게시물 작성 전 커뮤니티 이용규칙 전문을 반드시 확인하시기 바랍니다.\n\n※ 정치, 사회 관련 행위 금지\n-국가기관, 정치 관련 단체, 언론, 시민단체에 대한 언급 혹인 이와 관련한 행위\n-정책, 외교 또는 정책, 정파에 대한 의견, 주장 및 이념, 가치관을 드러내는 행위\n-성별, 종교, 인종, 출신, 지역, 직업, 이념 등 사회적 이유에 대한 언급 혹은 이와 관련한 행위\n,-위와 같은 내용으로 유추될 수 있는 비유, 은어 사용 행위\n*해당 게시물은 시사, 이슈 게시판에만 작성 가능합니다.";
    const onChangePostTitle = useCallback((e)=>setPostTitle(e.target.value),[]);
    const onChangePostContent = useCallback((e)=>setPostContent(e.target.value),[]);

    const UploadPost = async () => {
        const userId = sessionStorage.getItem("user_id");
        const imageList = await Promise.all(postImage.map(async (img) => await ImageUploader(img, userId)));
        axios.post("/api/v1/articles", {
            title: postTitle,
            content: postContent,
            writtenAt: TimeUtil.now(),
            category: BoardCategory.Popup,
            postImage: imageList,
            userId: userId
        }).then(() => window.location.reload())
            .catch((err) => console.error(err));
    };

    const updateData = async () => {
        await axios.get("/api/v1/articles/category/" + BoardCategory.Popup)
            .then((res) => setPostList(res.data.sort((a,b) => {
                if(a.writtenAt > b.writtenAt) return -1;
                else return 1;
            })))
            .catch((err) => console.error(err));
    }
    useEffect(() => {
        updateData();
    }, []);
    return(
        <div>
            <div className="header" style={{backgroundColor:"white"}}> {/*헤더에 뒤로가기 버튼 집어넣기*/}
                <button className="button" onClick={() => navigate("/",{state: {focus: "space"}})}>대관하기</button>
                <button className="button">커뮤니티</button>
            </div>
            <Sidebar/>
            <HomeTemplate />
            <div>
                <div style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    width: '100%', height: '3.125rem', flexShrink: 0, border: '1px solid #C4C4C4', background: '#FFF'
                }}>
                    <h1 style={{
                        fontSize: '0.875rem', fontStyle: 'normal', fontWeight: '700', lineHeight: 'normal',
                        letterSpacing: '-0.01031rem', marginLeft: '0.1rem'
                    }}>• 팝업</h1>
                    <img src={updownImg} alt="updownImg" style={{
                        width: '0.625rem', height: '0.625rem',
                        flexShrink: 0, marginRight: '1rem'
                    }}/>
                </div>
                <div style={{
                    display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%',
                    height: '3.125rem', flexShrink: 0, border: '1px solid #C4C4C4', background: '#FFF'
                }}>
                    <div onClick={() => setNewPost(true)}
                         style={{
                             display: 'flex', alignItems: 'center', width: '21.875rem', height: '1.875rem',
                             flexShrink: 0, border: '1px solid #C4C4C4', background: '#FFF'
                         }}>
                        <img src={pencilImg} alt="pencilImg" style={{
                            width: '0.625rem', height: '0.625rem',
                            flexShrink: 0, marginLeft: '1rem', marginRight: '0.4rem'
                        }}/>
                        <p style={{
                            fontSize: '0.625rem', fontStyle: 'normal', fontWeight: '500',
                            lineHeight: 'normal', letterSpacing: '-0.01031rem'
                        }}>새 글을 작성해주세요!</p>
                        {/*<a onClick={() => setNewPost(true)}*/}
                        {/*    disabled={!sessionStorage.getItem("user_id")}>새 글을 작성해주세요!</a>*/}
                    </div>
                </div>
                <div>
                    {newPost ? (
                        <div>
                            <input value={postTitle} onChange={onChangePostTitle} placeholder={"글 제목"}/>
                            <input value={postContent} onChange={onChangePostContent}
                                   placeholder={postContentPlaceholder}/>
                            <label>
                                <input type={"file"}
                                       accept="image/*"
                                       onChange={(e) => setPostImage(Array.from(e.target.files))}
                                       style={{display: "none"}}
                                       multiple={true}
                                />
                                <div>첨부파일</div>
                            </label>
                            <button onClick={UploadPost}>글 올리기</button>
                            <div>
                                {postImage ? postImage.map((img, idx) => (
                                    <ImagePreView img={img}/>
                                )) : null}
                            </div>

                        </div>
                    ) : null}
                </div>
                <ArticleListTemplate postList={postList}/>
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
        </div>
    )
};
export default PopupBoardPage;