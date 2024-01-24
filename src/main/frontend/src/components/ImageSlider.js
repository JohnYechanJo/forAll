import {Swiper, SwiperSlide} from "swiper/react";
import SwiperCore, {Navigation, Pagination} from "swiper";
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'
import 'swiper/components/navigation/navigation.min.css';
import 'swiper/components/pagination/pagination.min.css';
const ImageSlider = ({images}) => {
    const spring_app_url = "http://localhost:8080";
    SwiperCore.use([Navigation, Pagination]);
    return(
        <div>
            <Swiper
                slidesPerView={1}
                modules={[Navigation, Pagination]}
                navigation
                pagination={{clickable:true}}
            >
                {images ? images.map((image, idx) => {
                    return(
                        <SwiperSlide key={idx}>
                            <img
                                src={spring_app_url + "/api/v1/image/"+image}
                                alt={"image"}
                            />

                        </SwiperSlide>
                    )
                }) : null}
            </Swiper>
        </div>
    )
};

export default ImageSlider;