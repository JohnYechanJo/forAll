import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import ImageInput from "../components/ImageInput";
import Modal from "react-modal";
import {ModalStyles} from "../components/ModalStyles";
import ImageViewer from "../components/ImageViewer";

const ProfileViewPage = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [profile, setProfile] = useState({});

    const MBTI_TYPES = [
        'ISTJ', 'ISFJ', 'INFJ', 'INTJ',
        'ISTP', 'ISFP', 'INFP', 'INTP',
        'ESTP', 'ESFP', 'ENFP', 'ENTP',
        'ESTJ', 'ESFJ', 'ENFJ', 'ENTJ'
    ];
    const FOOD_TYPES = [
        '한식', '양식', '일식', '중식', '동남아', '인도', '멕시칸', '해산물', '파스타', '육류',
        '디저트', '제과', '제빵', '커피', '다이닝', '퓨전', '기타',
        '와인', '양주', '사케', '칵테일', '전통주',
    ];
    const INGREDIENT_TYPES = [
        '육류', '가공육류', '어류', '해조류', '갑각류', '어패류', '곡류', '채소류', '버섯류', '과실류', '견과류', '콩류', '계란', '유제품류', '약재', '조미료',
    ];

    useEffect(() => {
        axios.get("/api/v1/profile/public/"+params.id)
            .then((res) => setProfile(res.data))
            .catch((err) => console.error(err));
    }, []);
    return (
        <div>
            <button onClick={()=>navigate(-1)}>{"<"}</button>
            <div style={{
                textAlign: "center",
                fontSize: "0.9375rem",
                lineHeight: "1.375rem",
                marginTop: "2.5rem",
            }}>프로필</div>
            <div style={{
                display: "flex",
                flexDirection: "column",
                padding: "1rem",
                alignItems: "flex-start",
                gap: "1rem",
                fontSize: "0.625rem",
                justifyContent: "center",
            }}>
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    padding: "1rem",
                    gap: "1rem",
                    fontSize: "0.625rem",
                }}>
                </div>

                <div style={{width:"100%"}}>
                    <a className="fontForRegister" >소개<span className="fontForRegister" style={{color:"#FF2929"}} >*</span></a>
                    <hr style={{ height: "2px", backgroundColor: "black"}} />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <a className="fontForRegister" >본인 한 줄 소개<span className="fontForRegister" style={{color:"#FF2929"}} >*</span></a>
                </div>
                <input type="text"style={{width:"21.875rem", height: "1.875rem" }}
                       value={profile.introduction}  disabled={true}/>

                <a className="fontForRegister" >프로필 등록 사진<span className="fontForRegister" style={{color:"#FF2929"}} >*</span></a>
                <p>
                    <ImageViewer val={profile.profilePhoto} />
                </p>
                <div style={{width:"100%"}} >
                    <a className="fontForRegister" >관심사<span className="fontForRegister" style={{color:"#FF2929"}} >*</span></a>
                    <hr style={{ height: "2px", backgroundColor: "black"}} />
                    <a style={{ marginBottom: "0", fontSize: "0.625rem" }}>• 내 관심사를 프로필에 추가하면 사람들이 유저님을 잘 알아볼 수 있어요.</a>
                </div>

                <a style={{ fontSize: "0.625rem" }} >• MBTI 선택으로 오너님의 성격을 대략적으로 알 수 있게 해주세요:)</a>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: '0.31rem'
                }}>
                    {MBTI_TYPES.map((mbti, index) => (
                        <div
                            key={index}
                            style={{
                                display: 'inline-block',
                                flexShrink: '0',
                                margin: '1vw',
                                width: '3.125rem',
                                height: '1.25rem',
                                border: '1px solid #C4C4C4',
                                borderRadius: '0.3125rem',
                                backgroundColor: profile.mbti === mbti ? 'lightgray' : 'white',
                                textAlign: 'center',
                                fontSize: '0.625rem',
                            }}
                        >
                            {mbti}
                        </div>
                    ))}
                </div>
                <a style={{ fontSize: "0.625rem" }} >• 자신 있는 분야를 선택해주세요!</a>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: '0.31rem'
                }}>
                    {FOOD_TYPES.map((foodType, index) => (
                        <div
                            key={index}
                            style={{
                                display: 'inline-block',
                                flexShrink: '0',
                                margin: '1vw',
                                width: '3.125rem',
                                height: '1.25rem',
                                border: '1px solid #C4C4C4',
                                borderRadius: '0.3125rem',
                                backgroundColor: profile.cook ? (profile.cook.includes(foodType) ? 'lightgray' : 'white'):"white",
                                textAlign: 'center',
                                fontSize: '0.625rem',
                            }}
                        >
                            {foodType}
                        </div>
                    ))}
                </div>
                <a style={{ fontSize: "0.625rem" }}>• 좋아하는 요리재료를 선택해주세요! </a>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: '0.31rem'
                }}>
                    {INGREDIENT_TYPES.map((ingredient, index) => (
                        <div
                            key={index}
                            style={{
                                display: 'inline-block',
                                flexShrink: '0',
                                margin: '1vw',
                                width: '3.125rem',
                                height: '1.25rem',
                                border: '1px solid #C4C4C4',
                                borderRadius: '0.3125rem',
                                backgroundColor: profile.cookItem ? (profile.cookItem.includes(ingredient) ? 'lightgray' : 'white') : 'white',
                                textAlign: 'center',
                                fontSize: '0.625rem',
                            }}
                        >
                            {ingredient}
                        </div>
                    ))}
                </div>
                {profile.career ? (<div>
                    <h4 style={{marginBottom:"0"}} >경력</h4>
                    <hr style={{height: "2px", backgroundColor: "black", width:"95vw"}}/>
                    {profile.career.map((item, index) => (
                        <div style={{ position: 'relative', display: 'inline-block' }}>
                            <div key={index}
                                 style={{
                                     display: 'flex',
                                     justifyContent: 'center',
                                     alignItems: 'center',
                                     height: "3vh",
                                     width: '45vw',
                                     border: '2px solid lightgray',
                                     backgroundColor: 'white',
                                     borderRadius: '7px',
                                     marginTop: '5px',
                                 }}
                            >
                                {item}
                            </div>
                        </div>
                    ))}
                </div>):null}


            </div>
        </div>
    );
};

export default ProfileViewPage;