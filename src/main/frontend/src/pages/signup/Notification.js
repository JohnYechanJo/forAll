import "../../components/Styles.css";
import {useNavigate} from "react-router-dom";

const Notification = () => {
    const navigate = useNavigate();
    return (
        <div style={{display:"flex",flexDirection:"column",justifyContent:"center",textAlign:"center"}} >
            <div>
                <p>3.안내 사항</p>
            </div>
            <div>
                <p>포 올은 아래의 권한들을 필요로 합니다.</p>
                <p>서비스 사용 시 웹에서 요청 시 허용해주세요.</p>
            </div>
            <a>필수 접근 권한</a>
            <div>
                <p>• SMS</p>
                <p>• 카메라</p>
                <p>• 전화</p>
                <p>• 계약서</p>
            </div>
            <a>선택 접근 권한</a>
            <div>
                <p>• 저장공간</p>
            </div>
            <button className="bottom_button" style={{backgroundColor:"#FF2929",position:"fixed"}} onClick={()=>{navigate("/signUpComplete")}} >가입하기</button>
        </div>
    )
};
export default Notification;
