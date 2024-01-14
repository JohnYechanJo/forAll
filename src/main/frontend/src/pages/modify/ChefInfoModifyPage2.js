import {useEffect, useState} from "react";
import "../../components/Styles.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Modal from "react-modal";
import {ModalStyles} from "../../components/ModalStyles";
import axios from "axios";
import ImageUploader from "../../utils/imageUploader";

const ChefInfoModifyPage2 = () => {
    const location = useLocation();
    const data = {...location.state};
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpen2, setIsModalOpen2] = useState(false);
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
        '한식', '양식', '일식', '중식', '동남아', '인도', '멕시칸','씨푸드','파스타','육류',
        '디저트', '제과', '제빵', '커피', '다이닝', '퓨전', '기타',
        '와인','양주','사케','칵테일','전통주',
    ];
    const INGREDIENT_TYPES = [
        '육류','가공육류','어류','해조류','갑각류','어패류','곡류','채소류','버섯류','과실류','견과류','콩류','계란','유제품류','약재','조미료',
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
        if ((selectedMBTI !== "") && (selectedFoodTypes.length !== 0) && (selectedIngredient.length !== 0)){
            submit();
        }
        else setIsModalOpen(true);
    }
    useEffect(() => {
        const userId = sessionStorage.getItem("user_id")
        axios.get("/api/v1/profile/" + userId)
            .then((res) => {
                setSelectedMBTI(res.data.mbti);
                setSelectedFoodTypes(res.data.cook);
                setSelectedIngredient(res.data.interest);
            })
            .catch(() => {
                navigate("/error");
            })
    },[])
    // backend로 보내는 함수를 구현하면 됨
    const submit = async () => {
        const userId = sessionStorage.getItem("user_id");
        const picture = await ImageUploader(data.profileImage, userId);
        axios.post("/api/v1/profile", {
            userId: userId,
            introduction: data.introduce,
            detailIntroduction: data.introduceDetail,
            career: data.career,
            picture: picture,
            pictureExplain: data.imageExplain,
            mbti: selectedMBTI,
            cook: selectedFoodTypes,
            interest: selectedIngredient,
        }).then((res) => {
            setIsModalOpen2(true);
        }).catch((err) => console.error(err));
    };
    return(
        <div className="margin"
             style={{
                 display: "flex",
                 justifyContent: "space-around",
                 flexDirection: "column",
             }}>
            <header style={{textAlign: "center"}}><h3>2. 관심사</h3></header>
            <h4 style={{marginBottom: "0"}}>관심사</h4>
            <hr style={{height: "2px", backgroundColor: "black", width: "95vw"}}/>
            <h4 style={{marginBottom: "0"}}>• 내 관심사를 프로필에 추가하면 훨씬 쉽게 크루에 참여할 수 있어요.</h4>
            <h4>• MBTI 선택으로 크루원이 자신의 성격을 대략적으로 알 수 있게 해주세요:)</h4>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '10px'
            }}>
                {MBTI_TYPES.map((mbti, index) => (
                    <div
                        key={index}
                        style={{
                            display: 'inline-block',
                            margin: '1vw',
                            height: '3vh',
                            border: '1px solid black',
                            borderRadius: '10px',
                            cursor: selectedMBTI === mbti ? 'default' : 'pointer',
                            backgroundColor: selectedMBTI === mbti ? 'lightgray' : 'white',
                            textAlign: 'center',
                        }}
                        onClick={() => setSelectedMBTI(mbti)}
                    >
                        {mbti}
                    </div>
                ))}
            </div>
            <h4>• 자신있는 요리를 선택해주세요!</h4>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '10px'
            }}>
                {FOOD_TYPES.map((foodType, index) => (
                    <div
                        key={index}
                        style={{
                            display: 'flex',
                            margin: '1vw',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '3vh',
                            border: '1px solid black',
                            borderRadius: '10px',
                            cursor: selectedFoodTypes.includes(foodType) ? 'default' : 'pointer',
                            backgroundColor: selectedFoodTypes.includes(foodType) ? 'lightgray' : 'white'
                        }}
                        onClick={() => toggleFoodType(foodType)}
                    >
                        {foodType}
                    </div>
                ))}
            </div>
            <h4>• 좋아하는 요리재료를 선택해주세요! 본인과 비슷한 사람을 찾을 수 있답니다.</h4>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '10px'
            }}>
                {INGREDIENT_TYPES.map((ingredient, index) => (
                    <div
                        key={index}
                        style={{
                            display: 'flex',
                            margin: '1vw',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '3vh',
                            border: '1px solid black',
                            borderRadius: '10px',
                            cursor: selectedIngredient.includes(ingredient) ? 'default' : 'pointer',
                            backgroundColor: selectedIngredient.includes(ingredient) ? 'lightgray' : 'white'
                        }}
                        onClick={() => toggleIngredient(ingredient)}
                    >
                        {ingredient}
                    </div>
                ))}
            </div>
            <div style={{display: "flex", justifyContent: "center", marginBottom: "6vh", marginTop: "3vh"}}>
                <Link to="/chefInfoModify">
                    <button style={{
                        backgroundColor: "black",
                        color: "white",
                        flex: "1",
                        border: "none",
                        width: "50vw",
                        height: "8vh"
                    }}>이전
                    </button>
                </Link>
                <button style={{
                    backgroundColor: "red",
                    color: "white",
                    flex: "1",
                    border: "none",
                    width: "50vw",
                    height: "8vh"
                }}
                        onClick={handleButton}
                >저장
                </button>
                <Modal isOpen={isModalOpen} style={ModalStyles} ariaHideApp={false}>
                    <p style={{fontSize:"16px"}} >필수 입력사항이 모두 기입되지 않았습니다.</p>
                    <button onClick={() => setIsModalOpen(false)}>뒤로</button>
                </Modal>
                <Modal isOpen={isModalOpen2} style={ModalStyles} ariaHideApp={false}>
                    <p style={{fontSize:"16px"}} >저장이 완료되었습니다!</p>
                    <button onClick={() => navigate("/main")}>확인</button>
                </Modal>
            </div>
        </div>

    )
}
export default ChefInfoModifyPage2;