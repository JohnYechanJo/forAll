import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div>
            <h1>HomePage</h1>
            <Link to="/login">시작하기</Link>
        </div>
    )
};

export default Home;