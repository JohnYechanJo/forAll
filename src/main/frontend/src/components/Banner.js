import {Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore, {Autoplay, Pagination} from "swiper";
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'
import  './Banner.css'
import {useEffect} from "react";
import {AddressUtil} from "../utils/AddressUtil"; // 나중에 Styles.css로 합쳐도 무방
const Banner = ({dataSet, navigate}) => {
    // 왜인지는 모르겠는데 얘만 process 접근이 안됨
    // const SpringAppUrl = process.env.SPRING_APP_URL;
    const spring_app_url = "http://15.165.222.15:80";
    SwiperCore.use([Autoplay]);

    const handleClick = (data) => {
        navigate("/rentSpace/"+data.id,data);
    };
    return (<div>
            <Swiper
                className={"swiper"}
                spaceBetween={50}
                slidesPerView={3}
                autoplay={{delay: 0, disableOnInteraction: false}}
                speed={2000} // 넘어가는 속도
                loop={true}
            >
                {dataSet ? dataSet.map((data, idx) => {
                    return (<SwiperSlide key={idx}>
                        <div onClick={() => handleClick(data)}>
                            <img
                                src={spring_app_url + "/api/v1/image/"+data.mainImage}
                                alt={"image"}
                            />
                            <p>{data.priceSet}원</p>
                            <p>{AddressUtil.extraction(data.address)} | {data.name}</p>
                        </div>
                    </SwiperSlide>)
                }) : null}
                {/* slide가 최소 3개는 있어야 무한으로 돌아감 아래 슬라이드는 그것을 보여주기 위함 */}
                {/* <SwiperSlide>1</SwiperSlide>
                <SwiperSlide>1</SwiperSlide>
                <SwiperSlide>1</SwiperSlide> */}

            </Swiper>
    </div>)
};

export default Banner;