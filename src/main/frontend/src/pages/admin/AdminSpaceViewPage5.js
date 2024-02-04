import { useLocation, useNavigate } from "react-router-dom";
import { useCallback, useState } from "react";
import ImageInput from "../../components/ImageInput";
import ImageInputs from "../../components/ImageInputs";
import Modal from "react-modal";
import ForAllLogo from "../../components/ForAllLogo";
import "../../components/Styles.css";
import { ModalStyles } from "../../components/ModalStyles";
import ImageViewer from "../../components/ImageViewer";
import ImagesViewer from "../../components/ImagesViewer";
const AdminSpaceViewPage5 = () => {
    const location = useLocation();
    const data = { ...location.state };
    const navigate = useNavigate();

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <ForAllLogo />
            <p style={{ textAlign: 'center', fontSize: '0.9375rem' }}>(3/4) 마감 안내</p>
            <div style={{
                display: "flex",
                flexDirection: "column",
                padding: '1rem',
                gap: "1rem",
                alignItems: "flex-start",
            }}
                 className="fontForRegister">
                <div style={{ width: '100%' }} >
                    <a>오너 마감 가이드<span style={{ color: "#FF2929" }} >*</span></a>
                    <hr style={{ width: '100%', backgroundColor: 'black' }} />
                    <div style={{ color: '#7B7B7B',display:'flex',flexDirection:'column' }} >
                        <a>• 오너님의 공간이 보장 받을 수 있도록 <span style={{ fontWeight: '700' }} >'마감 가이드'</span>를 주는 단계입니다.</a>
                        <a>• 마감 후 공간이 어떠한 상태였으면 좋겠는지 <span style={{ fontWeight: '700' }} >'글과 사진으로'</span> 상세하게 기록해 주세요!</a>
                    </div>
                </div>
                <div>
                    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}} >
                        <a>숙지 사항<span style={{ color: "#FF2929" }} >*</span></a>
                        <p style={{color:'#FF2929'}} >(최소 20자)</p>
                    </div>
                    <textarea disabled={true}  className="input" style={{ height: '6.25rem', letterSpacing: '-0.0255rem' }} defaultValue={data.closeGuide} value={data.closeGuide} placeholder={
                        `대관을 진행하는 셰프님들이 마감할 때 꼭 숙지해야 할 점을 기록해 주세요! 
• 홀 마감은 이렇게 해주세요. 
• 주방 마감은 이렇게 해주세요. 
ex. 음식물 쓰레기 처리방법 
ex.분리수거 처리방법
ex.이 물건은 꼭 손대지 말아주세요.
`
                    } />
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', width: '100%', gap: '1rem' }} >
                    <div>
                        <p>사진<span style={{ color: "#FF2929" }} >*</span></p>
                        <ImageViewer val={data.closeImage ? data.closeImage[0] : ""} />
                    </div>
                    <div>
                        <p>추가 사진</p>
                        <ImagesViewer vals={data.closeImage ? data.closeImage.slice(1) : []} />
                    </div>
                </div>
            </div>
            <div style={{ display: 'flex', width: '100%', margin: '0px', marginTop: '4rem', bottom: '0', position: 'fixed' }}>
                <button style={{ marginLeft: 'auto', backgroundColor: "#FF4F4F", width: '50%', bottom: '0', height: '3.125rem', color: 'white', border: 'none', lineHeight: '1.875rem', textAlign: 'center' }}
                        onClick={() => navigate(-1, data)}
                >
                    이전</button>
                <button style={{ marginLeft: 'auto', backgroundColor: "#525252", width: '50%', bottom: '0', height: '3.125rem', color: 'white', border: 'none', lineHeight: '1.875rem', textAlign: 'center' }}
                        onClick={() => navigate("/adminspaceViewPage6",{state:data})}
                >다음</button>
            </div>

        </div>

    )
};
export default AdminSpaceViewPage5;