import {Link} from "react-router-dom";
import "../../components/Styles.css";
const HostHomeTemplate = () => {
    return (
        <div>
            <h1>오너 홈페이지</h1>
            <Link to="/hostRegistryStart">
                <button>공간 등록하기</button>
            </Link>
        </div>
    )
};
export default HostHomeTemplate;