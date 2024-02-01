package project.forAll.service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.ObjectMetadata;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import project.forAll.domain.Image;
import project.forAll.dto.ImageSaveDto;
import project.forAll.repository.ImageRepository;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Component
@Slf4j
public class ImageService extends Service {

    @Value("${cloud.aws.s3.bucket}")
    private String bucketName;

    @Autowired private AmazonS3Client amazonS3Client;
    @Autowired private ImageRepository imageRepository;

    @Override
    protected JpaRepository getRepository() { return imageRepository;}

    public List<String> saveImages(final ImageSaveDto imageSaveDto) {
        List<String> resultList = new ArrayList<>();

        for(MultipartFile multipartFile : imageSaveDto.getImages()) {
            log.info("Processing image: " + multipartFile.getOriginalFilename());
            String value = saveImage(multipartFile);
            resultList.add(value);
        }

        return resultList;
    }

    public String saveImage(final MultipartFile multipartFile) {
        String originalName = multipartFile.getOriginalFilename();
        Image image = new Image();
        // image.setId((long)300);
        image.setOriginName(originalName);
        // image.setImageName(UUID.randomUUID() + ".jpg");
        image.setImageName(UUID.randomUUID() + originalName.substring(originalName.lastIndexOf('.'),
                originalName.length()));
        // image.setAccessUrl("");
        // image.setOriginName(originalName);
        // Image image = new Image(originalName);
        String filename = image.getImageName();
        imageRepository.save(image);
        try {
            ObjectMetadata objectMetadata = new ObjectMetadata();
            objectMetadata.setContentType(multipartFile.getContentType());
            objectMetadata.setContentLength(multipartFile.getInputStream().available());

            amazonS3Client.putObject(bucketName, filename, multipartFile.getInputStream(), objectMetadata);

            log.info("Id of the image: " + image.getId());

//            String accessUrl = amazonS3Client.getUrl(bucketName, filename).toString();
//            image.setAccessUrl(accessUrl);
        } catch (IOException e) {

        }

        return image.getImageName();
    }

    public Image findByImageName(final String imageName){
        List<Image> images = imageRepository.findByImageName(imageName);
        if (images.isEmpty()) return null;
        return images.get(0);
    }

    public Image findById(final Long id){
        if (id == null) return null;
        return imageRepository.findById(id).orElse(null);
    }

    public List<Image> findListByIds(final List<String> names){
        if (names == null) return null;
        List<Image> images = new ArrayList<>();
        for (String name :names){
            Image image = findByImageName(name);
            if (image != null) images.add(image);
        }
        return images;
    }

    public String getImageName(final Image image){
        if (image == null) return null;
        return image.getImageName();
    }

    public List<String> getImagesNames(final List<Image> images){
        if (images == null) return null;

        return images.stream().map(image -> {
            if (image == null) return "";
            else return image.getImageName();
        }).collect(Collectors.toList());
    }
}
