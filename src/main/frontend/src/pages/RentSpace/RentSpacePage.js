import {useState, useCallback, useEffect} from "react";
import {useNavigate, useParams} from 'react-router-dom';
import axios from "axios";
import ImageSlider from "../../components/ImageSlider";

import {ChatRoomCategory, KitchenFeat} from "../../utils/enums";

import useDidMountEffect from "../../utils/hooks/useDidMountEffect";
import {AddressUtil} from "../../utils/AddressUtil";
const RentSpacePage = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState({});
    const [images1, setImages1] = useState([]);
    const [images2, setImages2] = useState([]);
    const [equipments, setEquipments] = useState([]);
    useEffect(() => {
        axios.get("/api/v1/space/"+params.id)
            .then((res) => {
                setData(res.data);

                // console.log(res.data);

            })
            .catch((err) => console.error(err));
    }, []);
    useDidMountEffect(() => {
        setImages1([data.mainImage, ...data.hallImage]);
        setEquipments(data.equip ? data.equip.split(",") : []);
    }, [data]);


    const submit = () => {
        // Todo 셰프 등록이 되었는지 확인
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

    return(
        <div>
            <div>
                <ImageSlider images={images1}/>
            </div>
            <div>
                <h1>{AddressUtil.extraction(data.address)} | {data.name}</h1>
                <p>{data.priceSet}원 | {data.ableDate}</p>
                {/*Todo : 관리자 채팅 연결*/}
                <p>*영업일 대관 시 800,000원 | 별도 문의 바람</p>

                <p onClick={()=>navigate("/profile/"+data.userId)}>프로필 보기</p>
                <p onClick={()=> {
                    if (!sessionStorage.getItem("user_id")) return;
                    navigate("/chatRoom", {
                        state: {
                            partner: data.userId,
                            category: ChatRoomCategory.Reservation
                        }
                    })
                }}>채팅 보내기</p>

            </div>
            <div>
                <h1>공간 소개</h1>
                <p>{data.spaceBrief}</p>
                <p onClick={() => navigate("/rentSpaceInfo1/"+params.id)}>더 보기</p>
            </div>
            <div>
                <h1>공간 정보</h1>
                <p>주소(위치)</p>
                <input
                    value={data.address}
                    disabled={true}
                />
                <input
                    value={data.addressBrief}
                    disabled={true}
                />
                <p onClick={() => navigate("/rentSpaceInfo2/"+params.id)}>더 보기</p>
            </div>
            <div>
                <h1>주방정보</h1>
                <p>주방 특성</p>
                <div style={{display: "flex"}}>
                    <button className="button"
                            name="kitchen"
                            disabled={true}
                            style={{
                                backgroundColor: data.kitchenFeat === KitchenFeat.Open ? "black" : "white",
                                color: data.kitchenFeat === KitchenFeat.Open ? "white" : "black",
                                width: "100px",
                                flex: "1",
                                marginLeft: "10px"
                            }}
                    >
                        오픈형
                    </button>
                    <button className="button"
                            name="kitchen"
                            disabled={true}
                            style={{
                                backgroundColor: data.kitchenFeat === KitchenFeat.Face ? "black" : "white",
                                color: data.kitchenFeat === KitchenFeat.Face ? "white" : "black",
                                width: "100px",
                                flex: "1",
                                marginLeft: "10px"
                            }}
                    >
                        대면형
                    </button>
                    <button className="button"
                            name="kitchen"
                            disabled={true}
                            style={{
                                backgroundColor: data.kitchenFeat === KitchenFeat.Close ? "black" : "white",
                                color: data.kitchenFeat === KitchenFeat.Close ? "white" : "black",
                                width: "100px",
                                flex: "1",
                                marginLeft: "10px"
                            }}
                    >
                        폐쇄형
                    </button>
                </div>
                <p>오픈형이 무엇인가요?</p>
                <p>대면형이 무엇인가요?</p>
                <p>폐쇠형이 무엇인가요?</p>
                <div>
                    <p>화구</p>
                    <input
                        value={data.fireholeNum}
                        disabled={true}
                    />
                </div>
                <div>
                    <h4>확보된 주방기계</h4>
                    <div style={{display:"flex", flexDirection:"row",justifyContent:"space-evenly"}}>
                        <div className={equipments.includes("튀김기") === true ? "btn_selected" : ""}>튀김기</div>
                        <div className={equipments.includes("오븐") === true ? "btn_selected" : ""}>오븐</div>
                        <div className={equipments.includes("식기세척기") === true ? "btn_selected" : ""}>식기세척기</div>
                        <div className={equipments.includes("제빙기") === true ? "btn_selected" : ""}>제빙기</div>
                    </div>
                </div>
                <div>
                    <h4>추가 사용 가능 기계</h4>
                    <div
                        style={{
                            border: "2px solid gray",
                            borderRadius: "2px",
                            width: "100%",
                            height: "10vh",
                        }}
                    >
                        {data.equipExtra}
                    </div>
                </div>
                <p onClick={() => navigate("/rentSpaceInfo3/"+params.id)}>더 보기</p>
                <div>
                    <div>고객센터</div>
                    <button>찜하기</button>

                    <button onClick={submit}>예약하기</button>

                </div>

            </div>

        </div>
    )
};

export default RentSpacePage;
