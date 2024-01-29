import React, { useState, useCallback, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import ImageSlider from "../../components/ImageSlider";
import { ChatRoomCategory, ChefState, KitchenFeat } from "../../utils/enums";
import useDidMountEffect from "../../utils/hooks/useDidMountEffect";
import { AddressUtil } from "../../utils/AddressUtil";
import "../../style/RentSpace.css";
import arrowright from "../../components/icons/arrowright.png";
import hearImg from "../../components/icons/heart.png";
import Modal from "react-modal";
import { ExplanationModalStyles } from "../../components/ExplanationModalStyles";
import ImageViewer from "../../components/ImageViewer";
const RentSpacePage = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState({});
    const [images1, setImages1] = useState([]);
    const [equipments, setEquipments] = useState([]);
    const [needChef, setNeedChef] = useState(false);
    const [modalIsOpen1, setModalIsOpen1] = useState(false);
    const [modalIsOpen2, setModalIsOpen2] = useState(false);
    const [modalIsOpen3, setModalIsOpen3] = useState(false);

    useEffect(() => {
        axios.get("/api/v1/space/" + params.id)
            .then((res) => {
                setData(res.data);
            })
            .catch((err) => console.error(err));
    }, []);
    useDidMountEffect(() => {
        setImages1(data.hallImage? [data.mainImage, ...data.hallImage] : [data.mainImage]);
        setEquipments(data.equip ? data.equip.split(",") : []);
    }, [data]);

    const submit = () => {
        const userId = sessionStorage.getItem("user_id");
        if (!userId) return; // 로그인 안되었으면, 버튼 실행 x
        axios.get("/api/v1/members/public/" + userId)
            .then((res) => {
                if (res.data.chefPending === ChefState.NOTCREATED) {
                    setNeedChef(true);
                } else {
                    navigate("/rentSpace2", {
                        state: {
                            spaceId: data.id,
                            spaceName: data.name,
                            spaceAddress: data.address,
                            spaceImage: data.mainImage,
                            ableTrial: data.ableTrial,
                            ableStartHour: data.ableStartHour,
                            ableFinHour: data.ableFinHour,
                            priceSet: data.priceSet,
                            capacity: data.capacity,
                        }
                    });
                }
            })

    }


    return (
        <div className={"rent_space_container"}>
            <div style={{
                width: "100%",
                fontSize: "1.875rem",
                fontWeight: "700",
                marginTop: "3.125rem",
                boxShadow: '-4px 4px 4px 0px rgba(0, 0, 0, 0.0) inset, 4px -4px 4px 0px rgba(0, 0, 0, 0.0) inset',

                display: "flex",
                flexDirection: "column"
            }}>
                <p>
                    <ImageViewer style={{ height: "15rem", width: "100%"}} val={data.mainImage}/>
                </p>
            </div>
            <div>
                <ImageSlider images={images1}/>
            </div>
            <div style={{marginBottom: "2rem"}}>
                <div className={"space_title"}
                     style={{paddingLeft: "1rem"}}>{AddressUtil.extraction(data.address)} | {data.name}</div>
                <p style={{margin: "1rem"}}>{data.priceSet}원 | {data.ableDate}</p>
                {/*Todo : 관리자 채팅 연결*/}
                <div style={{display: "flex", justifyContent: "space-between"}}>
                    <p style={{marginLeft: "1rem"}}>*영업일 대관 시 800,000원 | 별도 문의 바람</p>
                    <div style={{textAlign: "right", display: "flex"}}>
                        <p className={"underline"} onClick={() => navigate("/profile/" + data.userId)}>프로필 보기</p>
                        <p onClick={() => {
                            if (!sessionStorage.getItem("user_id")) return;
                            navigate("/chatRoom", {
                                state: {
                                    partner: data.userId,
                                    category: ChatRoomCategory.Reservation
                                }
                            })
                        }} style={{marginRight: '2rem', padding: "0 0.5rem 0 0.5rem", textDecorationLine: "underline"}}>채팅 보내기</p>
                    </div>
                </div>
            </div>
            <div>
                <p style={{fontSize: "1rem", margin: "1rem 0 1rem 0"}}>&ensp;• 공간 소개</p>

            </div>
                <div>
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <div>
                            <p style={{paddingLeft: "1rem"}}>공간명<span style={{color: "red"}}>*</span></p>
                            <div className={"data_input"}><p style={{paddingLeft: "0.6rem"}}>{data.name}</p></div>
                        </div>
                </div>
                <div style={{marginTop: "1rem"}}></div>
                <div style={{width: "100%"}}>
                    <p style={{paddingLeft: "1rem"}}>공간 한 줄 소개<span style={{color: "red"}}>*</span></p>
                    <div className={"data_input"}><p style={{width: "100%", paddingLeft: "0.6rem"}}>{data.spaceBrief}</p></div>
                </div>


                <p className={"more_info"} onClick={() => navigate("/rentSpaceInfo1/" + params.id)}
                   style={{paddingLeft: "1rem"}}>더 보기</p>
            </div>
            <div>
                <p style={{fontSize: "1rem", margin: "1rem 0 1rem 0"}}>&ensp;• 공간 정보</p>
                <div>
                    <p style={{paddingLeft: "1rem"}}>주소(위치)<span style={{color: "red"}}>*</span></p>
                    <div className={"data_input"}><p style={{paddingLeft: "0.6rem"}}>{data.address}</p></div>
                    <div style={{marginTop: "0.5rem"}}></div>
                    <div className={"data_input"}><p style={{paddingLeft: "0.6rem"}}>{data.addressBrief}</p></div>
                </div>
                <p onClick={() => navigate("/rentSpaceInfo2/" + params.id)} className={"more_info"}
                   style={{paddingLeft: "1rem"}}>더 보기</p>
            </div>
            <div>
                <p style={{fontSize: "1rem", margin: "1rem 0 1rem 0"}}>• 주방 정보</p>
                <p style={{paddingLeft: "1rem"}}>주방 특성<span style={{color: "red"}}>*</span></p>

                <div style={{display: "flex", flexDirection: "row", justifyContent: "space-evenly"}}>

                    <div style={{flexDirection: "column", display: "flex"}}>
                        <div>
                            <button className="square_button"
                                    name="kitchen"
                                    value={KitchenFeat.Open}
                                    style={{
                                        backgroundColor: data.kitchenFeat === KitchenFeat.Open ? "black" : "white",
                                        color: data.kitchenFeat === KitchenFeat.Open ? "white" : "black",
                                    }}

                            >
                                오픈형
                            </button>
                        </div>
                        <div>
                            <Modal isOpen={modalIsOpen1} style={ExplanationModalStyles}>
                                <div style={{
                                    fontFamily: "Noto Sans KR",
                                    color: " #000",
                                    fontSize: "0.625rem",
                                    fontStyle: "normal",
                                    fontWeight: "400",
                                    lineHeight: "normal"
                                }}>
                                    <br/>
                                    <div style={{display: "flex", justifyContent: "space-between"}}>
                                        <a style={{textAlign: "left"}}>오픈형 주방이란?</a><a
                                        style={{textAlign: "right"}}
                                        onClick={() => setModalIsOpen1(false)}>x</a>
                                    </div>
                                    <hr style={{height: "1px", backgroundColor: "black"}}/>
                                    <p style={{
                                        textAlign: 'left',
                                        paddingLeft: "5%",
                                        paddingRight: "5%"
                                    }}>•&ensp;주방, 홀이 하나로 결합된 형태입니다.</p>
                                    <p style={{
                                        textAlign: 'left',
                                        paddingLeft: "5%",
                                        paddingRight: "5%"
                                    }}>•&ensp;주방과 홀이 결합되면서 음식을 만드는 사람과 가까이할 수 있어
                                        대면형보다 더 긴밀한 커뮤니케이션이 가능하며, 요리를 하는 동시에 식사가 가능한 형태를 띕니다.
                                    </p>
                                </div>
                                <div class="bottom_button_fixed">
                                    <a onClick={() => setModalIsOpen1(false)}>닫기</a>
                                </div>

                            </Modal>
                            <button onClick={() => setModalIsOpen1(true)}
                                    style={{border: "none", backgroundColor: "white", fontSize: "10px"}}>• 오픈형이
                                무엇인가요?
                            </button>
                        </div>
                    </div>
                    <div style={{flexDirection: "column"}}>
                        <div>
                            <button className="square_button"
                                    name="kitchen"
                                    value={KitchenFeat.Face}
                                    style={{
                                        backgroundColor: data.kitchenFeat === KitchenFeat.Face ? "black" : "white",
                                        color: data.kitchenFeat === KitchenFeat.Face ? "white" : "black",

                                    }}

                            >
                                대면형
                            </button>
                        </div>
                        <div>
                            <Modal
                                isOpen={modalIsOpen2}
                                style={ExplanationModalStyles}>

                                <div style={{
                                    fontFamily: "Noto Sans KR",
                                    color: " #000",
                                    fontSize: "0.625rem",
                                    fontStyle: "normal",
                                    fontWeight: "400",
                                    lineHeight: "normal"
                                }}>
                                    <br/>
                                    <div style={{display: "flex", justifyContent: "space-between"}}>
                                        <a style={{textAlign: "left"}}>대면형 주방이란?</a><a
                                        style={{textAlign: "right"}}
                                        onClick={() => setModalIsOpen2(false)}>x</a>
                                    </div>
                                    <hr style={{height: "1px", backgroundColor: "black"}}/>
                                    <p style={{
                                        textAlign: 'left',
                                        paddingLeft: "5%",
                                        paddingRight: "5%"
                                    }}>•&ensp;부엌과 다이닝룸이 한 공간에 자리하는 형태입니다.</p>
                                    <p style={{
                                        textAlign: 'left',
                                        paddingLeft: "5%",
                                        paddingRight: "5%"
                                    }}>•&ensp;식탁이 따로 놓여 있지만, 음식을 만드는 사람의 얼굴을 보며
                                        대화를 나눌 수 있는 구조입니다.</p>
                                </div>
                                <div class="bottom_button_fixed">
                                    <a onClick={() => setModalIsOpen2(false)}>닫기</a>
                                </div>
                            </Modal>
                            <button onClick={() => setModalIsOpen2(true)}
                                    style={{border: "none", backgroundColor: "white", fontSize: "10px"}}>• 대면형이
                                무엇인가요?
                            </button>
                        </div>
                    </div>
                    <div style={{flexDirection: "column"}}>
                        <div>
                            <button className="square_button"
                                    name="kitchen"
                                    value={KitchenFeat.Close}
                                    style={{
                                        backgroundColor: data.kitchenFeat === KitchenFeat.Close ? "black" : "white",
                                        color: data.kitchenFeat === KitchenFeat.Close ? "white" : "black",

                                    }}

                            >
                                폐쇄형
                            </button>
                        </div>
                        <div>
                            <Modal
                                isOpen={modalIsOpen3}
                                style={ExplanationModalStyles}
                            >
                                <div style={{
                                    fontFamily: "Noto Sans KR",
                                    color: " #000",
                                    fontSize: "0.625rem",
                                    fontStyle: "normal",
                                    fontWeight: "400",
                                    lineHeight: "normal"
                                }}>
                                    <br/>
                                    <div style={{display: "flex", justifyContent: "space-between"}}>
                                        <a style={{textAlign: "left"}}>폐쇄형 주방이란?</a><a
                                        style={{textAlign: "right"}}
                                        onClick={() => setModalIsOpen3(false)}>x</a>
                                    </div>
                                    <hr style={{height: "1px", backgroundColor: "black"}}/>
                                    <p style={{
                                        textAlign: 'left',
                                        paddingLeft: "5%",
                                        paddingRight: "5%"
                                    }}>•&ensp;차분하게 조리와 정리에 전념할 수 있습니다.</p>
                                    <p style={{
                                        textAlign: 'left',
                                        paddingLeft: "5%",
                                        paddingRight: "5%"
                                    }}>•&ensp;또한, 조리할 때 발생하는 오염과 냄새, 연기, 소리 등이 거실에 비교적 전달이 되지 않습니다.
                                    </p>
                                    <p style={{
                                        textAlign: 'left',
                                        paddingLeft: "5%",
                                        paddingRight: "5%"
                                    }}>•&ensp;홀에서는 어수선한 모습이 보이지 않아 쾌적한 매장 환경이 만들어집니다.</p>
                                </div>
                                <div class="bottom_button_fixed">
                                    <a onClick={() => setModalIsOpen3(false)}>닫기</a>
                                </div>

                            </Modal>
                            <button onClick={() => setModalIsOpen3(true)}
                                    style={{border: "none", backgroundColor: "white", fontSize: "10px"}}>• 폐쇄형이
                                무엇인가요?
                            </button>
                        </div>
                    </div>
                </div>

                <div style={{marginBottom: "1rem"}}>
                    <p style={{paddingLeft: "1rem"}}>화구<span style={{color: "red"}}>*</span></p>
                    <div className={"data_input"}><p style={{paddingLeft: "0.6rem"}}>{data.fireholeNum + "구"}</p></div>
                </div>
                <div>
                    <p style={{paddingLeft: "1rem"}}>확보된 주방기계<span style={{color: "red"}}>*</span></p>
                    <div style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginTop: "1rem",
                        width: '90vw',
                        paddingLeft: "1rem"
                    }}>
                        <div style={{borderRadius: '0.3125rem', width: '18%', height: '1.25rem'}}
                             className={equipments.includes("튀김기") === true ? "btn_selected" : "btn_not_selected"}>튀김기
                        </div>
                        <div style={{borderRadius: '0.3125rem', width: '18%', height: '1.25rem'}}
                             className={equipments.includes("오븐") === true ? "btn_selected" : "btn_not_selected"}>오븐
                        </div>
                        <div style={{borderRadius: '0.3125rem', width: '18%', height: '1.25rem'}}
                             className={equipments.includes("식기세척기") === true ? "btn_selected" : "btn_not_selected"}>식기세척기
                        </div>
                        <div style={{borderRadius: '0.3125rem', width: '18%', height: '1.25rem'}}
                             className={equipments.includes("제빙기") === true ? "btn_selected" : "btn_not_selected"}>제빙기
                        </div>
                        <div style={{borderRadius: '0.3125rem', width: '18%', height: '1.25rem'}}
                             className={equipments.includes("냉장고") === true ? "btn_selected" : "btn_not_selected"}>냉장고
                        </div>
                    </div>
                </div>
                <div style={{marginTop: "1rem"}}>
                    <p style={{paddingLeft: "1rem"}}>추가 사용 가능 기계<span style={{color: "red"}}>*</span></p>
                    <div
                        style={{
                            border: "1px solid lightgray",
                            width: "90vw",
                            height: "10vh",
                            margin: "0 1rem 0 1rem",
                            fontSize: "0.625rem",
                            padding: "0.5rem 0 0 0.5rem"
                        }}
                    >
                        {data.equipExtra}
                    </div>
                </div>
                <p onClick={() => navigate("/rentSpaceInfo3/" + params.id)} className={"more_info"}
                   style={{paddingLeft: "1rem"}}>더 보기</p>
                <div>
                    <div style={{display: "flex", margin: "1rem", justifyContent: "space-between"}}>
                        <p style={{fontSize: "1rem"}}>고객센터</p>
                        <div style={{textAlign: 'right'}}>
                            <img src={arrowright} alt="arrowright"
                                 style={{width: '0.7rem', height: '1.1rem', flexShrink: 0}}/>
                        </div>
                    </div>
                    <div style={{display: "flex", margin: "1rem", justifyContent: "space-between"}}>
                        <div>
                            <img src={hearImg} alt="heartImg"
                                 style={{width: '1.9rem', height: '1.9rem', flexShrink: 0}}/>
                        </div>
                        <div className={"submit_button"} style={{textAlign: "right"}} onClick={submit}>
                            <p>예약하기</p>
                        </div>
                    </div>


                </div>

            </div>

            {needChef ? (
                <div className={"overlay_container"}>
                    <div style={{height: "70%", display: "flex", alignItems: "center", padding: "1rem"}}>
                        <div style={{margin: "1rem", paddingRight: "2rem"}}>
                            <p style={{
                                fontSize: "1.25rem",
                                fontWeight: "700"
                            }}>{sessionStorage.getItem("name") + "님, 대관을 위해서 셰프 등록을 먼저 부탁드립니다!"}</p>
                            <p style={{fontSize: "0.95rem", paddingTop: "1rem"}}>셰프 등록을하신 후, 포 올을 통해 세상에 놀라운 경험을
                                선사해주세요.</p>
                        </div>

                    </div>
                    <div className={"submit_button"} onClick={() => navigate("/chefRegistry")}>셰프 등록하기</div>
                </div>
            ) : null}

        </div>
    )
};

export default RentSpacePage;
