import Header from "../components/Header";
import {Link, useLocation} from "react-router-dom";
import {user_role} from "../utils/enums";

const SignUpCompletePage = () => {
    const location = useLocation();
    const data = {...location.state};
    return (
        <div>
            <Header PageName={"04. 가입 완료"} />
            <h1>축하드립니다!</h1>
            <h1>포올의 모든 서비스를 이용하실 수 있습니다.</h1>

            <h1>{data.name}님 환영합니다!</h1>
            <h1>{data.role == user_role["GUEST"] ? "지금 바로 공간을 찾아보세요!":"지금 바로 공간을 등록 해보세요!"}</h1>

            <h1>아이디 {data.id}</h1>
            <h1>이메일 {data.email}</h1>
            {/*시작하기 하면 로그인화면으로 갈지, 바로 로그인 할지*/}
            <Link to={"/main"}>
                <button>시작하기</button>
            </Link>

        </div>
    )
};

export default SignUpCompletePage;