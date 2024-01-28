import DropDown from "../../components/DropDown";
import ImageInputs from "../../components/ImageInputs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import Modal from "react-modal";
import { ModalStyles } from "../../components/ModalStyles";

import axios from "axios";
import "../../components/Styles.css";
import ForAllLogo from "../../components/ForAllLogo";
import ImagesViewer from "../../components/ImagesViewer";
const AdminSpaceViewPage4 = () => {
    const location = useLocation();
    const data = { ...location.state };
    const navigate = useNavigate();


    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <ForAllLogo />
            <p style={{ textAlign: 'center', fontSize: '0.9375rem' }}>(2/4) 이용 안내</p>
            <div style={{
                display: "flex",
                flexDirection: "column",
                padding: '1rem',
                gap: "1rem",
                alignItems: "flex-start",
            }}
                 className="fontForRegister">
                <div style={{ width: '100%' }} >
                    <a>주방 정보<span style={{ color: "#FF2929" }} >*</span></a>
                    <hr style={{ height: "2px", backgroundColor: "black", width: '100%' }} />
                </div>
                <div style={{ width: '100%' }}>
                    <a>화구<span style={{ color: "#FF2929" }} >*</span></a>
                    {/*<DropDown dataArr={firePitData} onChange={setFirePit} placeholder={"화구 개수를 선택해주세요"} defaultData={(firePit > 6) ? "직접 입력" : firePit + "개"} val={firePit} width='100%' />*/}
                    {/*{(firePit > 6) ? (*/}
                    {/*    <div>*/}
                    {/*        <span><input onChange={onChangeFirePit} defaultValue={dbData.fireholeNum} style={{ width: "10vw" }} />개 </span>*/}
                    {/*        {exactFirePit < 7 ? <p>7 이상의 숫자만 입력하여주세요. 직접입력의 층수는 '지상'으로 적용됩니다</p> : null}*/}
                    {/*    </div>*/}
                    {/*) : null}*/}
                    <div>{data.fireholeNum}</div>
                </div>
                <div style={{ width: '95%' }}>
                    <a>주방 수용 인원 수<span style={{ color: "#FF2929" }} >*</span></a>
                    <span  style={{ display: 'flex', alignItems: 'center' }}><input defaultValue={data.capacity} disabled style={{ width: '100%' }} className="input" />명</span>
                </div>
                <div style={{ width: '100%' }}>
                    <a>주방기계<span style={{ color: "#FF2929" }} >*</span></a>
                    <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                        <button disabled style={{ borderRadius: '0.3125rem', width: '18%', height: '1.25rem' }} className={data.equip.includes("튀김기") ? "btn_selected" : "btn_not_selected"} >튀김기</button>
                        <button disabled style={{ borderRadius: '0.3125rem', width: '18%', height: '1.25rem' }} className={data.equip.includes("오븐") === true ? "btn_selected" : "btn_not_selected"} >오븐</button>
                        <button disabled style={{ borderRadius: '0.3125rem', width: '18%', height: '1.25rem' }} className={data.equip.includes("식기세척기") ? "btn_selected" : "btn_not_selected"} >식기세척기</button>
                        <button disabled style={{ borderRadius: '0.3125rem', width: '18%', height: '1.25rem' }} className={data.equip.includes("제빙기") ? "btn_selected" : "btn_not_selected"} >제빙기</button>
                        <button disabled style={{ borderRadius: '0.3125rem', width: '18%', height: '1.25rem' }} className={data.equip.includes("냉장고") ? "btn_selected" : "btn_not_selected"} >냉장고</button>
                    </div>
                </div>
                <div style={{ width: '100%' }}>
                    <a>추가 사용 가능 기계<span style={{ color: "#FF2929" }} >*</span></a>
                    <textarea className="input"
                              defaultValue={data.equipExtra} style={{height: '6.25rem' }} />
                </div>
                <div style={{ width: '100%' }} >
                    <a>매장 물품<span style={{ color: "#FF2929" }} >*</span></a>
                    <hr style={{ height: "2px", backgroundColor: "black", width: '100%' }} />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', justifyContent: 'center', width: '100%' }} >
                    <div style={{display:'flex',justifyContent:"right"}}>
                        <div>
                            <p>앞접시*</p>
                            <ImagesViewer vals={data.plateImage} />
                            <input disabled className="input" placeholder={"최대 개수"} style={{ width: '6rem' }} defaultValue={data.plateNum} />
                        </div>
                    </div>
                    <div>
                        <p>물컵*</p>
                        <ImagesViewer vals={data.cupImage} />
                        <input disabled className="input" placeholder={"최대 개수"} style={{ width: '6rem' }} defaultValue={data.cupNum} />
                    </div>

                    <div style={{display:'flex',justifyContent:"right"}}>
                        <div>
                            <p>커트러리*</p>
                            <ImagesViewer vals={data.cutleryImage} />
                            <input disabled className="input" placeholder={"최대 개수"} style={{ width: '6rem' }} defaultValue={data.cutleryNum} />
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ display: 'flex', width: '100%', margin: '0px', marginTop: '4rem' }}>
                <button style={{ marginLeft: 'auto', backgroundColor: "#FF4F4F", width: '50%', bottom: '0', height: '3.125rem', color: 'white', border: 'none', lineHeight: '1.875rem', textAlign: 'center' }}
                        onClick={() => navigate(-1, data)}
                >
                    이전</button>
                <button style={{ marginLeft: 'auto', backgroundColor: "#525252", width: '50%', bottom: '0', height: '3.125rem', color: 'white', border: 'none', lineHeight: '1.875rem', textAlign: 'center' }}
                        onClick={() => navigate("/adminspaceViewPage5",{state:data})}
                >다음</button>
            </div>

        </div>
    )
};
export default AdminSpaceViewPage4;