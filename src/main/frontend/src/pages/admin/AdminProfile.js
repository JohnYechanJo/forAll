import { useState, useCallback } from "react";
import "../../components/Styles.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import ImageInputs from "../../components/ImageInputs";
import Modal from "react-modal";
import { ModalStyles } from "../../components/ModalStyles";
import ImageInput from "../../components/ImageInput";
import axios from "axios";
import ImageUploader from "../../utils/imageUploader";
import ImageViewer from "../../components/ImageViewer";

const GuestRegistry = () => {
    const location = useLocation();
    const data = {...location.state};
    const navigate = useNavigate();

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


    return (
        <div>
            <div style={{
                textAlign: "center",
                fontSize: "0.9375rem",
                lineHeight: "1.375rem",
                marginTop: "2.5rem",
            }}>2. 프로필 등록</div>
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
                <input disabled={true}  type="text" placeholder="ex.한식 퓨전 요리를 선보이는 매장 '브와르'를 운영하고 있습니다." style={{width:"98%", height: "1.875rem" }}
                       defaultValue={data.introduction}/>

                <a className="fontForRegister" >프로필 등록 사진<span className="fontForRegister" style={{color:"#FF2929"}} >*</span></a>
                <p>
                    <ImageViewer val={data.profilePhoto} />
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
                        <button
                            disabled={true}
                            key={index}
                            style={{
                                display: 'inline-block',
                                flexShrink: '0',
                                margin: '1vw',
                                width: '100%',
                                height: '1.25rem',
                                border: '1px solid #C4C4C4',
                                borderRadius: '0.3125rem',
                                cursor: data.mbti === mbti ? 'default' : 'pointer',
                                backgroundColor: data.mbti === mbti ? 'lightgray' : 'white',
                                textAlign: 'center',
                                fontSize: '0.625rem',
                            }}
                        >
                            {mbti}
                        </button>
                    ))}
                </div>
                <a style={{ fontSize: "0.625rem" }} >• 자신 있는 분야를 선택해주세요!</a>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: '0.31rem'
                }}>
                    {FOOD_TYPES.map((foodType, index) => (
                        <button
                            disabled={true}
                            key={index}
                            style={{
                                display: 'inline-block',
                                flexShrink: '0',
                                margin: '1vw',
                                width: '100%',
                                height: '1.25rem',
                                border: '1px solid #C4C4C4',
                                borderRadius: '0.3125rem',
                                cursor: data.cook ? (data.cook.includes(foodType) ? 'default' : 'pointer') : 'default',
                                backgroundColor: data.cook ? (data.cook.includes(foodType) ? 'lightgray' : 'white') : 'white',
                                textAlign: 'center',
                                fontSize: '0.625rem',
                            }}
                        >
                            {foodType}
                        </button>
                    ))}
                </div>
                <a style={{ fontSize: "0.625rem" }}>• 좋아하는 요리재료를 선택해주세요! </a>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: '0.31rem'
                }}>
                    {INGREDIENT_TYPES.map((ingredient, index) => (
                        <button
                            disabled={true}
                            key={index}
                            style={{
                                display: 'inline-block',
                                flexShrink: '0',
                                margin: '1vw',
                                width: '100%',
                                height: '1.25rem',
                                border: '1px solid #C4C4C4',
                                borderRadius: '0.3125rem',
                                cursor: data.cookItem ? (data.cookItem.includes(ingredient) ? 'default' : 'pointer') : 'default',
                                backgroundColor:  data.cookItem ? (data.cookItem.includes(ingredient) ? 'lightgray' : 'white') : 'white',
                                textAlign: 'center',
                                fontSize: '0.625rem',
                            }}
                        >
                            {ingredient}
                        </button>
                    ))}
                </div>
            </div>

            <div style={{display:'flex',width:'100%',margin:'0px',marginTop:'4rem'}}>
                <button style={{marginLeft:'auto',backgroundColor:"#FF4F4F",width:'50%',bottom:'0',height:'3.125rem',color:'white',border:'none',lineHeight:'1.875rem',textAlign:'center'}}
                        onClick={() => navigate(-1)}
                >
                    이전</button>
                <button style={{marginLeft:'auto',backgroundColor:"#525252",width:'50%',bottom:'0',height:'3.125rem',color:'white',border:'none',lineHeight:'1.875rem',textAlign:'center'}}
                        onClick={()=>navigate("/adminchefViewPage3", {state:data})}
                >다음</button>
            </div>
        </div>
    );
}
export default GuestRegistry;