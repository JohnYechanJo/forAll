import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "../../components/Styles.css";
const RentSpaceInfo1 = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState({});
    console.log(data)
    useEffect(() => {
        axios.get("/api/v1/space/" + params.id)
            .then((res) => {
                setData(res.data)
                console.log(res.data)
            })
            .catch((err) => console.error(err));
    }, []);

    return (
        <div style={{display:'flex',justifyContent:'center',flexDirection:'column',alignItems:'center',height:'100vh'}} >  
            <h2 style={{textAlign:'center'}} > "{data.name}"에 대한 공간 소개</h2>
            <hr style={{width: "90vw", color: "black", border:"1px solid black",backgroundColor:"black" ,height:"0.5px",marginBottom:'0'}}/>
            <div style={{padding:'1rem',display:'flex',textAlign:'left', whiteSpace:'pre-wrap'} }>
                <a className="input fontForRegister" style={{height:'30rem',textAlign:'left',display:'flex',alignItems:'flex-start'}} >{data.spaceIntro}</a>
            </div>
            <button className="bottom_button" style={{backgroundColor:'#FF4F4F',position:'fixed'}} onClick={() => navigate(-1)}>돌아가기</button>
        </div>
    )
};

export default RentSpaceInfo1;