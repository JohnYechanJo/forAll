import {Link, useNavigate} from "react-router-dom";
import {user_role} from "../../utils/enums";

const SignUpPage = () => {
    const navigate = useNavigate();
    const handleUserRole = (role) => {
        navigate('/signUp2',{
            state: {
                role: role
            }
        });
    };
    return (
        <div>
            <Link to={"/login"}>
                <button>{"<"}</button>
            </Link>
            <h1>01. 회원유형선택</h1>
            <h3>포 올의 서비스를 이용하기 위하여</h3>
            <h3>아래의 가입유형을 선택해주세요</h3>

            <button
                onClick={()=>handleUserRole(user_role["GUEST"])}
            >게스트</button>
            <p>주방을 포함한 공간 대관을 원하는 회원</p>
            <button
                onClick={() => handleUserRole(user_role["HOST"])}
            >호스트</button>
            <p>공간을 등록하여 부가수익을 얻기 위하는 회원</p>
        </div>
    )
};

export default SignUpPage;