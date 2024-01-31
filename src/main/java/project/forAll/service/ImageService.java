package project.forAll.service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.ObjectMetadata;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import project.forAll.domain.Image;
import project.forAll.dto.ImageSaveDto;
import project.forAll.repository.ImageRepository;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Component
@Transactional(readOnly = true)
public class ImageService extends Service {

    @Value("${cloud.aws.s3.bucket}")
    private String bucketName;

    @Autowired private AmazonS3Client amazonS3Client;
    @Autowired private ImageRepository imageRepository;

    @Override
    protected JpaRepository getRepository() { return imageRepository;}

    @Transactional
    public List<String> saveImages(ImageSaveDto saveDto) {
        List<String> resultList = new ArrayList<>();

        for(MultipartFile multipartFile : saveDto.getImages()) {
            String value = saveImage(multipartFile);
            resultList.add(value);
        }

        return resultList;
    }

    public String saveImage(final MultipartFile multipartFile) {
        String originalName = multipartFile.getOriginalFilename();
        Image image = new Image(originalName);
        String filename = image.getImageName();

//        ClassPathResource resource = new ClassPathResource("/static/upload/");
//        String storedImagePath = "src/main/resources/static/upload/"+random+ ".png";
        try {
            ObjectMetadata objectMetadata = new ObjectMetadata();
            objectMetadata.setContentType(multipartFile.getContentType());
            objectMetadata.setContentLength(multipartFile.getInputStream().available());

            amazonS3Client.putObject(bucketName, filename, multipartFile.getInputStream(), objectMetadata);

            String accessUrl = amazonS3Client.getUrl(bucketName, filename).toString();
            image.setAccessUrl(accessUrl);
        } catch (IOException e) {

        }

        imageRepository.save(image);

        return image.getAccessUrl();
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
