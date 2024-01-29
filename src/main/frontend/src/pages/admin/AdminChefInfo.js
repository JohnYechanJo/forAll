import ImageViewer from "../../components/ImageViewer";

import { useState, useCallback } from "react";
import "../../components/Styles.css";
import {useLocation, useNavigate} from "react-router-dom";
import Modal from "react-modal";
import { ModalStyles } from "../../components/ModalStyles";
import ImageInput from "../../components/ImageInput";
import axios from "axios";
import ImageUploader from "../../utils/imageUploader";
import DropDown from "../../components/DropDown";
const AdminChefInfo = () => {
    const location = useLocation();
    const data = {...location.state};
    const navigate = useNavigate();

    return(
        <div
            style={{paddingLeft: '2%', paddingRight: '2%', display:"flex",
                justifyContent:"space-around", alignContent: 'center', textAlign: 'left',
                flexDirection:"column",}}>
            <header style={{textAlign: "center"}}><h3>셰프 정보</h3></header>
            <h4 style={{marginBottom:"0"}} >경력</h4>
            <hr style={{paddingLeft: '2%', paddingRight: '2%', width: '96%', backgroundColor: 'black'}}/>
            <h4>최근 경력을 최소 1개 입력해주세요.</h4>
            <input
                disabled={true}
                type="text" placeholder="안심하세요! 언제든지 프로필을 수정할 수 있어요."
                   style={{width: "98%", height: "3vh"}}
                   />
            {data.career ? data.career.map((item, index) => (
                <div style={{ position: 'relative', display: 'inline-block' }}>
                    <div key={index}
                         style={{
                             display: 'flex',
                             justifyContent: 'center',
                             alignItems: 'center',
                             height: "3vh",
                             width: '96%',
                             border: '2px solid lightgray',
                             backgroundColor: 'white',
                             borderRadius: '7px',
                             marginTop: '5px',
                             cursor: 'pointer'
                         }}
                    >
                        {item}
                    </div>
                </div>
            )):null}
            <div>
                <h4 style={{marginBottom:"0"}} >보건증 사진</h4>
                <p>
                    <ImageViewer val={data.certificatePhoto}/>
                </p>
                <div style={{margin:"0", padding:"0px 0px"}} >
                    <h5 style={{margin:"0", padding:"0px 0px"}}>• 최근 1년내의 보건증을 등록해주세요.</h5>
                    <h5 style={{margin:"0", padding:"0px 0px"}}>• 대관에 필요한 정보이오니, <span style={{color:"red",textDecoration:"underline",textDecorationColor:"red"}} >필히 등록해주세요!</span></h5>
                </div>
            </div>
            <br/>
            <div style={{ display: "flex", flexDirection: "column", paddingLeft: '2%', paddingRight: '2%', alignItems: "flex-start", gap: "1%" }} className="fontForRegister">
                <div style={{width:"100%"}} >
                    <a className="fontForRegister" >계좌 정보를 입력해 주세요.<span className="fontForRegister" style={{ color: "#FF2929" }} >*</span></a>
                    <hr style={{width: '100%', backgroundColor: 'black'}}/>
                </div>
                <a>• 법인 사업자는 법인 통장계좌를, 개인 사업자는 사업자 명의의 통장 계좌를 입력해주세요. 포 올을 통해 결제된 금액이 해당 계좌로 정산됩니다.</a>
                <div style={{display: "flex", justifyContent: "left"}} >
                    <div style={{display: 'flex', marginTop: '1.5rem'}}>
                        <div>
                            <a>은행명<span style={{color: "#FF2929"}}>*</span></a>
                            <div>{data.accountBank}</div>
                        </div>
                        <div style={{display: 'flex', flexDirection: 'column', marginLeft: '1rem'}}>
                            <a>계좌번호<span style={{color: "#FF2929"}}>*</span></a>
                            <input disabled={true}
                                className="input" style={{width: '100%'}}
                            defaultValue={data.accountNum}/>
                        </div>
                        <div style={{display: 'flex', flexDirection: 'column', marginLeft: '1rem'}}>
                            <a>예금주<span style={{color: "#FF2929"}}>*</span></a>
                            <input disabled={true} defaultValue={data.accountHolder}
                                className="input" style={{width: '100%'}}/>
                        </div>
                    </div>
                </div>
                <div style={{gap: "0px"}}>
                    <p>• 정확한 정보를 입력했는지 다시 한 번 확인해주세요.</p>
                </div>
            </div>

            <button onClick={()=>navigate("/admin")} className="bottom_button"
                    style={{backgroundColor: "#FF4F4F", position: "fixed"}}>돌아가기
            </button>
        </div>
    );
}
export default AdminChefInfo;