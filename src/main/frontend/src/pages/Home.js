import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div>
            <img src={process.env.PUBLIC_URL + '/forAllLogo.png'} width = '400px'/>
            <Link to="/main">시작하기</Link>
        </div>
    )
};

export default Home;