//package project.forAll.controller.api;
//
//import lombok.RequiredArgsConstructor;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//import org.springframework.web.multipart.MultipartFile;
//import project.forAll.service.ImageService;
//import java.util.List;
//
//@RestController
//@RequiredArgsConstructor
//public class APIImageController {
//
//    private final ImageService imageService;
//
//    @PostMapping("/image")
//    public ResponseEntity<List<String>> uploadImage(@RequestPart List<MultipartFile> multipartFile) {
//        List<String> fileNameList = imageService.uploadImage(multipartFile);
//        return new ResponseEntity(fileNameList, HttpStatus.OK);
//    }
//}
