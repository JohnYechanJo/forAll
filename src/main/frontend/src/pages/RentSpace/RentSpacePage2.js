import {useLocation, useNavigate} from "react-router-dom";
import ImageViewer from "../../components/ImageViewer";
import Calendar from "../../components/Calender";
import {useCallback, useEffect, useState} from "react";
import Alert from "../../components/Alert";

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
    useEffect(() => {
        console.log(rentDay);
    }, [rentDay]);
    return (
        <div>
            <div>
                <button onClick={()=>navigate(-1)}>{"<"}</button>
                <h1>날짜 및 시간</h1>
            </div>
            <div>
                <ImageViewer val={data.spaceImage}/>
                <p>{data.spaceAddress} | {data.spaceName}</p>
            </div>
            <div>
                <h1>날짜</h1>
                <p>대관 희망 날짜</p>
                <Calendar setDate={setRentDay}/>
                <p>트라이얼 희망 날짜</p>
                {data.ableTrial ? ( <Calendar setDate={setTrialDay}/>) : (<p>오너가 트라이얼이 불가하다고 지정한 매장입니다.</p>)}
                <p>셰프 수</p>
                <div>
                    <button onClick={substractChef} disabled={chefNum <= 1}>{"-"}</button>
                    <p>{chefNum}</p>
                    <button onClick={addChef} disabled={chefNum >= data.capacity}>{"+"}</button>
                    <p>이 주방의 최대 수용 셰프 수는 {data.capacity}명입니다.</p>
                </div>
            </div>
            <div>
                <button onClick={()=>navigate(-1)}>이전</button>
                <button onClick={submit}>다음</button>
            </div>
            <Alert content={alertContent} isOpen={isAlertOpen} setIsOpen={setIsAlertOpen} />
        </div>
    )
};
export default RentSpacePage2;
