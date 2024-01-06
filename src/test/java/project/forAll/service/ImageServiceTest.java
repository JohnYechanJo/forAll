package project.forAll.service;


import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItem;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.core.io.ClassPathResource;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.commons.CommonsMultipartFile;
import project.forAll.domain.Image;
import project.forAll.repository.ImageRepository;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.file.Files;

import static org.junit.Assert.*;

@RunWith(SpringRunner.class)
@SpringBootTest
@Transactional
public class ImageServiceTest {

    @Autowired ImageService imageService;
    @Autowired ImageRepository imageRepository;

    @Before
    public void setup(){ imageService.deleteAll();}

    @Test
    public void 이미지저장() throws Exception{
        // Given
//        ClassPathResource resource = new ClassPathResource("static/favicon.ico");
        File file = new File("src/main/resources/static/favicon.ico");
        FileItem fileItem = new DiskFileItem("file", Files.probeContentType(file.toPath()), false, file.getName(), (int) file.length(), file.getParentFile()) {};
        InputStream input = new FileInputStream(file);
        OutputStream os = fileItem.getOutputStream();
        IOUtils.copy(input, os);
        MultipartFile multipartFile = new CommonsMultipartFile(fileItem);

        // When
        Long imageId = imageService.saveImage(multipartFile);
        // Then
        Image saveImage = imageRepository.findByOriginName("favicon.ico").get(0);
        assertEquals(imageId, saveImage.getId());
    }
}
