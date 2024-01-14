import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

const RentSpaceInfo2 = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState({});
    useEffect(() => {
        axios.get("/api/v1/space/"+params.id)
            .then((res) => setData(res.data))
            .catch((err) => console.error(err));
    }, []);

    return (<div>
        <h1>공간정보</h1>
        <div>
            <p>공간정보 내용들</p>
        </div>
        <button onClick={() => navigate(-1)}>돌아가기</button>
    </div>)
};

export default RentSpaceInfo2;