import {useState, useCallback, useEffect} from "react";
import {useNavigate, useParams} from 'react-router-dom';
import axios from "axios";
import ImageSlider from "../../components/ImageSlider";
import {KitchenFeat} from "../../utils/enums";
import useDidMountEffect from "../../utils/hooks/useDidMountEffect";
const RentSpacePage = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState({});
    const [images1, setImages1] = useState([]);
    const [images2, setImages2] = useState([]);
    console.log(data)
    useEffect(() => {
        axios.get("/api/v1/space/"+params.id)
            .then((res) => setData(res.data))
            .catch((err) => console.error(err));
    }, []);
    useDidMountEffect(() => {
        setImages1([data.mainImage,data.hallRight, data.hallLeft, data.hallFront, data.hallBack, data.hallEntire, ...data.hallExtra]);
        setImages2([data.kitRight, data.kitLeft, data.kitFront, data.kitBack, data.kitEntire, ...data.kitExtra, ...data.menu, ...data.plateImage, ...data.cupImage, ...data.cutleryImage, ...data.vatImage]);
    }, [data]);
    return(
        <div>
            <div>
                <ImageSlider images={images1}/>
            </div>
            <div>
                <h1>{data.address} | {data.name}</h1>
                <p>{data.priceSet}원 | {data.ableDate}</p>
                {/*Todo : 관리자 채팅 연결*/}
                <p>*영업일 대관 시 800,000원 | 별도 문의 바람</p>
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
                    <p>상세사진</p>
                    <ImageSlider images={images2}/>
                    <p onClick={() => navigate("/rentSpaceInfo3/"+params.id)}>더 보기</p>
                </div>
                <div>
                    <div>고객센터</div>
                    <button>찜하기</button>
                    <button>예약하기</button>
                </div>

            </div>

        </div>
    )
};

export default RentSpacePage;
