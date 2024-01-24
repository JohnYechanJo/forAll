import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import ImageUploader from "../../utils/imageUploader";
import ImageInput from "../../components/ImageInput";
import Modal from "react-modal";
import {ModalStyles} from "../../components/ModalStyles";

const ProfileModifyPage = () => {
    const location = useLocation();
    const data = {...location.state};
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
        if (introduce && profileImage) {
            submit();
        }
        else setIsModalOpen(true);
    }
    const [isModalOpen, setIsModalOpen] = useState(false);
    const submit = async () => {
        const userId = sessionStorage.getItem("user_id");
        const picture = await ImageUploader(profileImage, userId);
        axios.put("/api/v1/profile", {
            userId: userId,
            introduction: introduce,
            profilePhoto: picture,
            mbti: selectedMBTI,
            cook: selectedFoodTypes,
            cookItem: selectedIngredient,
        }).then(() => setIsModalOpen(true))
            .catch((err) => console.error(err));

    };

    useEffect(() => {
        const userId = sessionStorage.getItem("user_id");
        axios.get("/api/v1/profile/"+userId)
            .then((res) => {
                console.log(res.data);
                setIntroduce(res.data.introduction);
                setProfileImage(res.data.profilePhoto);
                setSelectedMBTI(res.data.mbti ? res.data.mbti : "");
                setSelectedFoodTypes(res.data.cook ? res.data.cook : []);
                setSelectedIngredient(res.data.cookItem ? res.data.cookItem : []);
            })
            .catch((err) => console.error(err));
    }, []);

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
                <input type="text" value={introduce} placeholder="ex.한식 퓨전 요리를 선보이는 매장 '브와르'를 운영하고 있습니다." style={{width:"21.875rem", height: "1.875rem" }}
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
            <Modal isOpen={isModalOpen} style={ModalStyles} >
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50" fill="none">
                    <path
                        d="M22.0832 28.7503L17.5519 24.2191C17.17 23.8371 16.7012 23.6462 16.1457 23.6462C15.5901 23.6462 15.104 23.8545 14.6873 24.2712C14.3054 24.6531 14.1144 25.1392 14.1144 25.7295C14.1144 26.3198 14.3054 26.8059 14.6873 27.1878L20.6248 33.1253C21.0068 33.5073 21.4929 33.6982 22.0832 33.6982C22.6735 33.6982 23.1596 33.5073 23.5415 33.1253L35.3644 21.3024C35.7464 20.9205 35.9373 20.4517 35.9373 19.8962C35.9373 19.3406 35.729 18.8545 35.3123 18.4378C34.9304 18.0559 34.4443 17.8649 33.854 17.8649C33.2637 17.8649 32.7776 18.0559 32.3957 18.4378L22.0832 28.7503ZM24.9998 45.8337C22.1179 45.8337 19.4096 45.2864 16.8748 44.192C14.3401 43.0989 12.1353 41.6149 10.2603 39.7399C8.38525 37.8649 6.90123 35.66 5.80817 33.1253C4.71373 30.5906 4.1665 27.8823 4.1665 25.0003C4.1665 22.1184 4.71373 19.41 5.80817 16.8753C6.90123 14.3406 8.38525 12.1357 10.2603 10.2607C12.1353 8.38574 14.3401 6.90102 16.8748 5.80658C19.4096 4.71352 22.1179 4.16699 24.9998 4.16699C27.8818 4.16699 30.5901 4.71352 33.1248 5.80658C35.6596 6.90102 37.8644 8.38574 39.7394 10.2607C41.6144 12.1357 43.0984 14.3406 44.1915 16.8753C45.2859 19.41 45.8332 22.1184 45.8332 25.0003C45.8332 27.8823 45.2859 30.5906 44.1915 33.1253C43.0984 35.66 41.6144 37.8649 39.7394 39.7399C37.8644 41.6149 35.6596 43.0989 33.1248 44.192C30.5901 45.2864 27.8818 45.8337 24.9998 45.8337Z"
                        fill="black"/>
                </svg>
            <p style={{color: "#000", fontFamily:"Noto Sans KR", fontSize:"0.9375rem",
                fontStyle: "normal", fontWeight: "400", lineHeight: "normal"}}>회원정보가 수정되었습니다!</p>
            <hr/>
            <button onClick={()=>navigate("/")} style={{width:'100%',height:'3.125rem',backgroundColor:'white',border:'none'}} >확인</button>
            </Modal>
            <div style={{display:'flex',width:'100%',margin:'0px',marginTop:'4rem'}}>
                <button style={{marginLeft:'auto',backgroundColor:"#FF4F4F",width:'50%',bottom:'0',height:'3.125rem',color:'white',border:'none',lineHeight:'1.875rem',textAlign:'center'}}
                        onClick={() => navigate(-1)}
                >
                    이전</button>
                <button style={{marginLeft:'auto',backgroundColor:"#525252",width:'50%',bottom:'0',height:'3.125rem',color:'white',border:'none',lineHeight:'1.875rem',textAlign:'center'}}
                        onClick={()=>handleButton()}
                >다음</button>
            </div>
        </div>
    );
};
export default ProfileModifyPage;