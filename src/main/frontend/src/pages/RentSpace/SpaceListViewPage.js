import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import ImageViewer from "../../components/ImageViewer";
import Sidebar from "../../components/home/Sidebar";
import HomeTemplate from "../../components/home/HomeTemplate";
import {AddressUtil} from "../../utils/AddressUtil";
import pointer from "../../components/icons/pointer.png";

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
                    (<div key={idx} style={{width:"100%"}} onClick={()=>navigate("/rentSpace/"+data.id)}>
                        <ImageViewer val={data.mainImage} isfixed />
                        <div style={{paddingLeft:"1rem"}}>
                            <p style={{margin:0,fontSize:"1rem",fontWeight:"500"}}>{data.priceSet}원</p>
                            <div style={{display:"flex"}}>
                                <div style={{display:"flex", alignItems:"center"}}>
                                    <img src={pointer} alt="pointer" style={{ width: "0.7rem", height: "1rem", flexShrink: "0", marginRight:"0.3rem" }} />
                                </div>

                                <p style={{margin:0,fontSize:"1rem",fontWeight:"500"}}>{AddressUtil.extraction(data.address)} | {data.name}</p>
                            </div>
                        </div>

                    </div>)
                ) : null}
            </div>
        </div>

    )

};

export default SpaceListViewPage;