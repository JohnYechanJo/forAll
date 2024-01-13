package project.forAll.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.multipart.MultipartFile;
import project.forAll.domain.Image;
import project.forAll.domain.member.AuthenticationData;
import project.forAll.repository.AuthenticationDataRepository;
import project.forAll.repository.ImageRepository;

import java.io.File;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Component
@Transactional
public class ImageService extends Service{

    @Autowired
    private ImageRepository imageRepository;

    @Override
    protected JpaRepository getRepository() { return imageRepository;}

    public String saveImage(final MultipartFile imageFile) throws Exception {
        String originName = imageFile.getOriginalFilename();
        String random = UUID.randomUUID().toString();
//         경로 자동 설정

        ClassPathResource resource = new ClassPathResource("/static/upload/");
        String storedImagePath = "src/main/resources/static/upload/"+random+ ".png";
        try{
            Path path = Paths.get("src/main/resources/static/upload/"+random+ ".png").toAbsolutePath();
            imageFile.transferTo(path.toFile());

            final Image image = new Image();
            image.setOriginName(originName);
            image.setImageName(random);
            save(image);
            return image.getImageName();
        }catch(Exception e){
            throw new Exception(e);
        }

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
}
