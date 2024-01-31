import {Swiper, SwiperSlide} from "swiper/react";
import SwiperCore, {Navigation, Pagination} from "swiper";
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'
import 'swiper/components/navigation/navigation.min.css';
import 'swiper/components/pagination/pagination.min.css';
import {GetImageUri} from "../utils/GetImage";
const ImageSlider = ({images, style}) => {
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
                            <div style={style ? style : {}}>
                                <img
                                    style={{objectFit:"cover", objectPosition:"center", width:"100%", height:"100%", display:"block"}}
                                    src={GetImageUri(image)}
                                    alt={"image"}
                                />
                            </div>

                        </SwiperSlide>
                    )
                }) : null}
            </Swiper>
        </div>
    )
};

export default ImageSlider;