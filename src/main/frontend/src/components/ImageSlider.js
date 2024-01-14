import {Swiper, SwiperSlide} from "swiper/react";
import SwiperCore, {Navigation, Pagination} from "swiper";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
const ImageSlider = ({images}) => {
    console.log(images);
    const SpringAppUrl = "http://localhost:8080";
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
                                src={SpringAppUrl + "/upload/" + image + ".png"}
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