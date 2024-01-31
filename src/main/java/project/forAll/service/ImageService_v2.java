//package project.forAll.service;
//
//import com.amazonaws.services.s3.AmazonS3;
//import com.amazonaws.services.s3.model.CannedAccessControlList;
//import com.amazonaws.services.s3.model.ObjectMetadata;
//import com.amazonaws.services.s3.model.PutObjectRequest;
//import lombok.RequiredArgsConstructor;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.http.HttpStatus;
//import org.springframework.stereotype.Service;
//import org.springframework.web.multipart.MultipartFile;
//import org.springframework.web.server.ResponseStatusException;
//import project.forAll.domain.Image;
//import project.forAll.repository.ImageRepository;
//
//import java.io.IOException;
//import java.io.InputStream;
//import java.util.ArrayList;
//import java.util.List;
//import java.util.UUID;
//import java.util.stream.Collectors;
//
//@Service
//@RequiredArgsConstructor
//public class ImageService{
//
//    @Value("${cloud.aws.s3.bucket}")
//    private String bucket;
//
//    private final AmazonS3 amazonS3;
//    private final ImageRepository imageRepository;
//
//    public List<String> uploadImage(List<MultipartFile> multipartFile) {
//        List<String> fileNameList = new ArrayList<>();
//
//        multipartFile.forEach(file -> {
//            String fileName = createFileName(file.getOriginalFilename());
//            ObjectMetadata objectMetadata = new ObjectMetadata();
//            objectMetadata.setContentLength(file.getSize());
//            objectMetadata.setContentType(file.getContentType());
//
//            try(InputStream inputStream = file.getInputStream()) {
//                amazonS3.putObject(new PutObjectRequest(bucket, fileName, inputStream, objectMetadata)
//                        .withCannedAcl(CannedAccessControlList.PublicRead));
//            } catch(IOException e) {
//                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "이미지 업로드에 실패했습니다.");
//            }
//
//            fileNameList.add(fileName);
//        });
//
//        return fileNameList;
//    }
//
////    public void deleteImage(String fileName) {
////        amazonS3.deleteObject(new DeleteObjectRequest(bucket, fileName));
////    }
//
//    private String createFileName(String fileName) {
//        return UUID.randomUUID().toString().concat(getFileExtension(fileName));
//    }
//
//    private String getFileExtension(String fileName) {
//        try {
//            return fileName.substring(fileName.lastIndexOf("."));
//        } catch (StringIndexOutOfBoundsException e) {
//            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "잘못된 형식의 파일(" + fileName + ") 입니다.");
//        }
//    }
//
//    public Image findByImageName(final String imageName){
//        List<Image> images = imageRepository.findByImageName(imageName);
//        if (images.isEmpty()) return null;
//        return images.get(0);
//    }
//
//    public Image findById(final Long id){
//        if (id == null) return null;
//        return imageRepository.findById(id).orElse(null);
//    }
//
//    public List<Image> findListByIds(final List<String> names){
//        if (names == null) return null;
//        List<Image> images = new ArrayList<>();
//        for (String name :names){
//            Image image = findByImageName(name);
//            if (image != null) images.add(image);
//        }
//        return images;
//    }
//
//    public String getImageName(final Image image){
//        if (image == null) return null;
//        return image.getImageName();
//    }
//
//    public List<String> getImagesNames(final List<Image> images){
//        if (images == null) return null;
//
//        return images.stream().map(image -> {
//            if (image == null) return "";
//            else return image.getImageName();
//        }).collect(Collectors.toList());
//    }
//}