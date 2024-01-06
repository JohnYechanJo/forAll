package project.forAll.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import project.forAll.domain.Image;
import project.forAll.repository.ImageRepository;

import java.io.File;
import java.util.List;
import java.util.UUID;

@Component
@Transactional
public class ImageService extends Service{

    @Autowired
    private ImageRepository imageRepository;
    @Override
    protected JpaRepository getRepository() { return imageRepository;}

    public Long saveImage(final MultipartFile imageFile) throws Exception {
        String originName = imageFile.getOriginalFilename();
        String random = UUID.randomUUID().toString();
        // 경로 자동 설정
//        ClassPathResource resource = new ClassPathResource("static/favicon.ico");
        String storedImagePath = "src/main/resources/upload/spaceImage/" + random;
        try{
            final Image image = new Image();
            image.setOriginName(originName);
            image.setImageName(random);
            save(image);
            imageFile.transferTo(new File(storedImagePath));

            return image.getId();
        }catch(Exception e){
            throw new Exception(e);
        }

    }

    public Image findByImageName(final String imageName){
        List<Image> images = imageRepository.findByImageName(imageName);
        if (images.isEmpty()) return null;
        return images.get(0);
    }
}
