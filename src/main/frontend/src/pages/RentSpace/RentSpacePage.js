import React, { useState, useCallback, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import ImageSlider from "../../components/ImageSlider";
import {ChatRoomCategory, ChefState, KitchenFeat} from "../../utils/enums";
import useDidMountEffect from "../../utils/hooks/useDidMountEffect";
import { AddressUtil } from "../../utils/AddressUtil";
import "../../style/RentSpace.css";
import arrowright from "../../components/icons/arrowright.png";
import hearImg from "../../components/icons/heart.png";
const RentSpacePage = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState({});
    const [images1, setImages1] = useState([]);
    const [equipments, setEquipments] = useState([]);
    const [needChef, setNeedChef] = useState(false);
    useEffect(() => {
        axios.get("/api/v1/space/" + params.id)
            .then((res) => {
                setData(res.data);
            })
            .catch((err) => console.error(err));
    }, []);
    useDidMountEffect(() => {
        setImages1([data.mainImage, ...data.hallImage]);
        setEquipments(data.equip ? data.equip.split(",") : []);
    }, [data]);

    const submit = () => {
        const userId = sessionStorage.getItem("user_id");
        if (!userId) return; // 로그인 안되었으면, 버튼 실행 x
        axios.get("/api/v1/members/public/"+userId)
            .then((res) => {
                if (res.data.chefPending === ChefState.NOTCREATED){
                    setNeedChef(true);
                }else{
                    // Todo 승인 나기 전 과정이 없음
                    navigate("/rentSpace2", {state:{
                            spaceId: data.id,
                            spaceName: data.name,
                            spaceAddress: data.address,
                            spaceImage: data.mainImage,
                            ableTrial: data.ableTrial,
                            ableStartHour: data.ableStartHour,
                            ableFinHour: data.ableFinHour,
                            priceSet: data.priceSet,
                            capacity: data.capacity,
                        }});
                }
            })

    }


    return (
        <div className={"rent_space_container"}>
            <div>
                <ImageSlider images={images1} />
            </div>
            <div style={{ marginBottom: "2rem" }}>
                <div className={"space_title"} style={{ paddingLeft: "1rem" }}>{AddressUtil.extraction(data.address)} | {data.name}</div>
                <p style={{ margin: "1rem" }}>{data.priceSet}원 | {data.ableDate}</p>
                {/*Todo : 관리자 채팅 연결*/}
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <p style={{ marginLeft: "1rem" }}>*영업일 대관 시 800,000원 | 별도 문의 바람</p>
                    <div style={{ textAlign: "right", display: "flex" }}>
                        <p className={"underline"} onClick={() => navigate("/profile/" + data.userId)}>프로필 보기</p>
                        <p onClick={() => {
                            if (!sessionStorage.getItem("user_id")) return;
                            navigate("/chatRoom", {
                                state: {
                                    partner: data.userId,
                                    category: ChatRoomCategory.Reservation
                                }
                            })
                        }} style={{ padding: "0 0.5rem 0 0.5rem", textDecorationLine: "underline" }}>채팅 보내기</p>
                    </div>
                </div>
            </div>
            <div>
                <p style={{ fontSize: "1rem", margin: "1rem 0 1rem 0" }}>• 공간 소개</p>
                <div>
                    <p style={{ paddingLeft: "1rem" }}>공간명<span style={{ color: "red" }}>*</span></p>
                    <div className={"data_input"}><p style={{ paddingLeft: "0.6rem" }}>{data.name}</p></div>
                </div>
                <div style={{ marginTop: "1rem" }}></div>
                <div>
                    <p style={{ paddingLeft: "1rem" }}>공간 한 줄 소개<span style={{ color: "red" }}>*</span></p>
                    <div className={"data_input"}><p style={{ paddingLeft: "0.6rem" }}>{data.spaceBrief}</p></div>
                </div>
                <div style={{ marginTop: "1rem" }}></div>
                <p className={"more_info"} onClick={() => navigate("/rentSpaceInfo1/" + params.id)} style={{ paddingLeft: "1rem" }}>더 보기</p>
            </div>
            <div>
                <p style={{ fontSize: "1rem", margin: "1rem 0 1rem 0" }}>• 공간 정보</p>
                <div>
                    <p style={{ paddingLeft: "1rem" }}>주소(위치)<span style={{ color: "red" }}>*</span></p>
                    <div className={"data_input"}><p style={{ paddingLeft: "0.6rem" }}>{data.address}</p></div>
                    <div style={{ marginTop: "0.5rem" }}></div>
                    <div className={"data_input"}><p style={{ paddingLeft: "0.6rem" }}>{data.addressBrief}</p></div>
                </div>
                <p onClick={() => navigate("/rentSpaceInfo2/" + params.id)} className={"more_info"} style={{ paddingLeft: "1rem" }}>더 보기</p>
            </div>
            <div>
                <p style={{ fontSize: "1rem", margin: "1rem 0 1rem 0" }}>• 주방 정보</p>
                <p style={{ paddingLeft: "1rem" }}>주방 특성<span style={{ color: "red" }}>*</span></p>
                <div style={{paddingLeft:'1rem',paddingRight:'1rem'}} >
                    <div style={{ display: "flex", justifyContent: 'flex-start', width: '100%' }}>
                        <button className="square_button"
                            name="kitchen"
                            disabled={true}
                            style={{
                                backgroundColor: data.kitchenFeat === KitchenFeat.Open ? "black" : "white",
                                color: data.kitchenFeat === KitchenFeat.Open ? "white" : "black",
                                width: "100px",
                                flex: "1",

                            }}
                        >
                            오픈형
                        </button>
                        <button className="square_button"
                            name="kitchen"
                            disabled={true}
                            style={{
                                backgroundColor: data.kitchenFeat === KitchenFeat.Face ? "black" : "white",
                                color: data.kitchenFeat === KitchenFeat.Face ? "white" : "black",
                                width: "100px",
                                flex: "1",

                            }}
                        >
                            대면형
                        </button>
                        <button className="square_button"
                            name="kitchen"
                            disabled={true}
                            style={{
                                backgroundColor: data.kitchenFeat === KitchenFeat.Close ? "black" : "white",
                                color: data.kitchenFeat === KitchenFeat.Close ? "white" : "black",
                                width: "100px",
                                flex: "1",

                            }}
                        >
                            폐쇄형
                        </button>
                    </div>
                </div>
                <div style={{ display: "flex", marginBottom: "1rem" }}>
                    <p style={{
                        width: "100px",
                        flex: "1",
                        marginLeft: "10px"
                    }}>오픈형이 무엇인가요?</p>
                    <p style={{
                        width: "100px",
                        flex: "1",
                        marginLeft: "10px"
                    }}>대면형이 무엇인가요?</p>
                    <p style={{
                        width: "100px",
                        flex: "1",
                        marginLeft: "10px"
                    }}>폐쇄형이 무엇인가요?</p>
                </div>
                <div style={{ marginBottom: "1rem" }}>
                    <p style={{ paddingLeft: "1rem" }}>화구<span style={{ color: "red" }}>*</span></p>
                    <div className={"data_input"}><p style={{ paddingLeft: "0.6rem" }}>{data.fireholeNum + "구"}</p></div>
                </div>
                <div>
                    <p style={{ paddingLeft: "1rem" }}>확보된 주방기계<span style={{ color: "red" }}>*</span></p>
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly", marginTop: "1rem" }}>
                        <div className={equipments.includes("튀김기") === true ? "btn_selected" : "btn_not_selected"}>튀김기</div>
                        <div className={equipments.includes("오븐") === true ? "btn_selected" : "btn_not_selected"}>오븐</div>
                        <div className={equipments.includes("식기세척기") === true ? "btn_selected" : "btn_not_selected"}>식기세척기</div>
                        <div className={equipments.includes("제빙기") === true ? "btn_selected" : "btn_not_selected"}>제빙기</div>
                    </div>
                </div>
                <div style={{ marginTop: "1rem" }}>
                    <p style={{ paddingLeft: "1rem" }}>추가 사용 가능 기계<span style={{ color: "red" }}>*</span></p>
                    <div
                        style={{
                            border: "2px solid gray",
                            borderRadius: "2px",
                            width: "21.875rem",
                            height: "10vh",
                            margin: "0 1rem 0 1rem",
                            fontSize: "0.625rem",
                            padding: "0.5rem 0 0 0.5rem"
                        }}
                    >
                        {data.equipExtra}
                    </div>
                </div>
                <p onClick={() => navigate("/rentSpaceInfo3/" + params.id)} className={"more_info"} style={{ paddingLeft: "1rem" }}>더 보기</p>
                <div>
                    <div style={{ display: "flex", margin: "1rem", justifyContent: "space-between" }}>
                        <p style={{ fontSize: "1rem" }}>고객센터</p>
                        <div style={{ textAlign: 'right' }}>
                            <img src={arrowright} alt="arrowright"
                                style={{ width: '0.7rem', height: '1.1rem', flexShrink: 0 }} />
                        </div>
                    </div>
                    <div style={{ display: "flex", margin: "1rem", justifyContent: "space-between" }}>
                        <div>
                            <img src={hearImg} alt="heartImg"
                                style={{ width: '1.9rem', height: '1.9rem', flexShrink: 0 }} />
                        </div>
                        <div className={"submit_button"} style={{ textAlign: "right" }} onClick={submit}>
                            <p>예약하기</p>
                        </div>
                    </div>


                </div>

            </div>

            {needChef ?(
                <div className={"overlay_container"}>
                    <div style={{height:"70%", display:"flex", alignItems:"center", padding:"1rem"}}>
                        <div style={{margin: "1rem", paddingRight:"2rem"}}>
                            <p style={{fontSize:"1.25rem", fontWeight:"700"}}>{sessionStorage.getItem("name")+"님, 대관을 위해서 셰프 등록을 먼저 부탁드립니다!"}</p>
                            <p style={{fontSize:"0.95rem", paddingTop:"1rem"}}>셰프 등록을하신 후, 포 올을 통해 세상에 놀라운 경험을 선사해주세요.</p>
                        </div>

                    </div>
                    <div className={"submit_button"} onClick={()=>navigate("/chefRegistry")}>셰프 등록하기</div>
                </div>
            ) : null}

        </div>
    )
};

export default RentSpacePage;
