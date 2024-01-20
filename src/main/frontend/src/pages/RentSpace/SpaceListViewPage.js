import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import ImageViewer from "../../components/ImageViewer";
import Sidebar from "../../components/home/Sidebar";
import HomeTemplate from "../../components/home/HomeTemplate";

const SpaceListViewPage = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get("/api/v1/space/isPublic")
            .then((res) => setData(res.data))
            .catch((err) => console.error(err));
    }, []);

    return (
        <div>
            <div className="header" style={{backgroundColor:"white"}}>
                <button className="button">대관하기</button>
                <button className="button" onClick={()=>navigate("/",{state:{focus:"board"}})}>커뮤니티</button>
            </div>
            <Sidebar/>
            <HomeTemplate />
            <div>
                {data ? data.map((data, idx) =>
                    (<div key={idx}>
                        <ImageViewer val={data.mainImage} />
                        <p>{data.priceSet}원</p>
                        <p>{data.address} | {data.name}</p>
                    </div>)
                ) : null}
            </div>
        </div>

    )

};

export default SpaceListViewPage;