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
        <div style={{display:'flex',justifyContent:'center',flexDirection:'column',alignItems:'center',gap:'1.5rem',padding:'1rem',boxSizing:'border-box'  }} 
        className="fontForRegister"
        >  
            <a style={{ textAlign:'center' ,fontSize:'0.9375rem',fontWeight:'500'}} >공간 소개</a>
            <hr style={{width: "100%", color: "black", border:"1px solid black",backgroundColor:"black" ,height:"0.5px",marginBottom:'0'}}/>
            <div >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <a>공간명<span style={{ color: '#FF2929' }} >*</span></a>
              </div>
              <input
                type="text"
                defaultValue={data.name}
                className="input"
                maxLength="17"
                disabled
              />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} >
                <a>공간 한 줄 소개<span style={{ color: '#FF2929' }} >*</span></a>
              </div>
              <input
                type="text"
                defaultValue={data.spaceBrief}
                className="input"
                maxLength="17"
                disabled
              />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} >
                <a>공간 소개<span style={{ color: '#FF2929' }} >*</span></a>
              </div>
              <textarea
                type="text"
                defaultValue={data.spaceIntro}
                className="input"
                style={{ height: "6.25rem" }}
                maxLength="299"
                minLength="19"
                disabled
              />
            </div>
            <button className="bottom_button" style={{backgroundColor:'black',position:'fixed'}} onClick={() => navigate(-1)}>돌아가기</button>
        </div>
    )
};

export default RentSpaceInfo1;