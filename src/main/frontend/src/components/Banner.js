import {Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore, {Autoplay, Pagination} from "swiper";
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'
import  './Banner.css'
import {useEffect} from "react";
import {AddressUtil} from "../utils/AddressUtil";
import {GetImageUri} from "../utils/GetImage"; // 나중에 Styles.css로 합쳐도 무방
const Banner = ({dataSet, navigate}) => {
    SwiperCore.use([Autoplay]);

    const handleClick = (data) => {
        navigate("/rentSpace/"+data.id,data);
    };
    return (<div>
            <Swiper
                className={"swiper"}
                spaceBetween={50}
                slidesPerView={2}
                autoplay={{delay: 0, disableOnInteraction: false}}
                speed={4000} // 넘어가는 속도
                loop={true}
            >
                {dataSet ? dataSet.map((data, idx) => {
                    return (<SwiperSlide key={idx}>
                        <div style={{margin:"0 1rem 0 1rem"}} onClick={() => handleClick(data)}>
                            <div style={{
                                width:"10rem", height:"11.5rem", overflow:"hidden"
                            }}>
                                <img
                                    style={{objectFit:"cover", objectPosition:"center", width:"100%", height:"100%", display:"block"}}
                                    src={GetImageUri(data.mainImage)}
                                    alt={"image"}
                                />
                            </div>

                            <p>{data.priceSet}원</p>
                            <p>{AddressUtil.extraction(data.address)} | {data.name}</p>
                        </div>
                    </SwiperSlide>)
                }) : null}
                {/* slide가 최소 3개는 있어야 무한으로 돌아감 아래 슬라이드는 그것을 보여주기 위함 */}
                {/*<SwiperSlide>1</SwiperSlide>*/}
                {/*<SwiperSlide>1</SwiperSlide>*/}
                {/*<SwiperSlide>1</SwiperSlide>*/}

            </Swiper>
    </div>)
};

export default Banner;