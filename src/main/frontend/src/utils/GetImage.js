export const GetImageUri = (imageName) => {
    if (!imageName) return "";
    return "https://forall-bucket.s3.ap-northeast-2.amazonaws.com/" + imageName;
};