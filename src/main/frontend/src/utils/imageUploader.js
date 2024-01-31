import axios from "axios";

const ImageUploader = async (image, userId) => {
    if (!image) return null;
    if (typeof(image) === 'string') return image;
    const formData = new FormData();
    formData.append('file', image);
    formData.append('loginId', userId);
    return await axios.post("/api/v1/image/upload", formData)
        .then((res) => {
            return res.data;
        }).catch((err) => {
            console.log(err);
        });
};

export default ImageUploader;