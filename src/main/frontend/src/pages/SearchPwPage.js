import Header from "../components/Header";
import SearchPwTemplate from "../components/SearchPwTemplate";
import Sidebar from "../components/Sidebar";

const SearchPwPage = () => {
    return (
        <div>
            <Header PageName={"비밀번호 찾기"}/>
            <SearchPwTemplate />
            <Sidebar />
        </div>
    )
}

export default  SearchPwPage;