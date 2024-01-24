import { useState, useCallback } from "react";
import "../../components/Styles.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import ImageInputs from "../../components/ImageInputs";
import Modal from "react-modal";
import { ModalStyles } from "../../components/ModalStyles";
import ImageInput from "../../components/ImageInput";
import axios from "axios";
import ImageUploader from "../../utils/imageUploader";

const GuestRegistry = () => {
    const navigate = useNavigate();
    const [introduce, setIntroduce] = useState("");
    const [profileImage, setProfileImage] = useState("");
    const [selectedMBTI, setSelectedMBTI] = useState("");
    const [selectedFoodTypes, setSelectedFoodTypes] = useState([]);
    const [selectedIngredient, setSelectedIngredient] = useState([]);

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
    const toggleFoodType = (foodType) => {
        if (selectedFoodTypes.includes(foodType)) {
            setSelectedFoodTypes(selectedFoodTypes.filter(type => type !== foodType));
        } else {
            setSelectedFoodTypes([...selectedFoodTypes, foodType]);
        }
    };
    const toggleIngredient = (ingredient) => {
        if (selectedIngredient.includes(ingredient)) {
            setSelectedIngredient(selectedIngredient.filter(type => type !== ingredient));
        } else {
            setSelectedIngredient([...selectedIngredient, ingredient]);
        }
    };
    const handleButton = () => {
        if ((introduce !== "") && (profileImage !== "")) {
            submit();
        }
        else setIsModalOpen(true);
    }
    const [isModalOpen, setIsModalOpen] = useState(false);
    const submit = async () => {
        const userId = sessionStorage.getItem("user_id");
        const picture = await ImageUploader(profileImage, userId);
        axios.post("/api/v1/profile", {
            userId: userId,
            introduction: introduce,
            picture: picture,
            mbti: selectedMBTI,
            cook: selectedFoodTypes,
            interest: selectedIngredient,

        }).then((res) => {
            navigate("/notification");
        }).catch((err) => console.error(err));
    };

    const onInputHandler = (e) => {
        setIntroduce(e.target.value);
    };

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
            <input type="text" placeholder="ex.한식 퓨전 요리를 선보이는 매장 '브와르'를 운영하고 있습니다." style={{width:"21.875rem", height: "1.875rem" }}
                onChange={onInputHandler} />

            <a className="fontForRegister" >프로필 등록 사진<span className="fontForRegister" style={{color:"#FF2929"}} >*</span></a>
            <p>
                <ImageInput setImg={setProfileImage} val={profileImage} />
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
                            cursor: selectedMBTI === mbti ? 'default' : 'pointer',
                            backgroundColor: selectedMBTI === mbti ? 'lightgray' : 'white',
                            textAlign: 'center',
                            fontSize: '0.625rem',
                        }}
                        onClick={() => setSelectedMBTI(mbti)}
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
                            cursor: selectedFoodTypes.includes(foodType) ? 'default' : 'pointer',
                            backgroundColor: selectedFoodTypes.includes(foodType) ? 'lightgray' : 'white',
                            textAlign: 'center',
                            fontSize: '0.625rem',
                        }}
                        onClick={() => toggleFoodType(foodType)}
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
                            cursor: selectedIngredient.includes(ingredient) ? 'default' : 'pointer',
                            backgroundColor: selectedIngredient.includes(ingredient) ? 'lightgray' : 'white',
                            textAlign: 'center',
                            fontSize: '0.625rem',
                        }}
                        onClick={() => toggleIngredient(ingredient)}
                    >
                        {ingredient}
                    </div>
                ))}
            </div>
            <div style={{
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
                width: "100%",
            }}>
                <Modal isOpen={isModalOpen} style={ModalStyles} ariaHideApp={false}>
                    <p style={{ fontSize: "16px" }}>필수 입력사항이 모두 기입되지 않았습니다.</p>
                    <button onClick={() => setIsModalOpen(false)}>뒤로</button>
                </Modal>
            </div>
            </div>
            
                <div style={{display:'flex',width:'100%',margin:'0px',marginTop:'4rem'}}>
                <button style={{marginLeft:'auto',backgroundColor:"#FF4F4F",width:'50%',bottom:'0',height:'3.125rem',color:'white',border:'none',lineHeight:'1.875rem',textAlign:'center'}}
                onClick={() => navigate('/signUp')}
                >
                    이전</button>
                <button style={{marginLeft:'auto',backgroundColor:"#525252",width:'50%',bottom:'0',height:'3.125rem',color:'white',border:'none',lineHeight:'1.875rem',textAlign:'center'}}
                    onClick={()=>handleButton()}
                >다음</button>
                </div>
        </div>
    );
}
export default GuestRegistry;