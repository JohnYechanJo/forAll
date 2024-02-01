import Sidebar from "../../components/home/Sidebar";
import HomeTemplate from "../../components/home/HomeTemplate";
import {useNavigate, useLocation} from "react-router-dom";
import {useCallback, useState} from "react";
import {TimeUtil} from "../../utils/TimeUtil";
import axios from "axios";
import ImageInputs from "../../components/ImageInputs";
import ImageUploader from "../../utils/imageUploader";
import ImageViewer from "../../components/ImageViewer";
import clip from "../../components/icons/clip.png";
import pencilImg from "../../components/icons/pencil.jpg";
import ImagePreView from "../../components/ImagePreView";
import xmark from "../../components/icons/xmark.png";
const PostEditPage = () => {
    const location = useLocation();
    const data = {...location.state};
    const navigate = useNavigate();
    const [title, setTitle] = useState(data.title);
    const [content, setContent] = useState(data.content);
    const [imageList, setImageList] = useState(data.postImage);
    const postContentPlaceholder = "포 올은 누구나 기분 좋게 참여할 수 있는 커뮤니티를 만들기 위해 커뮤니티 이용규칙을 제정하여 운영하고 있습니다. 위반 시 게시물이 삭제되고 서비스 이용이 일정 기간 제한될 수 있습니다.\n\n 아래는 이 게시판에 해당하는 핵심 내용에 대한 요약 사항이며, 게시물 작성 전 커뮤니티 이용규칙 전문을 반드시 확인하시기 바랍니다.\n\n※ 정치, 사회 관련 행위 금지\n-국가기관, 정치 관련 단체, 언론, 시민단체에 대한 언급 혹인 이와 관련한 행위\n-정책, 외교 또는 정책, 정파에 대한 의견, 주장 및 이념, 가치관을 드러내는 행위\n-성별, 종교, 인종, 출신, 지역, 직업, 이념 등 사회적 이유에 대한 언급 혹은 이와 관련한 행위\n,-위와 같은 내용으로 유추될 수 있는 비유, 은어 사용 행위\n*해당 게시물은 시사, 이슈 게시판에만 작성 가능합니다.";

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
                    }}>• 내가 쓴 글</h1>
                </div>
                <div>
                    <input value={title} onChange={onChangeTitle} placeholder={"제목을 입력해주세요"} style={{
                        fontSize: '1.25rem', fontStyle: 'normal', fontWeight: '500',
                        lineHeight: 'normal', letterSpacing: '-0.01031rem', margin:"0.5rem",
                        border:0
                    }}/>
                </div>
                <div style={{display:"flex", margin:"0.5rem"}}>
                    <div style={{width:"1.5rem", height:"1.5rem", borderRadius:"1.5rem", overflow:"hidden"}}>
                        <ImageViewer val={null}/>
                    </div>
                    <div style={{color:"#0788FF",fontStyle:"0.875rem"}}>{sessionStorage.getItem("user_id")}</div>
                </div>
                <div>
                    <textarea value={content} onChange={onChangeContent}
                              placeholder={postContentPlaceholder} style={{
                        fontSize: '0.875rem', fontStyle: 'normal', fontWeight: '400',
                        lineHeight: 'normal', letterSpacing: '-0.01031rem', margin:"0.5rem 0 0.5rem 0rem",
                        border:0, width:"100%", height:"25rem"
                    }}/>
                </div>
                <div style={{display:"flex",justifyContent:"space-between"}}>
                    <label>
                        <input type={"file"}
                               accept="image/*"
                               onChange={(e) => setImageList([...imageList, ...Array.from(e.target.files)] )}
                               style={{display: "none"}}
                               multiple={true}
                        />
                        <div>
                            <img src={clip} alt="pencilImg" style={{
                                width: '0.625rem', height: '0.625rem',
                                flexShrink: 0, marginLeft: '1rem'
                            }}/>
                        </div>
                    </label>
                    <div style={{textAlign:"right", paddingRight:"1rem"}}>
                        <div onClick={submit}>
                            <img src={pencilImg} alt="pencilImg" style={{
                                width: '0.625rem', height: '0.625rem',
                                flexShrink: 0
                            }}/>
                        </div>
                    </div>

                </div>

                <div>
                    {imageList ? imageList.map((img, idx) => (
                        <div key={idx}>
                            <div style={{display:"flex"}}>
                                <ImagePreView img={img}/>
                                <div onClick={()=>setImageList(imageList.filter((i) => i !== img))}>
                                    <a>
                                        <img src={xmark} alt="xmark" style={{width:"1.5rem", height:"1.5rem"}} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    )) : null}
                </div>

            </div>
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

export default PostEditPage;