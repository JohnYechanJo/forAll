import Header from "../components/Header";
import SearchIdTemplate from "../components/SearchIdTemplate";
import Sidebar from "../components/Sidebar";
const SearchIdPage = () => {
    return (
        <div>
            <Header PageName={"아이디 찾기"}/>
            <SearchIdTemplate />
            <Sidebar />
        </div>
    )
}

export default  SearchIdPage;