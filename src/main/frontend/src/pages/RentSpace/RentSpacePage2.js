import {useLocation, useNavigate} from "react-router-dom";
import ImageViewer from "../../components/ImageViewer";
import Calendar from "../../components/Calender";
import React, {useCallback, useEffect, useState} from "react";
import Alert from "../../components/Alert";
import "../../style/RentSpace.css";
import arrowleft from "../../components/icons/arrowleft.png";
import {AddressUtil} from "../../utils/AddressUtil";
import plusButton from "../../components/icons/plusButton.png";
import minusButton from "../../components/icons/minusButton.png";
const RentSpacePage2 = () => {
    const location = useLocation();
    const data = {...location.state};
    const navigate = useNavigate();
    const [rentDay, setRentDay] = useState("");
    const [trialDay, setTrialDay] = useState("");
    const [chefNum, setChefNum] = useState(1);
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [alertContent, setAlertContent] = useState("");
    const substractChef = () => { setChefNum(chefNum-1); }
    const addChef = () => { setChefNum(chefNum+1); }
    const submit = () => {
        if (!rentDay){
            setAlertContent("대관 희망 날짜를 선택해주세요");
            setIsAlertOpen(true);
        }else if(data.ableTrial && !trialDay){
            setAlertContent("트라이얼 희망 날짜를 선택해주세요");
            setIsAlertOpen(true);
        }else{
            navigate("/rentSpace3", {state:
                    {
                        ...data,
                        rentDay : rentDay.toString(),
                        trialDay: trialDay.toString(),
                        chefNum: chefNum
                    }})
        }
    }
    return (
        <div className={"rent_space_container"}>
            <div style={{display:"flex", alignItems:"center"}}>
                <img src={arrowleft} alt="arrowleft"
                     onClick={()=>navigate(-1)}
                     style={{width: '0.7rem', height: '1.1rem', flexShrink: 0, paddingLeft:"1rem"}}/>
                <div style={{textAlign:"center", flexGrow:"1"}}>
                    <p style={{fontSize:"1rem", padding:"1rem"}}>날짜 및 시간</p>
                </div>

            </div>
            <div>
                <ImageViewer val={data.spaceImage} isfixed={true}/>
                <p style={{fontSize:"1rem", paddingLeft:"1rem"}}>{AddressUtil.extraction(data.spaceAddress)} | {data.spaceName}</p>
            </div>
            <div style={{margin:"1rem"}}>
                <p style={{fontSize:"1rem"}}>• 날짜<span style={{ color: '#FF2929' }} >*</span></p>
                <hr style={{ height: "2px", backgroundColor: "black" }} />
                <p>대관 희망 날짜<span style={{color:"red"}}>*</span></p>
            </div>
            <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
                <Calendar setDate={setRentDay}/>
            </div>
            <p style={{margin:"1rem"}}>트라이얼 희망 날짜<span style={{color:"red"}}>*</span></p>
            <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
                {data.ableTrial ? ( <Calendar setDate={setTrialDay}/>) : (<p>오너가 트라이얼이 불가하다고 지정한 매장입니다.</p>)}
            </div>
            <p style={{margin:"1rem"}}>셰프 수<span style={{color:"red"}}>*</span></p>
            <div style={{display:"flex", paddingLeft:"1rem"}}>
                <div style={{margin:"0 0.5rem 0 0.5rem"}} onClick={()=>{
                    if (chefNum <= 1) return;
                    substractChef();
                }}>
                    <img src={minusButton} alt="minusButton"
                         style={{width: '1.125rem', height: '1.125rem', flexShrink: 0, display:"block"}}/>
                </div>
                <p>{chefNum}명</p>
                <div style={{margin:"0 0.5rem 0 0.5rem"}} onClick={()=>{
                    if (chefNum >= data.capacity) return;
                    addChef();
                }}><img src={plusButton} alt="plusButton"
                        style={{width: '1.125rem', height: '1.125rem', flexShrink: 0, display:"block"}}/></div>

            </div>
            <p style={{margin:"1rem"}}>이 주방의 최대 수용 셰프 수는 {data.capacity}명입니다.</p>
            <div style={{display:"flex"}}>
                <button style={{ marginLeft: 'auto', backgroundColor: "#FF4F4F", width: '50%', bottom: '0', height: '3.125rem', color: 'white', border: 'none', lineHeight: '1.875rem', textAlign: 'center' }}
                        onClick={() => navigate(-1)}
                >
                    이전</button>
                <button style={{ marginLeft: 'auto', backgroundColor: "#525252", width: '50%', bottom: '0', height: '3.125rem', color: 'white', border: 'none', lineHeight: '1.875rem', textAlign: 'center' }}
                        onClick={submit}
                >다음</button>
            </div>
            <div style={{zIndex:2}}>
                <Alert content={alertContent} isOpen={isAlertOpen} setIsOpen={setIsAlertOpen} />
            </div>

        </div>
    )
};
export default RentSpacePage2;
