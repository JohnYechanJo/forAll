import axios from "axios";

const ImageUploader = async (image, userId) => {
    if (!image) return null;
    if (typeof(image) === 'string') return image;
    const formData = new FormData();
    formData.append('images[0]', image);
    let value;
    await axios.post("/api/v1/image/upload", formData).then((res) => {
        value =  res.data[0];
    }).catch((err) => {
        console.log(err);
    });
    return value
};

export default ImageUploader;