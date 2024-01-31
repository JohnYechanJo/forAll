import axios from "axios";

const ImageUploader = async (image, userId) => {
    console.log(image);
    if (!image) return null;
    if (typeof(image) === 'string') return image;
    const formData = new FormData();
    formData.append('images[0]', image);
    return await axios.post("/api/v1/image/upload", formData)
        .then((res) => {
            return res.data[0];
        }).catch((err) => {
            console.log(err);
        });
};

export default ImageUploader;